import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export interface HealthTagFlagshipHero {
  setPhase(phase: number): void;
  setActive(active: boolean): void;
  dispose(): void;
}

/** One renderer, with no ownership of the page's controls or playback timer. */
export function mountHealthTagFlagshipHero(host: HTMLElement): HealthTagFlagshipHero {
  const resources = new Set<{ dispose(): void }>();
  const keep = <T extends { dispose(): void }>(resource: T): T => {
    resources.add(resource);
    return resource;
  };
  let renderer: THREE.WebGLRenderer | undefined;
  let observer: ResizeObserver | undefined;
  let disposed = false;
  let active = false;
  const listeners = new AbortController();

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    active = false;
    listeners.abort();
    observer?.disconnect();
    renderer?.setAnimationLoop(null);
    resources.forEach((resource) => resource.dispose());
    resources.clear();
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    }
  };

  try {
    const compactViewport = window.matchMedia('(max-width: 700px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scene = new THREE.Scene();
    const root = new THREE.Group();
    scene.add(root);
    const camera = new THREE.OrthographicCamera(-5, 5, 4, -4, 0.1, 60);
    camera.position.set(4.8, 6.5, 12);
    camera.lookAt(0, 0.6, 0);
    camera.updateMatrixWorld();

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
    const view = renderer;
    view.outputColorSpace = THREE.SRGBColorSpace;
    view.toneMapping = THREE.ACESFilmicToneMapping;
    view.toneMappingExposure = 1.05;
    view.setClearColor(0x102f36, 0);
    view.domElement.className = 'hero-network-canvas hero-network-flagship-canvas';
    view.domElement.setAttribute('aria-hidden', 'true');
    view.debug.onShaderError = () => { throw new Error('HealthTAG hero shader compilation failed'); };
    host.append(view.domElement);

    // Room reflections give the bevels form without HDR downloads or bloom passes.
    const environment = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(view);
    try {
      const target = keep(pmrem.fromScene(environment, 0.04));
      scene.environment = target.texture;
      scene.environmentIntensity = 0.65;
    } finally {
      environment.dispose();
      pmrem.dispose();
    }
    scene.add(new THREE.HemisphereLight(0xf6fff9, 0x173b40, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(-3, 7, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb0e9dd, 1.2);
    rim.position.set(5, 3, -4);
    scene.add(rim);

    const ceramic = keep(new THREE.MeshStandardMaterial({ color: 0xddf3eb, roughness: 0.48 }));
    const ceramicSide = keep(new THREE.MeshStandardMaterial({ color: 0xa8cbc2, roughness: 0.58 }));
    const ink = keep(new THREE.MeshStandardMaterial({ color: 0x174e53, roughness: 0.38 }));
    const mint = keep(new THREE.MeshStandardMaterial({ color: 0xb4eee0, roughness: 0.36 }));
    const teal = keep(new THREE.MeshPhysicalMaterial({ color: 0x00766f, roughness: 0.26, metalness: 0.06, clearcoat: 0.45, clearcoatRoughness: 0.25 }));
    const amber = keep(new THREE.MeshStandardMaterial({ color: 0xe2a55c, roughness: 0.44 }));
    const geometryCache = new Map<string, THREE.BufferGeometry>();
    const box = (width: number, height: number, depth: number, radius = 0.04) => {
      const id = [width, height, depth, radius].join(':');
      let geometry = geometryCache.get(id);
      if (!geometry) {
        geometry = keep(new RoundedBoxGeometry(width, height, depth, 2, radius));
        geometryCache.set(id, geometry);
      }
      return geometry;
    };
    const addBox = (parent: THREE.Group, size: [number, number, number], position: [number, number, number], material: THREE.Material, radius = 0.04) => {
      const mesh = new THREE.Mesh(box(...size, radius), material);
      mesh.position.set(...position);
      parent.add(mesh);
      return mesh;
    };

    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = shadowCanvas.height = 128;
    const shadowContext = shadowCanvas.getContext('2d');
    if (!shadowContext) throw new Error('A 2D canvas is required for the hero shadow');
    const shadowGradient = shadowContext.createRadialGradient(64, 64, 5, 64, 64, 64);
    shadowGradient.addColorStop(0, 'rgba(0,0,0,.55)');
    shadowGradient.addColorStop(0.4, 'rgba(0,0,0,.25)');
    shadowGradient.addColorStop(1, 'rgba(0,0,0,0)');
    shadowContext.fillStyle = shadowGradient;
    shadowContext.fillRect(0, 0, 128, 128);
    const shadowTexture = keep(new THREE.CanvasTexture(shadowCanvas));
    const shadowMaterial = keep(new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, toneMapped: false }));
    const shadowGeometry = keep(new THREE.PlaneGeometry(1, 1));
    const addShadow = (parent: THREE.Group, width: number, depth: number) => {
      const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
      shadow.rotation.x = -Math.PI / 2;
      shadow.scale.set(width, depth, 1);
      shadow.position.y = -0.025;
      parent.add(shadow);
    };

    const windowGeometry = box(0.13, 0.13, 0.025, 0.015);
    const instance = new THREE.Object3D();
    const hospitals = Array.from({ length: 6 }, (_, index) => {
      const hospital = new THREE.Group();
      const height = index % 2 ? 0.88 : 1.04;
      addShadow(hospital, 2, 1.65);
      addBox(hospital, [1.32, 0.09, 1.08], [0, 0.04, 0], ceramicSide);
      addBox(hospital, [0.86, height, 0.66], [0, height / 2 + 0.09, 0], ceramic, 0.065);
      addBox(hospital, [0.32, 0.5, 0.59], [0.52, 0.34, -0.015], ceramicSide);
      addBox(hospital, [0.27, 0.31, 0.03], [0, 0.25, 0.345], ink, 0.012);
      addBox(hospital, [0.35, 0.085, 0.035], [0, height - 0.1, 0.35], teal, 0.014);
      addBox(hospital, [0.085, 0.35, 0.035], [0, height - 0.1, 0.35], teal, 0.014);
      const windows = keep(new THREE.InstancedMesh(windowGeometry, ink, 4));
      for (let i = 0; i < 4; i += 1) {
        instance.position.set(i % 2 ? 0.25 : -0.25, 0.45 + Math.floor(i / 2) * 0.2, 0.346);
        instance.updateMatrix();
        windows.setMatrixAt(i, instance.matrix);
      }
      hospital.add(windows);
      hospital.rotation.y = 0.18;
      root.add(hospital);
      return hospital;
    });

    const wallet = new THREE.Group();
    wallet.position.set(0, 1.43, 0.1);
    wallet.rotation.set(-0.04, -0.12, -0.055);
    addBox(wallet, [2.33, 1.47, 0.09], [-0.08, 0.16, -0.19], ceramicSide, 0.09);
    addBox(wallet, [2.45, 1.56, 0.21], [0, 0, 0], teal, 0.12);
    // An opaque frosted insert, not mixed opacity/transmission pretending to be glass.
    addBox(wallet, [1.25, 0.92, 0.035], [0.33, -0.025, 0.122], ceramic, 0.065);
    const avatar = new THREE.Mesh(keep(new THREE.SphereGeometry(0.145, 20, 12)), mint);
    avatar.position.set(-0.75, 0.14, 0.14);
    wallet.add(avatar);
    addBox(wallet, [0.4, 0.2, 0.045], [-0.75, -0.14, 0.15], mint, 0.07);
    for (let i = 0; i < 3; i += 1) {
      addBox(wallet, [i === 2 ? 0.45 : 0.73, 0.045, 0.018], [0.3 - (i === 2 ? 0.14 : 0), 0.19 - i * 0.19, 0.151], ceramicSide, 0.008);
    }
    addBox(wallet, [0.19, 0.045, 0.02], [0.85, 0.48, 0.13], mint, 0.009);
    addBox(wallet, [0.045, 0.19, 0.02], [0.85, 0.48, 0.13], mint, 0.009);
    root.add(wallet);
    const walletBase = new THREE.Group();
    addShadow(walletBase, 3.5, 2.5);
    root.add(walletBase);

    const audit = new THREE.Group();
    audit.position.set(0, 0.12, 2.9);
    const receipts: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i += 1) {
      const material = keep(new THREE.MeshStandardMaterial({ color: 0xb88954, roughness: 0.5, emissive: 0xe2a55c, emissiveIntensity: 0 }));
      receipts.push(addBox(audit, [0.56, 0.11, 0.42], [(i - 1) * 0.76, 0, 0], material));
      addBox(audit, [0.22, 0.018, 0.025], [(i - 1) * 0.76, 0.064, -0.05], amber, 0.007);
      addBox(audit, [0.16, 0.018, 0.025], [(i - 1) * 0.76 - 0.03, 0.064, 0.045], amber, 0.007);
    }
    addShadow(audit, 3.2, 0.9);
    root.add(audit);

    const makePathMaterial = (auditPath = false) => keep(new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(auditPath ? 0xe2a55c : 0x70d3c6) },
        uLevel: { value: 0 },
        uHead: { value: -1 },
        uDashed: { value: auditPath ? 1 : 0 },
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor;
        uniform float uLevel;
        uniform float uHead;
        uniform float uDashed;
        void main() {
          float pulse = 1.0 - smoothstep(0.0, 0.075, abs(vUv.x - uHead));
          float dash = mix(1.0, step(0.34, fract(vUv.x * 15.0)), uDashed);
          float alpha = (0.19 + uLevel * 0.48 + pulse * 0.3) * dash;
          gl_FragColor = vec4(mix(uColor, vec3(0.88, 1.0, 0.96), pulse * 0.45), alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      transparent: true,
      depthWrite: false,
    }));
    const paths = hospitals.map(() => {
      const mesh = new THREE.Mesh(keep(new THREE.BufferGeometry()), makePathMaterial());
      root.add(mesh);
      return mesh;
    });
    const auditPath = new THREE.Mesh(keep(new THREE.BufferGeometry()), makePathMaterial(true));
    root.add(auditPath);
    const replaceCurve = (mesh: THREE.Mesh, start: THREE.Vector3, end: THREE.Vector3, lift: number) => {
      const middle = start.clone().lerp(end, 0.5);
      middle.y += lift;
      const curve = new THREE.QuadraticBezierCurve3(start, middle, end);
      resources.delete(mesh.geometry);
      mesh.geometry.dispose();
      mesh.geometry = keep(new THREE.TubeGeometry(curve, 48, 0.018, 5, false));
    };

    let compact: boolean | undefined;
    let phase = reducedMotion.matches ? 3 : 0;
    let clock = 0;
    let lastTime = 0;
    let pointerX = 0;
    let pointerY = 0;
    const draw = (timestamp?: number) => {
      if (disposed) return;
      const dt = timestamp === undefined || !lastTime ? 0 : Math.min(0.05, Math.max(0, (timestamp - lastTime) / 1000));
      if (timestamp !== undefined) lastTime = timestamp;
      clock += dt;
      const blend = dt ? 1 - Math.exp(-7 * dt) : 1;
      root.rotation.y += ((compact || reducedMotion.matches ? 0 : pointerX * 0.035) - root.rotation.y) * blend;
      root.rotation.x += ((compact || reducedMotion.matches ? 0 : pointerY * 0.018) - root.rotation.x) * blend;
      paths.forEach((path, i) => {
        path.material.uniforms.uLevel.value = phase >= 1 ? 0.85 : 0;
        path.material.uniforms.uHead.value = phase === 2 ? (clock * 0.32 + i * 0.17) % 1 : -1;
      });
      auditPath.material.uniforms.uLevel.value = phase === 3 ? 1 : 0;
      auditPath.material.uniforms.uHead.value = phase === 3 && active ? (clock * 0.5) % 1 : -1;
      receipts.forEach((receipt, i) => {
        const material = receipt.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = phase === 3 ? 0.12 + (active ? Math.max(0, Math.sin(clock * 3 - i)) * 0.16 : 0) : 0;
      });
      view.render(scene, camera);
    };

    const resize = () => {
      if (disposed) return;
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      const nextCompact = compactViewport.matches || width < 460;
      if (nextCompact !== compact) {
        compact = nextCompact;
        const positions = compact
          ? [[-2.45, 0, 0.7], [2.45, 0, 0.7], [0, 0, -2.5]]
          : [[-3.05, 0, 0.9], [3.05, 0, 0.9], [-2.65, 0, -1.75], [2.65, 0, -1.75], [-0.85, 0, -2.7], [1.1, 0, -3.1]];
        hospitals.forEach((hospital, i) => {
          hospital.visible = i < positions.length;
          paths[i].visible = hospital.visible;
          if (!hospital.visible) return;
          hospital.position.fromArray(positions[i]);
          hospital.scale.setScalar(compact ? 0.88 : 0.85);
          const start = hospital.position.clone().add(new THREE.Vector3(0, 0.65, 0.25));
          const end = new THREE.Vector3(hospital.position.x < 0 ? -1.04 : 1.04, 1.3, 0.15);
          replaceCurve(paths[i], start, end, 0.24);
        });
        replaceCurve(auditPath, new THREE.Vector3(0.4, 0.8, 0.35), new THREE.Vector3(0, 0.2, 2.9), 0.05);
      }
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.5, Math.sqrt(1_600_000 / (width * height)));
      view.setPixelRatio(ratio);
      view.setSize(width, height, false);
      // Fit a stable authored volume, not viewport-specific position offsets.
      const bounds = new THREE.Box3(
        new THREE.Vector3(compact ? -3.25 : -3.8, -0.1, -3.6),
        new THREE.Vector3(compact ? 3.25 : 3.8, 2.55, 3.5),
      );
      const projected = new THREE.Box3();
      for (const x of [bounds.min.x, bounds.max.x]) {
        for (const y of [bounds.min.y, bounds.max.y]) {
          for (const z of [bounds.min.z, bounds.max.z]) {
            projected.expandByPoint(new THREE.Vector3(x, y, z).applyMatrix4(camera.matrixWorldInverse));
          }
        }
      }
      const middle = projected.getCenter(new THREE.Vector3());
      const size = projected.getSize(new THREE.Vector3());
      const halfHeight = Math.max(size.y / 2, size.x / (2 * width / height)) * 1.035;
      const halfWidth = halfHeight * width / height;
      camera.left = middle.x - halfWidth;
      camera.right = middle.x + halfWidth;
      camera.top = middle.y + halfHeight;
      camera.bottom = middle.y - halfHeight;
      camera.updateProjectionMatrix();
      draw();
    };
    observer = new ResizeObserver(resize);
    observer.observe(host);
    compactViewport.addEventListener('change', resize, { signal: listeners.signal });
    host.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse' || compact || reducedMotion.matches || !active) return;
      const rect = host.getBoundingClientRect();
      pointerX = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
      pointerY = THREE.MathUtils.clamp((event.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);
    }, { signal: listeners.signal });
    host.addEventListener('pointerleave', () => { pointerX = pointerY = 0; }, { signal: listeners.signal });
    resize();

    return {
      setPhase(next) {
        if (disposed) return;
        phase = Math.min(3, Math.max(0, Math.trunc(next)));
        clock = 0;
        draw();
      },
      setActive(next) {
        if (disposed) return;
        const run = next && !reducedMotion.matches;
        if (run === active) return;
        active = run;
        lastTime = 0;
        view.setAnimationLoop(run ? draw : null);
        if (!run) draw();
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
