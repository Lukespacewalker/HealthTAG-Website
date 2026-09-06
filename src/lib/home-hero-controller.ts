import type { HealthTagFlagshipHero } from './home-network-flagship';

const PHASE_DURATION = [3200, 3600, 4400, 3600];
const mounted = new Map<HTMLElement, () => void>();

function mount(hero: HTMLElement): () => void {
  const host = hero.querySelector<HTMLElement>('[data-three-hero]');
  const controls = Array.from(hero.querySelectorAll<HTMLButtonElement>('[data-hero-phase]'));
  const status = hero.querySelector<HTMLElement>('[data-hero-status]');
  const title = status?.querySelector('strong');
  const body = status?.querySelector('span');
  const toggle = hero.querySelector<HTMLButtonElement>('[data-hero-motion-toggle]');
  const icon = toggle?.querySelector('[data-motion-icon]');
  const label = toggle?.querySelector('[data-motion-label]');
  if (!host || !controls.length || !status || !title || !body || !toggle || !icon || !label) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const events = new AbortController();
  let scene: HealthTagFlagshipHero | null = null;
  let phase = reduced.matches ? 3 : 0;
  let paused = reduced.matches;
  let visible = false;
  let loading = false;
  let failed = Boolean(connection?.saveData);
  let disposed = false;
  let timer: number | undefined;
  let remaining = PHASE_DURATION[phase];
  let deadline = 0;

  const stopTimer = () => {
    if (timer !== undefined) {
      remaining = Math.max(0, deadline - performance.now());
      window.clearTimeout(timer);
    }
    timer = undefined;
  };
  const setPhase = (next: number, byUser = false) => {
    phase = (next + controls.length) % controls.length;
    remaining = PHASE_DURATION[phase];
    const selected = controls[phase];
    hero.dataset.phase = String(phase);
    controls.forEach((control, index) => {
      control.classList.toggle('active', index === phase);
      control.setAttribute('aria-pressed', String(index === phase));
    });
    status.setAttribute('aria-live', byUser ? 'polite' : 'off');
    title.textContent = `${String(phase + 1).padStart(2, '0')} · ${selected.dataset.title ?? ''}`;
    body.textContent = selected.dataset.body ?? '';
    scene?.setPhase(phase);
  };
  const sync = () => {
    if (disposed) return;
    const playing = Boolean(scene && visible && !document.hidden && !paused && !reduced.matches);
    scene?.setActive(playing);
    hero.dataset.motion = playing ? 'playing' : 'paused';
    const text = paused ? toggle.dataset.playLabel : toggle.dataset.pauseLabel;
    label.textContent = text ?? '';
    icon.textContent = paused ? '▶' : 'Ⅱ';
    toggle.setAttribute('aria-label', text ?? '');
    toggle.hidden = !scene || reduced.matches;
    if (!playing) {
      stopTimer();
    } else if (timer === undefined) {
      deadline = performance.now() + remaining;
      timer = window.setTimeout(() => {
        timer = undefined;
        setPhase(phase + 1);
        sync();
      }, remaining);
    }
  };
  const fallback = () => {
    stopTimer();
    // The controller's listeners are still needed for the static step description.
    const previous = scene;
    scene = null;
    failed = true;
    hero.dataset.heroState = 'fallback';
    previous?.dispose();
    sync();
  };
  const loadScene = async () => {
    if (scene || loading || failed || disposed || !visible) return;
    loading = true;
    hero.dataset.heroState = 'loading';
    try {
      const { mountHealthTagFlagshipHero } = await import('./home-network-flagship');
      if (disposed || !visible) return;
      scene = mountHealthTagFlagshipHero(host);
      setPhase(phase);
      hero.dataset.heroState = 'ready';
      sync();
    } catch {
      if (!disposed) fallback();
    } finally {
      loading = false;
    }
  };

  controls.forEach((control, index) => {
    control.disabled = false;
    control.addEventListener('click', () => {
      stopTimer();
      setPhase(index, true);
      sync();
    }, { signal: events.signal });
    control.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? controls.length - 1 : index + (event.key === 'ArrowLeft' ? -1 : 1);
      const target = controls[(next + controls.length) % controls.length];
      target.focus();
      target.click();
    }, { signal: events.signal });
  });
  toggle.addEventListener('click', () => {
    stopTimer();
    paused = !paused;
    sync();
  }, { signal: events.signal });
  host.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    if (scene) fallback();
  }, { capture: true, signal: events.signal });
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      paused = true;
      scene?.setActive(false);
      setPhase(3);
    }
    sync();
  }, { signal: events.signal });
  document.addEventListener('visibilitychange', sync, { signal: events.signal });
  const observer = new IntersectionObserver(([entry]) => {
    if (disposed) return;
    visible = entry.isIntersecting;
    if (visible) void loadScene();
    sync();
  }, { threshold: 0.05 });
  observer.observe(host);
  hero.dataset.heroState = failed ? 'fallback' : 'loading';
  setPhase(phase);
  sync();

  return () => {
    if (disposed) return;
    disposed = true;
    stopTimer();
    events.abort();
    observer.disconnect();
    scene?.dispose();
    scene = null;
    hero.dataset.heroState = 'fallback';
    toggle.hidden = true;
  };
}

function initialize() {
  document.querySelectorAll<HTMLElement>('[data-network-hero]').forEach((hero) => {
    if (!mounted.has(hero)) mounted.set(hero, mount(hero));
  });
}
function disposeAll() {
  mounted.forEach((dispose) => dispose());
  mounted.clear();
}
initialize();
document.addEventListener('astro:page-load', initialize);
document.addEventListener('astro:before-swap', disposeAll);
window.addEventListener('pagehide', disposeAll);
window.addEventListener('pageshow', initialize);
