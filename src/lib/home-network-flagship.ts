import * as THREE from 'three';

export interface HealthTagFlagshipHero {
  setPhase(phase: number): void;
  setActive(active: boolean): void;
  dispose(): void;
}

const COLORS = {
  petrol: 0x102f36,
  petrolDark: 0x071d22,
  hospital: 0xddf3eb,
  hospitalSide: 0xa8cbc2,
  hospitalDark: 0x5f8581,
  window: 0x22545a,
  teal: 0x70d3c6,
  tealCore: 0xdcfff8,
  tealDark: 0x00766f,
  amber: 0xe2a55c,
  amberCore: 0xffe4b9,
  amberDark: 0xb66a16,
  paper: 0xf6f8f7,
};

const connectionOrder = [0, 3, 1, 4, 2, 5];

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smooth(value: number) {
  const v = clamp01(value);
  return v * v * (3 - 2 * v);
}

function range(value: number, start: number, end: number) {
  return smooth((value - start) / Math.max(0.0001, end - start));
}

function roundedRectShape(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (!context) return null;
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(255,255,255,.82)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,.22)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createConduitMaterial(color: THREE.ColorRepresentation, glow = false) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uReveal: { value: 0 },
      uFlow: { value: 0 },
      uTime: { value: 0 },
      uOpacity: { value: glow ? 0.13 : 0.7 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 uColor;
      uniform float uReveal;
      uniform float uFlow;
      uniform float uTime;
      uniform float uOpacity;
      void main() {
        if (uReveal <= 0.001) discard;
        float reveal = 1.0 - smoothstep(uReveal, uReveal + 0.026, vUv.x);
        float edge = smoothstep(0.02, 0.34, vUv.y) * (1.0 - smoothstep(0.66, 0.98, vUv.y));
        float carrier = pow(max(0.0, sin((vUv.x * 4.0 - uTime * 0.56) * 6.2831853)), 20.0) * uFlow;
        float alpha = reveal * edge * (uOpacity + carrier * 0.78);
        vec3 color = mix(uColor, vec3(0.92, 1.0, 0.98), carrier * 0.72);
        if (alpha < 0.003) discard;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

export function mountHealthTagFlagshipHero(host: HTMLElement): HealthTagFlagshipHero {
  const mobile = window.matchMedia('(max-width: 700px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const resources: Array<THREE.BufferGeometry | THREE.Material | THREE.Texture> = [];
  const disposers: Array<() => void> = [];
  const glowTexture = createGlowTexture();
  if (glowTexture) resources.push(glowTexture);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(COLORS.petrol, 0.042);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
  const renderer = new THREE.WebGLRenderer({
    antialias: !mobile.matches,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.setClearColor(COLORS.petrol, 0);
  renderer.domElement.className = 'hero-network-canvas hero-network-flagship-canvas';
  host.replaceChildren(renderer.domElement);

  const root = new THREE.Group();
  scene.add(root);

  const hemisphere = new THREE.HemisphereLight(0xcdf8ef, COLORS.petrolDark, 2.1);
  scene.add(hemisphere);
  const keyLight = new THREE.DirectionalLight(0xe6fff8, 2.8);
  keyLight.position.set(-5, 8, 7);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0x35d8c5, 15, 24, 2);
  rimLight.position.set(5, 3, 4);
  scene.add(rimLight);
  const auditLight = new THREE.PointLight(COLORS.amber, 0.1, 16, 2);
  auditLight.position.set(3.5, -1.7, 2.4);
  scene.add(auditLight);

  const ringMaterial = new THREE.MeshBasicMaterial({
    color: COLORS.teal,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(new THREE.RingGeometry(2.86, 2.89, 128), ringMaterial);
  ring.rotation.x = -Math.PI / 2;
  ring.position.set(1.9, -0.08, 0);
  root.add(ring);
  resources.push(ring.geometry, ringMaterial);

  const hospitalMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.hospital,
    roughness: 0.67,
    metalness: 0.02,
  });
  const hospitalSideMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.hospitalSide,
    roughness: 0.75,
  });
  const hospitalDarkMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.hospitalDark,
    roughness: 0.78,
  });
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.window,
    emissive: COLORS.window,
    emissiveIntensity: 0.16,
    roughness: 0.3,
  });
  const medicalMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.teal,
    emissive: COLORS.tealDark,
    emissiveIntensity: 0.35,
    roughness: 0.28,
  });
  resources.push(hospitalMaterial, hospitalSideMaterial, hospitalDarkMaterial, windowMaterial, medicalMaterial);

  const makeSprite = (color: THREE.ColorRepresentation, opacity = 0.2, scale = 0.4) => {
    const material = new THREE.SpriteMaterial({
      map: glowTexture ?? undefined,
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.setScalar(scale);
    resources.push(material);
    return sprite;
  };

  const addCross = (group: THREE.Group, y: number, z: number) => {
    const cross = new THREE.Group();
    const horizontal = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.035), medicalMaterial);
    const vertical = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.3, 0.035), medicalMaterial);
    cross.add(horizontal, vertical);
    cross.position.set(0, y, z);
    group.add(cross);
    resources.push(horizontal.geometry, vertical.geometry);
  };

  const createHospital = (index: number) => {
    const group = new THREE.Group();
    const type = index % 3;
    const width = 0.84 + (index % 2) * 0.08;
    const height = 0.9 + ((index + 1) % 3) * 0.08;
    const depth = 0.64;

    const shadowMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.petrolDark,
      transparent: true,
      opacity: 0.16,
      depthWrite: false,
    });
    const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.72, 28), shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    shadow.scale.set(1.25, 0.72, 1);
    shadow.position.y = 0.004;
    group.add(shadow);
    resources.push(shadow.geometry, shadowMaterial);

    const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), hospitalMaterial);
    body.position.y = height / 2;
    group.add(body);
    resources.push(body.geometry);

    const entrance = new THREE.Mesh(new THREE.BoxGeometry(width * 0.34, 0.3, 0.05), windowMaterial);
    entrance.position.set(0, 0.28, depth / 2 + 0.028);
    group.add(entrance);
    resources.push(entrance.geometry);

    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        if (row === 0 && col === 1) continue;
        const window = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.018), windowMaterial);
        window.position.set((col - 1) * 0.21, 0.48 + row * 0.22, depth / 2 + 0.012);
        group.add(window);
        resources.push(window.geometry);
      }
    }

    if (type === 0) {
      const annex = new THREE.Mesh(new THREE.BoxGeometry(width * 0.28, height * 0.5, depth * 0.68), hospitalSideMaterial);
      annex.position.set(-width * 0.58, height * 0.25, 0);
      group.add(annex);
      resources.push(annex.geometry);
    } else if (type === 1) {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(width * 0.24, height * 0.66, depth * 0.46), hospitalSideMaterial);
      tower.position.set(width * 0.42, height * 0.33, 0.02);
      group.add(tower);
      resources.push(tower.geometry);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(width * 0.78, 0.07, depth * 0.58), hospitalDarkMaterial);
      roof.position.y = height + 0.04;
      group.add(roof);
      resources.push(roof.geometry);
    } else {
      const wingGeometry = new THREE.BoxGeometry(width * 0.22, height * 0.68, depth * 0.82);
      const leftWing = new THREE.Mesh(wingGeometry, hospitalSideMaterial);
      leftWing.position.set(-width * 0.53, height * 0.34, 0);
      const rightWing = leftWing.clone();
      rightWing.position.x *= -1;
      group.add(leftWing, rightWing);
      resources.push(wingGeometry);
      const roofPad = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.028, 24), hospitalDarkMaterial);
      roofPad.position.y = height + 0.05;
      group.add(roofPad);
      resources.push(roofPad.geometry);
    }

    addCross(group, height * 0.73, depth / 2 + 0.02);

    const beacon = makeSprite(COLORS.tealCore, 0, 0.34);
    beacon.position.set(0, 0.18, depth / 2 + 0.12);
    group.add(beacon);
    group.userData.beacon = beacon;
    group.userData.pulse = 0;
    return group;
  };

  const center = new THREE.Vector3(1.9, 0.08, 0);
  const hospitals: THREE.Group[] = [];
  const hospitalAnchors: THREE.Vector3[] = [];
  const hospitalRadiusX = mobile.matches ? 2.35 : 3.0;
  const hospitalRadiusZ = mobile.matches ? 1.7 : 2.22;
  for (let index = 0; index < 6; index += 1) {
    const angle = Math.PI / 6 + index * Math.PI * 2 / 6;
    const hospital = createHospital(index);
    hospital.position.set(
      center.x + Math.cos(angle) * hospitalRadiusX,
      center.y,
      Math.sin(angle) * hospitalRadiusZ,
    );
    const direction = center.clone().sub(hospital.position);
    hospital.rotation.y = Math.atan2(direction.x, direction.z);
    hospital.scale.setScalar(mobile.matches ? 0.83 : 0.92);
    root.add(hospital);
    hospitals.push(hospital);
    const inward = center.clone().sub(hospital.position).normalize();
    hospitalAnchors.push(hospital.position.clone().add(inward.multiplyScalar(0.34)).add(new THREE.Vector3(0, 0.68, 0)));
  }

  const wallet = new THREE.Group();
  const walletShape = roundedRectShape(1.72, 1.08, 0.15);
  const walletGeometry = new THREE.ExtrudeGeometry(walletShape, {
    depth: 0.13,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 4,
    curveSegments: 10,
  });
  walletGeometry.center();
  const walletMaterial = new THREE.MeshPhysicalMaterial({
    color: COLORS.tealDark,
    roughness: 0.2,
    metalness: 0.09,
    clearcoat: 0.8,
    clearcoatRoughness: 0.16,
    emissive: 0x004e4a,
    emissiveIntensity: 0.34,
  });
  const walletCard = new THREE.Mesh(walletGeometry, walletMaterial);
  wallet.add(walletCard);
  resources.push(walletGeometry, walletMaterial);

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: COLORS.tealCore,
    transparent: true,
    opacity: 0.23,
    roughness: 0.12,
    transmission: 0.08,
    depthWrite: false,
  });
  const walletPanel = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.7, 0.025), glassMaterial);
  walletPanel.position.set(0.12, 0.02, 0.095);
  wallet.add(walletPanel);
  resources.push(walletPanel.geometry, glassMaterial);

  const avatarMaterial = new THREE.MeshStandardMaterial({ color: COLORS.paper, roughness: 0.32 });
  const avatarHead = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 14), avatarMaterial);
  avatarHead.position.set(-0.5, 0.15, 0.12);
  wallet.add(avatarHead);
  const avatarBody = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.025), avatarMaterial);
  avatarBody.position.set(-0.5, -0.16, 0.12);
  wallet.add(avatarBody);
  resources.push(avatarHead.geometry, avatarBody.geometry, avatarMaterial);

  const walletCrossMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.paper,
    emissive: COLORS.tealCore,
    emissiveIntensity: 0.25,
    roughness: 0.3,
  });
  const walletCrossH = new THREE.Mesh(new THREE.BoxGeometry(0.33, 0.08, 0.025), walletCrossMaterial);
  const walletCrossV = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.33, 0.025), walletCrossMaterial);
  walletCrossH.position.set(0.48, 0.25, 0.12);
  walletCrossV.position.copy(walletCrossH.position);
  wallet.add(walletCrossH, walletCrossV);
  resources.push(walletCrossH.geometry, walletCrossV.geometry, walletCrossMaterial);

  const credentialDots: THREE.Mesh[] = [];
  for (let index = 0; index < 4; index += 1) {
    const dotMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.tealCore,
      emissive: COLORS.teal,
      emissiveIntensity: 0.08,
      roughness: 0.24,
    });
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.034, 12, 10), dotMaterial);
    dot.position.set(0.12 + index * 0.16, -0.28, 0.12);
    wallet.add(dot);
    credentialDots.push(dot);
    resources.push(dot.geometry, dotMaterial);
  }

  const walletHaloMaterial = new THREE.MeshBasicMaterial({
    color: COLORS.teal,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const walletHalo = new THREE.Mesh(new THREE.RingGeometry(0.92, 1.18, 64), walletHaloMaterial);
  walletHalo.rotation.x = -Math.PI / 2;
  walletHalo.position.y = -0.86;
  wallet.add(walletHalo);
  resources.push(walletHalo.geometry, walletHaloMaterial);

  const trustCrystalMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.tealCore,
    emissive: COLORS.teal,
    emissiveIntensity: 0.2,
    roughness: 0.12,
  });
  const trustCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.09, 0), trustCrystalMaterial);
  trustCrystal.position.set(0.72, -0.38, 0.13);
  wallet.add(trustCrystal);
  resources.push(trustCrystal.geometry, trustCrystalMaterial);

  wallet.position.set(center.x, 1.15, 0.06);
  wallet.rotation.y = -0.08;
  root.add(wallet);

  const connections: Array<{
    curve: THREE.QuadraticBezierCurve3;
    material: THREE.ShaderMaterial;
    glowMaterial: THREE.ShaderMaterial;
    beacon: THREE.Sprite;
  }> = [];

  for (let index = 0; index < 6; index += 1) {
    const start = hospitalAnchors[index];
    const endDirection = hospitalAnchors[index].clone().sub(center).normalize();
    const end = wallet.position.clone().add(new THREE.Vector3(endDirection.x * 0.56, -0.08, endDirection.z * 0.36));
    const midpoint = start.clone().lerp(end, 0.52);
    midpoint.y += 0.68 + (index % 2) * 0.1;
    const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);

    const material = createConduitMaterial(COLORS.teal, false);
    const tubeGeometry = new THREE.TubeGeometry(curve, 80, 0.017, 6, false);
    const tube = new THREE.Mesh(tubeGeometry, material);
    root.add(tube);

    const glowMaterial = createConduitMaterial(COLORS.teal, true);
    const glowGeometry = new THREE.TubeGeometry(curve, 80, 0.052, 6, false);
    const glowTube = new THREE.Mesh(glowGeometry, glowMaterial);
    root.add(glowTube);

    const beacon = makeSprite(COLORS.tealCore, 0, 0.28);
    beacon.position.copy(end);
    root.add(beacon);
    connections.push({ curve, material, glowMaterial, beacon });
    resources.push(tubeGeometry, glowGeometry, material, glowMaterial);
  }

  const packetGeometries = [
    new THREE.IcosahedronGeometry(0.05, 1),
    new THREE.OctahedronGeometry(0.056, 0),
    new THREE.BoxGeometry(0.075, 0.052, 0.035),
  ];
  resources.push(...packetGeometries);
  const packets: Array<{ mesh: THREE.Mesh; hospital: number; offset: number; speed: number }> = [];
  for (let index = 0; index < (mobile.matches ? 6 : 12); index += 1) {
    const hospital = index % 6;
    const packetMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.tealCore,
      emissive: COLORS.teal,
      emissiveIntensity: 1.5,
      roughness: 0.16,
    });
    const mesh = new THREE.Mesh(packetGeometries[index % packetGeometries.length], packetMaterial);
    const glow = makeSprite(COLORS.tealCore, 0.18, 0.22);
    mesh.add(glow);
    mesh.visible = false;
    root.add(mesh);
    packets.push({ mesh, hospital, offset: (index / Math.max(1, mobile.matches ? 6 : 12)) % 1, speed: 0.14 + (index % 3) * 0.018 });
    resources.push(packetMaterial);
  }

  const auditChain = new THREE.Group();
  auditChain.position.set(center.x - 1.5, -1.82, 0.56);
  auditChain.visible = false;
  root.add(auditChain);

  const auditBlocks: Array<{
    group: THREE.Group;
    bodyMaterial: THREE.MeshPhysicalMaterial;
    edgeMaterial: THREE.LineBasicMaterial;
    coreMaterial: THREE.MeshStandardMaterial;
    pulse: number;
  }> = [];
  const auditPositions: THREE.Vector3[] = [];
  const auditCount = mobile.matches ? 5 : 7;
  for (let index = 0; index < auditCount; index += 1) {
    auditPositions.push(new THREE.Vector3(index * (mobile.matches ? 0.58 : 0.68), 0, Math.sin(index / Math.max(1, auditCount - 1) * Math.PI) * 0.28));
  }

  const auditBodyGeometry = new THREE.BoxGeometry(0.48, 0.34, 0.44);
  const auditCoreGeometry = new THREE.BoxGeometry(0.16, 0.11, 0.14);
  const auditEdgesGeometry = new THREE.EdgesGeometry(auditBodyGeometry);
  resources.push(auditBodyGeometry, auditCoreGeometry, auditEdgesGeometry);

  for (let index = 0; index < auditCount; index += 1) {
    const group = new THREE.Group();
    group.position.copy(auditPositions[index]);
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: COLORS.amberDark,
      transparent: true,
      opacity: 0,
      roughness: 0.28,
      metalness: 0.04,
      emissive: COLORS.amberDark,
      emissiveIntensity: 0.12,
      depthWrite: false,
    });
    const body = new THREE.Mesh(auditBodyGeometry, bodyMaterial);
    group.add(body);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: COLORS.amber,
      transparent: true,
      opacity: 0,
    });
    const edges = new THREE.LineSegments(auditEdgesGeometry, edgeMaterial);
    group.add(edges);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: COLORS.amberCore,
      emissive: COLORS.amber,
      emissiveIntensity: 0,
      transparent: true,
      opacity: 0,
      roughness: 0.2,
    });
    const core = new THREE.Mesh(auditCoreGeometry, coreMaterial);
    group.add(core);
    auditChain.add(group);
    auditBlocks.push({ group, bodyMaterial, edgeMaterial, coreMaterial, pulse: 0 });
    resources.push(bodyMaterial, edgeMaterial, coreMaterial);
  }

  const auditLinks: Array<{ material: THREE.ShaderMaterial }> = [];
  for (let index = 0; index < auditCount - 1; index += 1) {
    const start = auditPositions[index].clone().add(new THREE.Vector3(0, 0.03, 0));
    const end = auditPositions[index + 1].clone().add(new THREE.Vector3(0, 0.03, 0));
    const midpoint = start.clone().lerp(end, 0.5);
    midpoint.y += 0.07;
    const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end);
    const material = createConduitMaterial(COLORS.amber, true);
    const geometry = new THREE.TubeGeometry(curve, 36, 0.025, 6, false);
    const tube = new THREE.Mesh(geometry, material);
    auditChain.add(tube);
    auditLinks.push({ material });
    resources.push(geometry, material);
  }

  const auditStart = wallet.position.clone().add(new THREE.Vector3(0.1, -0.58, 0));
  const auditEnd = auditChain.position.clone().add(auditPositions[0]).add(new THREE.Vector3(0, 0.2, 0));
  const auditMid = auditStart.clone().lerp(auditEnd, 0.5).add(new THREE.Vector3(0.18, 0.08, -0.18));
  const auditCurve = new THREE.QuadraticBezierCurve3(auditStart, auditMid, auditEnd);
  const auditPathMaterial = createConduitMaterial(COLORS.amber, true);
  const auditPathGeometry = new THREE.TubeGeometry(auditCurve, 72, 0.032, 6, false);
  const auditPath = new THREE.Mesh(auditPathGeometry, auditPathMaterial);
  root.add(auditPath);
  resources.push(auditPathGeometry, auditPathMaterial);

  const auditPacketMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.amberCore,
    emissive: COLORS.amber,
    emissiveIntensity: 2.2,
    roughness: 0.14,
  });
  const auditPacket = new THREE.Mesh(new THREE.OctahedronGeometry(0.085, 0), auditPacketMaterial);
  auditPacket.visible = false;
  root.add(auditPacket);
  resources.push(auditPacket.geometry, auditPacketMaterial);

  const auditTrail = Array.from({ length: 6 }, (_, index) => {
    const sprite = makeSprite(COLORS.amberCore, 0, 0.18 + index * 0.018);
    sprite.visible = false;
    root.add(sprite);
    return sprite;
  });
  let trailSamples: THREE.Vector3[] = [];

  const ambience: Array<{ sprite: THREE.Sprite; base: THREE.Vector3; seed: number; speed: number }> = [];
  for (let index = 0; index < (mobile.matches ? 12 : 24); index += 1) {
    const sprite = makeSprite(index % 5 === 0 ? COLORS.amber : COLORS.tealCore, 0.025 + (index % 4) * 0.006, 0.07 + (index % 5) * 0.018);
    sprite.position.set(
      center.x + (Math.random() - 0.5) * 10,
      0.7 + Math.random() * 4.2,
      -2.2 - Math.random() * 4.8,
    );
    root.add(sprite);
    ambience.push({ sprite, base: sprite.position.clone(), seed: Math.random() * Math.PI * 2, speed: 0.18 + Math.random() * 0.25 });
  }

  let targetPhase = reducedMotion.matches ? 3 : 0;
  let scenePhase = targetPhase;
  let running = false;
  let disposed = false;
  let pointerX = 0;
  let pointerY = 0;
  let lastTime = performance.now();
  let elapsed = 0;
  let walletPulse = 0;

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    const preferredRatio = Math.min(window.devicePixelRatio, mobile.matches ? 1.15 : 1.5);
    const maxPixels = mobile.matches ? 1_300_000 : 2_500_000;
    renderer.setPixelRatio(Math.min(preferredRatio, Math.sqrt(maxPixels / (width * height))));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Wide canvases expose more empty space below the fixed camera framing.
    // Progressively lower the scene after laptop widths so 4K layouts keep the
    // network centred in the right-hand half without changing the mobile view.
    const wideDesktopOffset = mobile.matches
      ? 0
      : THREE.MathUtils.clamp((width - 1600) / 1200, 0, 1);
    const wideDesktopScale = 1 - wideDesktopOffset * 0.18;
    root.position.x = mobile.matches ? -0.2 : 0.2 + wideDesktopOffset * 4.2;
    root.position.y = mobile.matches ? -0.15 : -wideDesktopOffset * 1.8;
    root.scale.setScalar(mobile.matches ? 1 : wideDesktopScale);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();

  const setHospitalPulse = (hospital: THREE.Group, amount: number) => {
    hospital.userData.pulse = Math.max((hospital.userData.pulse ?? 0) * 0.9, amount);
    const pulse = hospital.userData.pulse ?? 0;
    const base = mobile.matches ? 0.83 : 0.92;
    hospital.scale.setScalar(base * (1 + pulse * 0.035));
    const beacon = hospital.userData.beacon as THREE.Sprite | undefined;
    if (beacon) {
      beacon.material.opacity = pulse * 0.58;
      beacon.scale.setScalar(0.25 + pulse * 0.55);
    }
  };

  const auditSegmentPoint = (index: number, progress: number) => {
    const start = auditChain.position.clone().add(auditPositions[index]).add(new THREE.Vector3(0, 0.18, 0));
    const end = auditChain.position.clone().add(auditPositions[index + 1]).add(new THREE.Vector3(0, 0.18, 0));
    const midpoint = start.clone().lerp(end, 0.5);
    midpoint.y += 0.12;
    return new THREE.QuadraticBezierCurve3(start, midpoint, end).getPoint(smooth(progress));
  };

  const draw = (timestamp = performance.now()) => {
    if (disposed) return;
    const delta = Math.min(0.05, Math.max(0, (timestamp - lastTime) / 1000));
    lastTime = timestamp;
    elapsed += delta;
    scenePhase += (targetPhase - scenePhase) * (reducedMotion.matches ? 1 : 0.065);

    const connectionProgress = range(scenePhase, 0.05, 1.0);
    const dataProgress = range(scenePhase, 1.08, 2.0);
    const auditProgress = range(scenePhase, 2.06, 3.0);

    hospitals.forEach((hospital, index) => {
      hospital.position.y = center.y + Math.sin(elapsed * 0.62 + index * 1.1) * 0.018;
      setHospitalPulse(hospital, 0);
    });

    for (let orderIndex = 0; orderIndex < connectionOrder.length; orderIndex += 1) {
      const index = connectionOrder[orderIndex];
      const connection = connections[index];
      const reveal = clamp01(connectionProgress * 1.75 - orderIndex * 0.13);
      connection.material.uniforms.uReveal.value = reveal;
      connection.glowMaterial.uniforms.uReveal.value = reveal;
      connection.material.uniforms.uFlow.value = dataProgress;
      connection.glowMaterial.uniforms.uFlow.value = dataProgress * 0.72;
      connection.material.uniforms.uTime.value = elapsed;
      connection.glowMaterial.uniforms.uTime.value = elapsed;
      connection.beacon.material.opacity = reveal * (0.02 + dataProgress * 0.12);
      const impact = clamp01((reveal - 0.86) / 0.14);
      if (impact > 0 && impact < 1) {
        const pulse = Math.sin(impact * Math.PI);
        setHospitalPulse(hospitals[index], pulse);
        walletPulse = Math.max(walletPulse, pulse * 0.5);
      }
    }

    packets.forEach((packet, index) => {
      const visible = dataProgress > 0.08 && auditProgress < 0.94;
      packet.mesh.visible = visible;
      if (!visible) return;
      const progress = (elapsed * packet.speed + packet.offset) % 1;
      packet.mesh.position.copy(connections[packet.hospital].curve.getPoint(smooth(progress)));
      packet.mesh.rotation.x += delta * (0.8 + (index % 3) * 0.1);
      packet.mesh.rotation.y += delta * 1.05;
      packet.mesh.scale.setScalar(0.72 + dataProgress * 0.28);
      if (progress > 0.88) walletPulse = Math.max(walletPulse, Math.sin((progress - 0.88) / 0.12 * Math.PI) * 0.45);
    });

    credentialDots.forEach((dot, index) => {
      const fill = clamp01(dataProgress * credentialDots.length - index);
      const material = dot.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.08 + fill * 1.1;
      dot.scale.setScalar(1 + fill * 0.34);
    });

    walletPulse *= 0.9;
    wallet.position.y = 1.15 + Math.sin(elapsed * 1.08) * 0.045 + walletPulse * 0.05;
    wallet.rotation.z = Math.sin(elapsed * 0.42) * 0.015;
    walletCard.material = walletMaterial;
    walletMaterial.emissiveIntensity = 0.34 + walletPulse * 0.58;
    walletHaloMaterial.opacity = 0.12 + connectionProgress * 0.06 + walletPulse * 0.12;
    walletHalo.rotation.z += delta * 0.08;
    trustCrystal.rotation.x += delta * 0.42;
    trustCrystal.rotation.y += delta * 0.84;
    trustCrystalMaterial.emissiveIntensity = 0.2 + dataProgress * 0.4 + auditProgress * 0.55 + walletPulse * 1.4;

    auditChain.visible = auditProgress > 0.01;
    auditLight.intensity = 0.1 + auditProgress * 4.2;
    auditPathMaterial.uniforms.uReveal.value = auditProgress;
    auditPathMaterial.uniforms.uFlow.value = auditProgress;
    auditPathMaterial.uniforms.uTime.value = elapsed;

    auditBlocks.forEach((block, index) => {
      const reveal = clamp01(auditProgress * 1.55 - index * 0.07);
      block.bodyMaterial.opacity = reveal * 0.52;
      block.edgeMaterial.opacity = reveal * 0.74;
      block.coreMaterial.opacity = reveal * 0.74;
      block.coreMaterial.emissiveIntensity = reveal * 0.28 + block.pulse * 2.3;
      block.group.scale.setScalar(0.82 + reveal * 0.18 + block.pulse * 0.04);
      block.pulse *= 0.9;
    });
    auditLinks.forEach((link, index) => {
      const reveal = clamp01(auditProgress * 1.7 - index * 0.08);
      link.material.uniforms.uReveal.value = reveal;
      link.material.uniforms.uFlow.value = auditProgress;
      link.material.uniforms.uTime.value = elapsed;
    });

    auditPacket.visible = false;
    auditTrail.forEach((sprite) => { sprite.visible = false; });
    if (auditProgress > 0.68) {
      const cycle = reducedMotion.matches ? 0.98 : ((elapsed * 0.22) % 1);
      let point: THREE.Vector3 | null = null;
      if (cycle < 0.26) {
        const progress = smooth(cycle / 0.26);
        point = auditCurve.getPoint(progress);
        if (progress > 0.88) auditBlocks[0].pulse = Math.max(auditBlocks[0].pulse, Math.sin((progress - 0.88) / 0.12 * Math.PI));
      } else {
        const chainProgress = (cycle - 0.26) / 0.74 * (auditCount - 1);
        const segment = Math.min(auditCount - 2, Math.floor(chainProgress));
        const local = chainProgress - segment;
        point = auditSegmentPoint(segment, local);
        if (local > 0.78) auditBlocks[segment + 1].pulse = Math.max(auditBlocks[segment + 1].pulse, Math.sin((local - 0.78) / 0.22 * Math.PI));
      }
      if (point) {
        auditPacket.visible = true;
        auditPacket.position.copy(point);
        auditPacket.rotation.x += delta * 1.8;
        auditPacket.rotation.y += delta * 2.1;
        trailSamples.unshift(point.clone());
        trailSamples = trailSamples.slice(0, auditTrail.length + 1);
        auditTrail.forEach((sprite, index) => {
          const sample = trailSamples[index + 1];
          if (!sample) return;
          sprite.visible = true;
          sprite.position.copy(sample);
          sprite.material.opacity = Math.max(0, 0.28 - index * 0.038);
        });
      }
    }

    ambience.forEach((item, index) => {
      item.sprite.position.x = item.base.x + Math.sin(elapsed * item.speed + item.seed) * 0.12;
      item.sprite.position.y = item.base.y + Math.cos(elapsed * item.speed * 0.78 + item.seed) * 0.07;
      item.sprite.material.opacity = 0.022 + (index % 5 === 0 ? auditProgress * 0.012 : 0);
    });

    const cameraPhase = clamp01(scenePhase / 3);
    const desiredCamera = mobile.matches
      ? new THREE.Vector3(2.15, THREE.MathUtils.lerp(6.5, 5.5, cameraPhase), THREE.MathUtils.lerp(14.4, 13.0, cameraPhase))
      : new THREE.Vector3(-0.25, THREE.MathUtils.lerp(6.35, 5.4, cameraPhase), THREE.MathUtils.lerp(14.7, 13.0, cameraPhase));
    const desiredTarget = mobile.matches
      ? new THREE.Vector3(1.95, THREE.MathUtils.lerp(0.22, -0.46, auditProgress), 0)
      : new THREE.Vector3(1.05, THREE.MathUtils.lerp(0.24, -0.52, auditProgress), 0);
    if (!mobile.matches) {
      const auditFramingOffset = root.position.y * auditProgress;
      desiredCamera.y += auditFramingOffset;
      desiredTarget.y += auditFramingOffset;
    }
    if (!mobile.matches && !reducedMotion.matches) {
      desiredCamera.x += pointerX * 0.34;
      desiredCamera.y += pointerY * 0.12;
      desiredTarget.x += pointerX * 0.08;
    }
    camera.position.lerp(desiredCamera, reducedMotion.matches ? 1 : 0.055);
    const lookTarget = new THREE.Vector3();
    lookTarget.copy(desiredTarget);
    camera.lookAt(lookTarget);

    renderer.render(scene, camera);
  };

  const renderOnce = () => {
    lastTime = performance.now();
    draw(lastTime);
  };

  const setActive = (active: boolean) => {
    if (disposed) return;
    if (reducedMotion.matches || !active) {
      if (running) renderer.setAnimationLoop(null);
      running = false;
      renderOnce();
      return;
    }
    if (running) return;
    running = true;
    lastTime = performance.now();
    renderer.setAnimationLoop(draw);
  };

  const setPhase = (phase: number) => {
    targetPhase = Math.min(3, Math.max(0, phase));
    if (reducedMotion.matches || !running) scenePhase = targetPhase;
    trailSamples = [];
    renderOnce();
  };

  const onPointerMove = (event: PointerEvent) => {
    if (mobile.matches || reducedMotion.matches) return;
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.7;
    pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.45;
  };
  host.closest<HTMLElement>('[data-network-hero]')?.addEventListener('pointermove', onPointerMove);
  disposers.push(() => host.closest<HTMLElement>('[data-network-hero]')?.removeEventListener('pointermove', onPointerMove));

  const onMobileChange = () => {
    resize();
    renderOnce();
  };
  mobile.addEventListener('change', onMobileChange);
  disposers.push(() => mobile.removeEventListener('change', onMobileChange));

  setPhase(targetPhase);

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    renderer.setAnimationLoop(null);
    running = false;
    resizeObserver.disconnect();
    disposers.forEach((disposeListener) => disposeListener());
    resources.forEach((resource) => resource.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };

  return { setPhase, setActive, dispose };
}
