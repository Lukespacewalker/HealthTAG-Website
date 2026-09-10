export {};

type ThemePreference = 'auto' | 'light' | 'dark';

const storageKey = 'healthtag-theme';
const media = matchMedia('(prefers-color-scheme: dark)');
const isTheme = (value: string | undefined | null): value is ThemePreference =>
  value === 'auto' || value === 'light' || value === 'dark';
const resolve = (value: ThemePreference) => value === 'auto' ? (media.matches ? 'dark' : 'light') : value;
const controls = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-theme-control]'));

const updateControls = (preference: ThemePreference) => {
  for (const control of controls) {
    const label = control.dataset.themeLabel ?? '';
    const selected = control.dataset[`theme${preference[0].toUpperCase()}${preference.slice(1)}`] ?? preference;
    const trigger = control.querySelector<HTMLElement>('[data-theme-trigger]');
    const triggerLabel = control.querySelector<HTMLElement>('[data-theme-trigger-label]');
    if (trigger) trigger.setAttribute('aria-label', `${label}: ${selected}`);
    if (triggerLabel) triggerLabel.textContent = selected;
    for (const option of control.querySelectorAll<HTMLButtonElement>('[data-theme-option]')) {
      option.setAttribute('aria-pressed', String(option.dataset.themeOption === preference));
    }
  }
};

const apply = (preference: ThemePreference) => {
  const resolved = resolve(preference);
  document.documentElement.dataset.theme = preference;
  document.documentElement.dataset.resolvedTheme = resolved;
  document.documentElement.style.colorScheme = resolved;
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute(
    'content', resolved === 'dark' ? '#0b1423' : '#f6f8fc',
  );
  updateControls(preference);
};

let preference: ThemePreference = isTheme(document.documentElement.dataset.theme)
  ? document.documentElement.dataset.theme
  : 'auto';

apply(preference);
for (const control of controls) {
  const trigger = control.querySelector<HTMLElement>('[data-theme-trigger]');
  control.addEventListener('click', event => {
    const option = (event.target as Element).closest<HTMLButtonElement>('[data-theme-option]');
    if (!option || !isTheme(option.dataset.themeOption)) return;
    preference = option.dataset.themeOption;
    apply(preference);
    try { localStorage.setItem(storageKey, preference); } catch {}
    control.removeAttribute('open');
    trigger?.focus();
  });
  control.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !control.open) return;
    event.preventDefault();
    event.stopPropagation();
    control.removeAttribute('open');
    trigger?.focus();
  });
}
media.addEventListener('change', () => {
  if (document.documentElement.dataset.theme === 'auto') apply('auto');
});

document.documentElement.classList.add('theme-ready');
for (const control of controls) control.hidden = false;
