"use client";

import { useEffect, useRef } from "react";

type ImmersiveStageProps = {
  title: string;
  eyebrow: string;
  detail: string;
  portraitUrl?: string;
  orbitLabels?: string[];
};

export function ImmersiveStage({
  title,
  eyebrow,
  detail,
  portraitUrl,
  orbitLabels = ["Real Estate", "Systems", "AI", "Hudson Valley"],
}: ImmersiveStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;

    if (!container) {
      return;
    }

    let mounted = true;
    let renderer: import("three").WebGLRenderer | null = null;
    let frameId = 0;
    let cleanupResize = () => undefined;
    let loop: FrameRequestCallback | null = null;

    async function boot() {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const THREE = await import("three");

      if (!mounted || !container) {
        return;
      }

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xfbf6ef, 5, 13);

      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100,
      );
      camera.position.set(0, 0.25, 7);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const ambient = new THREE.AmbientLight(0xffffff, 0.9);
      const point = new THREE.PointLight(0xf59e0b, 9, 30);
      point.position.set(2, 3, 4);
      scene.add(ambient, point);

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.25, 1),
        new THREE.MeshPhysicalMaterial({
          color: 0x142033,
          emissive: 0x0f172a,
          emissiveIntensity: 0.18,
          roughness: 0.2,
          metalness: 0.45,
          clearcoat: 1,
          clearcoatRoughness: 0.2,
        }),
      );
      scene.add(core);

      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(2.15, 0.08, 18, 120),
        new THREE.MeshBasicMaterial({
          color: 0xb75a24,
          transparent: true,
          opacity: 0.72,
        }),
      );
      halo.rotation.x = Math.PI / 2.6;
      scene.add(halo);

      const ring = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.85, 0.16, 140, 24),
        new THREE.MeshStandardMaterial({
          color: 0xd9a65a,
          metalness: 0.85,
          roughness: 0.25,
        }),
      );
      ring.rotation.z = 0.3;
      scene.add(ring);

      const stars = new THREE.Group();
      const starGeo = new THREE.SphereGeometry(0.04, 12, 12);
      const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

      for (let index = 0; index < 36; index += 1) {
        const star = new THREE.Mesh(starGeo, starMat);
        const angle = (index / 36) * Math.PI * 2;
        const radius = 3 + (index % 3) * 0.4;
        star.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.2) * 1.6, Math.sin(angle) * 1.8);
        stars.add(star);
      }

      scene.add(stars);

      const pointer = { x: 0, y: 0 };
      const handleMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
      };

      window.addEventListener("pointermove", handleMove);

      const resize = () => {
        if (!container || !renderer) {
          return;
        }

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      window.addEventListener("resize", resize);
      cleanupResize = () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", handleMove);
      };

      loop = () => {
        if (!renderer || !mounted) {
          return;
        }

        const speed = prefersReducedMotion ? 0.0015 : 0.0055;
        core.rotation.x += speed;
        core.rotation.y += speed * 1.2;
        halo.rotation.z += speed * 0.7;
        ring.rotation.x -= speed * 0.65;
        ring.rotation.y += speed * 0.5;
        stars.rotation.y += speed * 0.18;
        stars.rotation.x -= speed * 0.08;

        camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.03;
        camera.position.y += (-pointer.y * 0.32 - camera.position.y + 0.25) * 0.03;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(loop!);
      };

      frameId = window.requestAnimationFrame(loop!);
    }

    void boot();

    const handleVisibility = () => {
      if (document.hidden && frameId) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }

      if (!document.hidden && !frameId && loop) {
        frameId = window.requestAnimationFrame(loop);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      mounted = false;
      document.removeEventListener("visibilitychange", handleVisibility);
      cleanupResize();
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (renderer) {
        renderer.dispose();
      }
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(217,166,90,0.32),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(77,127,179,0.22),_transparent_30%),linear-gradient(160deg,_rgba(20,32,51,0.98)_0%,_rgba(18,27,43,0.96)_44%,_rgba(52,23,10,0.94)_100%)] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.08),_transparent_26%,_transparent_72%,_rgba(255,255,255,0.08))]" />
      <div className="pointer-events-none absolute left-[-4rem] top-[-4rem] h-32 w-32 rounded-full bg-[rgba(217,166,90,0.18)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-5rem] right-[-4rem] h-40 w-40 rounded-full bg-[rgba(77,127,179,0.18)] blur-3xl" />
      <div ref={mountRef} className="absolute inset-0" aria-hidden />
      <div className="relative z-10 max-w-xs space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">{eyebrow}</p>
        <h3 className="font-display text-3xl leading-tight">{title}</h3>
        <p className="text-sm leading-7 text-white/78">{detail}</p>
      </div>
      {portraitUrl ? (
        <div className="absolute bottom-8 right-6 z-10 w-[11rem] overflow-hidden rounded-[1.5rem] border border-white/14 bg-white/8 shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur">
          <img src={portraitUrl} alt="" className="h-[14rem] w-full object-cover" />
        </div>
      ) : null}
      <div className="relative z-10 mt-44 grid gap-3 text-xs uppercase tracking-[0.24em] text-white/70 sm:grid-cols-2">
        {orbitLabels.map((label) => (
          <div
            key={label}
            className="rounded-full border border-white/12 bg-white/7 px-4 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
