import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const Route = createFileRoute("/game")({
  component: CareerStreetGame,
});

type StreetStop = {
  title: string;
  subtitle: string;
  details: string[];
  side: "left" | "right";
  z: number;
  color: number;
};

const streetStops: StreetStop[] = [
  {
    title: "Hemant Bhanot",
    subtitle: "Software Engineer",
    details: [
      "Reliable and scalable backend systems",
      "Distributed systems for graph and key-value databases",
    ],
    side: "left",
    z: 0,
    color: 0x3b82f6,
  },
  {
    title: "AWS",
    subtitle: "Software Development Engineer | 2023 - 2025",
    details: [
      "Java, C, React, Docker, DynamoDB, Lambda",
      "Shipped Neptune Analytics launch and export features",
    ],
    side: "right",
    z: -9,
    color: 0xf59e0b,
  },
  {
    title: "AWS Intern",
    subtitle: "Graph Databases | Summer 2022",
    details: ["Java, Python, and Bash shell scripting"],
    side: "left",
    z: -18,
    color: 0x10b981,
  },
  {
    title: "Shopify",
    subtitle: "Backend Developer Intern | Fall 2021",
    details: ["Ruby on Rails, React, MySQL, and GraphQL"],
    side: "right",
    z: -27,
    color: 0x22c55e,
  },
  {
    title: "Flipp",
    subtitle: "Software Engineer Intern | Winter 2021",
    details: ["Ruby on Rails, PostgreSQL, Kafka, and vanilla JS"],
    side: "left",
    z: -36,
    color: 0xef4444,
  },
  {
    title: "Verto + RBC",
    subtitle: "Full-stack, DevOps, and early engineering roles",
    details: ["Angular, TypeScript, Rails, PostgreSQL, Python", "Java and Jenkins CI/CD"],
    side: "right",
    z: -45,
    color: 0x8b5cf6,
  },
  {
    title: "University of Toronto",
    subtitle: "Honours BSc, Computer Science",
    details: ["Graduated with Distinction", "Teaching Assistant for software engineering courses"],
    side: "left",
    z: -54,
    color: 0x06b6d4,
  },
  {
    title: "Get in touch",
    subtitle: "hemant.bhanot01@gmail.com",
    details: ["Open to hiring teams and engineering leaders", "LinkedIn: /in/hemant-bhanot"],
    side: "right",
    z: -63,
    color: 0x111827,
  },
];

const controls = [
  { label: "Forward", keyName: "w", className: "col-start-2 row-start-1" },
  { label: "Left", keyName: "a", className: "col-start-1 row-start-2" },
  { label: "Back", keyName: "s", className: "col-start-2 row-start-2" },
  { label: "Right", keyName: "d", className: "col-start-3 row-start-2" },
];

function CareerStreetGame() {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeKeys = useRef(new Set<string>());
  const releaseTimers = useRef(new Map<string, number>());
  const [nearbyStop, setNearbyStop] = useState<StreetStop>(streetStops[0]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcfe8ff);
    scene.fog = new THREE.Fog(0xcfe8ff, 22, 82);

    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 180);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x6b7280, 1.8);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xffffff, 2.8);
    sun.position.set(-8, 16, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    scene.add(sun);

    const road = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.08, 78),
      new THREE.MeshStandardMaterial({ color: 0x30343b, roughness: 0.85 }),
    );
    road.position.set(0, -0.04, -32);
    road.receiveShadow = true;
    scene.add(road);

    const sidewalkMaterial = new THREE.MeshStandardMaterial({
      color: 0xd7dde5,
      roughness: 0.7,
    });
    [-4.2, 4.2].forEach((x) => {
      const sidewalk = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.12, 78), sidewalkMaterial);
      sidewalk.position.set(x, 0, -32);
      sidewalk.receiveShadow = true;
      scene.add(sidewalk);
    });

    for (let z = 5; z > -70; z -= 5) {
      const stripe = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.012, 2.2),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 }),
      );
      stripe.position.set(0, 0.035, z);
      scene.add(stripe);
    }

    const signTargets: Array<{ stop: StreetStop; position: THREE.Vector3 }> = [];
    streetStops.forEach((stop, index) => {
      addBuilding(scene, stop, index);
      signTargets.push({
        stop,
        position: new THREE.Vector3(stop.side === "left" ? -3.1 : 3.1, 2.25, stop.z),
      });
    });

    const character = createBlockCharacter();
    character.position.set(0, 0, 4);
    scene.add(character);

    const clock = new THREE.Clock();
    let animationFrame = 0;
    let lastStopTitle = streetStops[0].title;

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      window.clearTimeout(releaseTimers.current.get(key));
      releaseTimers.current.delete(key);
      activeKeys.current.add(key);
    };

    const onKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      window.clearTimeout(releaseTimers.current.get(key));
      releaseTimers.current.set(
        key,
        window.setTimeout(() => {
          activeKeys.current.delete(key);
          releaseTimers.current.delete(key);
        }, 120),
      );
    };

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.033);
      const speed = 8.5 * delta;
      const keys = activeKeys.current;
      const direction = new THREE.Vector3(
        Number(keys.has("d") || keys.has("arrowright")) -
          Number(keys.has("a") || keys.has("arrowleft")),
        0,
        Number(keys.has("s") || keys.has("arrowdown")) -
          Number(keys.has("w") || keys.has("arrowup")),
      );

      if (direction.lengthSq() > 0) {
        direction.normalize();
        character.position.x = THREE.MathUtils.clamp(
          character.position.x + direction.x * speed,
          -2.3,
          2.3,
        );
        character.position.z = THREE.MathUtils.clamp(
          character.position.z + direction.z * speed,
          -66,
          5,
        );
        character.rotation.y = Math.atan2(direction.x, direction.z);
        const stride = Math.sin(clock.elapsedTime * 12) * 0.35;
        character.children[4].rotation.x = stride;
        character.children[5].rotation.x = -stride;
        character.children[6].rotation.x = -stride;
        character.children[7].rotation.x = stride;
      } else {
        character.children[4].rotation.x *= 0.82;
        character.children[5].rotation.x *= 0.82;
        character.children[6].rotation.x *= 0.82;
        character.children[7].rotation.x *= 0.82;
      }

      let closest = signTargets[0];
      let closestDistance = Infinity;
      signTargets.forEach((target) => {
        const distance = Math.abs(target.position.z - character.position.z);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = target;
        }
      });
      if (closest.stop.title !== lastStopTitle) {
        lastStopTitle = closest.stop.title;
        setNearbyStop(closest.stop);
      }

      const cameraTarget = new THREE.Vector3(
        character.position.x,
        2.35,
        character.position.z + 6.2,
      );
      camera.position.lerp(cameraTarget, 0.12);
      camera.lookAt(character.position.x, 1.35, character.position.z - 2.8);
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      releaseTimers.current.forEach((timer) => window.clearTimeout(timer));
      releaseTimers.current.clear();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  const press = (keyName: string, isDown: boolean) => {
    if (isDown) {
      window.clearTimeout(releaseTimers.current.get(keyName));
      releaseTimers.current.delete(keyName);
      activeKeys.current.add(keyName);
    } else {
      window.clearTimeout(releaseTimers.current.get(keyName));
      releaseTimers.current.set(
        keyName,
        window.setTimeout(() => {
          activeKeys.current.delete(keyName);
          releaseTimers.current.delete(keyName);
        }, 120),
      );
    }
  };

  return (
    <main className="relative h-screen overflow-hidden bg-sky-100 text-neutral-950">
      <div ref={mountRef} className="absolute inset-0" aria-label="3D career street game" />

      <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-start justify-between gap-4">
        <div className="pointer-events-auto max-w-sm rounded-md border border-white/70 bg-white/88 p-4 shadow-lg backdrop-blur">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            <Gamepad2 className="h-4 w-4" />
            Career Street
          </div>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">{nearbyStop.title}</h1>
          <p className="mt-1 text-sm text-neutral-600">{nearbyStop.subtitle}</p>
          <ul className="mt-3 space-y-1 text-sm leading-relaxed text-neutral-800">
            {nearbyStop.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>
        <Link
          to="/"
          className="pointer-events-auto inline-flex h-10 items-center gap-2 rounded-md border border-white/70 bg-white/88 px-3 text-sm font-medium text-neutral-900 shadow-lg backdrop-blur hover:bg-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Portfolio
        </Link>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 hidden rounded-md border border-white/70 bg-white/88 px-3 py-2 text-xs font-medium text-neutral-700 shadow-lg backdrop-blur sm:block">
        Move with WASD or arrow keys. Walk near signs to read the site information.
      </div>

      <div className="absolute bottom-4 right-4 grid h-28 w-36 grid-cols-3 grid-rows-2 gap-2 sm:hidden">
        {controls.map((control) => (
          <button
            key={control.keyName}
            type="button"
            aria-label={control.label}
            className={`${control.className} rounded-md border border-white/70 bg-white/88 text-sm font-semibold shadow-lg backdrop-blur active:bg-white`}
            onPointerDown={() => press(control.keyName, true)}
            onPointerUp={() => press(control.keyName, false)}
            onPointerLeave={() => press(control.keyName, false)}
          >
            {control.keyName.toUpperCase()}
          </button>
        ))}
      </div>
    </main>
  );
}

function addBuilding(scene: THREE.Scene, stop: StreetStop, index: number) {
  const x = stop.side === "left" ? -7 : 7;
  const height = 4.6 + (index % 3) * 1.2;
  const width = 3.2 + (index % 2) * 0.8;
  const depth = 4.5;
  const building = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(stop.color).offsetHSL(0, -0.12, 0.08),
      roughness: 0.78,
      metalness: 0.05,
    }),
  );
  building.position.set(x, height / 2, stop.z);
  building.castShadow = true;
  building.receiveShadow = true;
  scene.add(building);

  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(3.8, 1.85),
    new THREE.MeshBasicMaterial({
      map: createSignTexture(stop),
      transparent: true,
    }),
  );
  sign.position.set(stop.side === "left" ? -4.76 : 4.76, 2.8, stop.z + 0.05);
  sign.rotation.y = stop.side === "left" ? Math.PI / 2 : -Math.PI / 2;
  scene.add(sign);

  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    emissive: 0xbde7ff,
    emissiveIntensity: 0.18,
    roughness: 0.35,
  });
  for (let row = 0; row < Math.floor(height / 1.2); row += 1) {
    for (let col = -1; col <= 1; col += 1) {
      const pane = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.34, 0.04), windowMaterial);
      pane.position.set(x + col * 0.75, 1.1 + row * 1.05, stop.z + depth / 2 + 0.03);
      scene.add(pane);
    }
  }

  const postMaterial = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.6 });
  const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.4, 12), postMaterial);
  lamp.position.set(stop.side === "left" ? -3.25 : 3.25, 1.2, stop.z + 2.9);
  scene.add(lamp);

  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 18, 12),
    new THREE.MeshStandardMaterial({ color: 0xfff7cf, emissive: 0xfacc15, emissiveIntensity: 1.2 }),
  );
  bulb.position.set(lamp.position.x, 2.45, lamp.position.z);
  scene.add(bulb);
}

function createBlockCharacter() {
  const group = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xf2c199, roughness: 0.55 });
  const shirt = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.65 });
  const pants = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.7 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.8 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.75, 1, 0.38), shirt);
  body.position.y = 1.25;
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.62, 0.62), skin);
  head.position.y = 2.05;
  const cap = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.16, 0.7), hair);
  cap.position.y = 2.43;
  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.25, 0.4), pants);
  hips.position.y = 0.67;
  const leftArm = limb(new THREE.BoxGeometry(0.24, 0.85, 0.24), shirt, -0.58, 1.23);
  const rightArm = limb(new THREE.BoxGeometry(0.24, 0.85, 0.24), shirt, 0.58, 1.23);
  const leftLeg = limb(new THREE.BoxGeometry(0.28, 0.86, 0.28), pants, -0.22, 0.22);
  const rightLeg = limb(new THREE.BoxGeometry(0.28, 0.86, 0.28), pants, 0.22, 0.22);

  [body, head, cap, hips, leftArm, rightArm, leftLeg, rightLeg].forEach((part) => {
    part.castShadow = true;
    group.add(part);
  });
  return group;
}

function limb(geometry: THREE.BoxGeometry, material: THREE.Material, x: number, y: number) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, 0);
  return mesh;
}

function createSignTexture(stop: StreetStop) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `#${stop.color.toString(16).padStart(6, "0")}`;
  ctx.fillRect(0, 0, 28, canvas.height);
  ctx.fillStyle = "#111827";
  ctx.font = "700 58px Arial";
  wrapText(ctx, stop.title, 70, 100, 860, 64);
  ctx.fillStyle = "#4b5563";
  ctx.font = "500 32px Arial";
  wrapText(ctx, stop.subtitle, 70, 190, 850, 42);
  ctx.fillStyle = "#111827";
  ctx.font = "400 30px Arial";
  stop.details.forEach((detail, index) => {
    wrapText(ctx, detail, 70, 285 + index * 76, 850, 38);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  words.forEach((word, index) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = testLine;
    }
    if (index === words.length - 1) {
      ctx.fillText(line, x, y);
    }
  });
}
