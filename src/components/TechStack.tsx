import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsChain from "./SkillsChain";

interface SkillConfig {
  id: string;
  label: string;
  baseColor: string;
  gradientInner: string;
  ringColor: string;
  accentColor: string;
  textColor: string;
  metalness: number;
  roughness: number;
  drawLogo: (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) => void;
}

const SKILL_CONFIGS: SkillConfig[] = [
  {
    id: "ai-ml",
    label: "AI / ML",
    baseColor: "#140409",
    gradientInner: "#380a15",
    ringColor: "#9e1b32",
    accentColor: "#d93248",
    textColor: "#ffffff",
    metalness: 0.3,
    roughness: 0.75,
    drawLogo: (ctx, cx, cy, size) => {
      const r = size * 0.44;
      ctx.save();
      ctx.strokeStyle = "rgba(217, 50, 72, 0.75)";
      ctx.lineWidth = 2.5;

      const nodes = [
        [0, 0, 10, "#ffffff"],
        [-r * 0.72, -r * 0.6, 6, "#d93248"],
        [r * 0.72, -r * 0.6, 6, "#d93248"],
        [-r * 0.85, r * 0.5, 5.5, "#ff4d6d"],
        [r * 0.85, r * 0.5, 5.5, "#ff4d6d"],
        [0, -r * 0.82, 5, "#ff758f"],
        [0, r * 0.82, 5, "#ff758f"],
      ];

      nodes.slice(1).forEach(([nx, ny]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + (nx as number), cy + (ny as number));
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.moveTo(cx + (nodes[1][0] as number), cy + (nodes[1][1] as number));
      ctx.lineTo(cx + (nodes[5][0] as number), cy + (nodes[5][1] as number));
      ctx.lineTo(cx + (nodes[2][0] as number), cy + (nodes[2][1] as number));
      ctx.stroke();

      nodes.forEach(([nx, ny, rad, color]) => {
        ctx.fillStyle = color as string;
        ctx.beginPath();
        ctx.arc(cx + (nx as number), cy + (ny as number), rad as number, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    },
  },
  {
    id: "agentic-ai",
    label: "Agentic AI",
    baseColor: "#130509",
    gradientInner: "#420d1a",
    ringColor: "#b32038",
    accentColor: "#ff4d6d",
    textColor: "#ffffff",
    metalness: 0.3,
    roughness: 0.75,
    drawLogo: (ctx, cx, cy, size) => {
      const r = size * 0.44;
      ctx.save();
      ctx.strokeStyle = "rgba(255, 77, 109, 0.75)";
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.45, Math.PI / 3.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.45, -Math.PI / 3.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 8.5, 0, Math.PI * 2);
      ctx.fill();

      const satellites = [
        [r * 0.7, -r * 0.35],
        [-r * 0.7, r * 0.35],
        [r * 0.35, r * 0.7],
        [-r * 0.35, -r * 0.7],
      ];
      ctx.fillStyle = "#ff4d6d";
      satellites.forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.arc(cx + sx, cy + sy, 4.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    },
  },
  {
    id: "numpy",
    label: "NumPy",
    baseColor: "#09131f",
    gradientInner: "#132c45",
    ringColor: "#4d77cf",
    accentColor: "#4dabcf",
    textColor: "#ffffff",
    metalness: 0.35,
    roughness: 0.75,
    drawLogo: (ctx, cx, cy, size) => {
      const scale = size / 24;
      ctx.save();
      ctx.translate(cx - 12 * scale, cy - 12 * scale);
      ctx.scale(scale, scale);

      const numpyPath = new Path2D(
        "M10.315 4.876L6.3048 2.8517l-4.401 2.1965 4.1186 2.0683zm1.8381.9277l4.2045 2.1223-4.3622 2.1906-4.125-2.0718zm5.6153-2.9213l4.3193 2.1658-3.863 1.9402-4.2131-2.1252zm-1.859-.9329L12.021 0 8.1742 1.9193l4.0068 2.0208zm-3.0401 16.7443V24l4.7107-2.3507-.0053-5.3085zm4.7037-4.2057l-.0052-5.2528-4.6985 2.3356v5.2546zm5.6553-.9845v5.327l-4.0178 2.0052-.0029-5.3028zm0-1.8626V6.4214l-4.0253 2.001.0034 5.2633zM11.2062 11.571L8.0333 9.9756v6.895s-3.8804-8.2564-4.2399-8.998c-.0463-.0957-.2371-.2007-.2858-.2262C2.8118 7.2812.773 6.2485.773 6.2485V18.43l2.8204 1.5076v-6.3674s3.8392 7.3775 3.878 7.458c.0389.0807.4245.8582.8362 1.1314.5485.363 2.8992 1.7766 2.8992 1.7766z"
      );
      ctx.fillStyle = "#4dabcf";
      ctx.fill(numpyPath);
      ctx.restore();
    },
  },
  {
    id: "pandas",
    label: "Pandas",
    baseColor: "#110819",
    gradientInner: "#2b133b",
    ringColor: "#e70488",
    accentColor: "#e70488",
    textColor: "#ffffff",
    metalness: 0.35,
    roughness: 0.75,
    drawLogo: (ctx, cx, cy, size) => {
      const scale = size / 24;
      ctx.save();
      ctx.translate(cx - 12 * scale, cy - 12 * scale);
      ctx.scale(scale, scale);

      const pandasPath = new Path2D(
        "M16.922 0h2.623v18.104h-2.623zm-4.126 12.94h2.623v2.57h-2.623zm0-7.037h2.623v5.446h-2.623zm0 11.197h2.623v5.446h-2.623zM4.456 5.896h2.622V24H4.455zm4.213 2.559h2.623v2.57H8.67zm0 4.151h2.623v5.447H8.67zm0-11.187h2.623v5.446H8.67Z"
      );
      ctx.fillStyle = "#ffffff";
      ctx.fill(pandasPath);

      ctx.fillStyle = "#e70488";
      ctx.fillRect(8.67, 8.455, 2.623, 2.57);
      ctx.fillRect(12.796, 12.94, 2.623, 2.57);

      ctx.restore();
    },
  },
  {
    id: "gen-ai",
    label: "Gen AI",
    baseColor: "#16050b",
    gradientInner: "#4d0e1b",
    ringColor: "#c72844",
    accentColor: "#ff5c7c",
    textColor: "#ffffff",
    metalness: 0.3,
    roughness: 0.75,
    drawLogo: (ctx, cx, cy, size) => {
      const r = size * 0.44;
      ctx.save();

      ctx.fillStyle = "#ff4d6d";
      ctx.beginPath();
      ctx.moveTo(cx, cy - r);
      ctx.quadraticCurveTo(cx, cy, cx + r, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + r);
      ctx.quadraticCurveTo(cx, cy, cx - r, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - r);
      ctx.closePath();
      ctx.fill();

      const r2 = r * 0.48;
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.beginPath();
      ctx.moveTo(cx, cy - r2);
      ctx.lineTo(cx + r2, cy);
      ctx.lineTo(cx, cy + r2);
      ctx.lineTo(cx - r2, cy);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
  },
  {
    id: "python",
    label: "Python",
    baseColor: "#0d1722",
    gradientInner: "#182c40",
    ringColor: "#2b5b84",
    accentColor: "#ffd43b",
    textColor: "#ffffff",
    metalness: 0.35,
    roughness: 0.75,
    drawLogo: (ctx, cx, cy, size) => {
      const scale = size / 24;
      ctx.save();
      ctx.translate(cx - 12 * scale, cy - 12 * scale);
      ctx.scale(scale, scale);

      const topSnake = new Path2D(
        "M 11.9 0 C 6.5 0 6.9 2.3 6.9 2.3 L 6.9 4.7 L 12.1 4.7 L 12.1 5.5 L 4.9 5.5 C 4.9 5.5 0 5 0 11.8 C 0 18.6 4.3 18.3 4.3 18.3 L 6.8 18.3 L 6.8 14.8 C 6.8 14.8 6.7 10.7 10.8 10.7 L 15.9 10.7 C 15.9 10.7 19.8 10.8 19.8 6.9 L 19.8 2.3 C 19.8 2.3 20.3 0 11.9 0 Z M 8.8 1.8 C 9.5 1.8 10 2.4 10 3.1 C 10 3.8 9.5 4.3 8.8 4.3 C 8.1 4.3 7.6 3.8 7.6 3.1 C 7.6 2.4 8.1 1.8 8.8 1.8 Z"
      );
      ctx.fillStyle = "#387eb8";
      ctx.fill(topSnake);

      const bottomSnake = new Path2D(
        "M 12.1 24 C 17.5 24 17.1 21.7 17.1 21.7 L 17.1 19.3 L 11.9 19.3 L 11.9 18.5 L 19.1 18.5 C 19.1 18.5 24 19 24 12.2 C 24 5.4 19.7 5.7 19.7 5.7 L 17.2 5.7 L 17.2 9.2 C 17.2 9.2 17.3 13.3 13.2 13.3 L 8.1 13.3 C 8.1 13.3 4.2 13.2 4.2 17.1 L 4.2 21.7 C 4.2 21.7 3.7 24 12.1 24 Z M 15.2 22.2 C 14.5 22.2 14 21.6 14 20.9 C 14 20.2 14.5 19.7 15.2 19.7 C 15.9 19.7 16.4 20.2 16.4 20.9 C 16.4 21.6 15.9 22.2 15.2 22.2 Z"
      );
      ctx.fillStyle = "#ffc331";
      ctx.fill(bottomSnake);

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(8.8, 3.1, 0.85, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#142436";
      ctx.beginPath();
      ctx.arc(15.2, 20.9, 0.85, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
  },
];

// Helper to create crisp, physical canvas textures for each skill with official logos
function createSkillTexture(config: SkillConfig): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  // Subtle dark radial gradient base
  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 320);
  grad.addColorStop(0, config.gradientInner);
  grad.addColorStop(1, config.baseColor);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Draw emblem badge on both sides (x = 256 and x = 0/512) so logo is visible from any angle
  const drawEmblem = (cx: number, cy: number) => {
    // Outer hairline ring
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 142, 0, Math.PI * 2);
    ctx.stroke();

    // Primary technology accent ring
    ctx.strokeStyle = config.ringColor;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 132, 0, Math.PI * 2);
    ctx.stroke();

    // Technology Logo
    config.drawLogo(ctx, cx, cy - 32, 76);

    // Skill Name
    ctx.fillStyle = config.textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const fontSize = config.label.length > 8 ? 30 : 36;
    ctx.font = `bold ${fontSize}px "Geist", -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.fillText(config.label, cx, cy + 64);

    // Technology Accent Dot
    ctx.fillStyle = config.accentColor;
    ctx.beginPath();
    ctx.arc(cx, cy + 98, 4, 0, Math.PI * 2);
    ctx.fill();
  };

  drawEmblem(256, 256);
  drawEmblem(0, 256);
  drawEmblem(512, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

// Moderately reduced sphere scale (~18% reduction: 0.48 to 0.57)
// Total 18 spheres (3 per skill) for optimal breathing room and physics fluidity
const SPHERE_SCALES = [0.48, 0.55, 0.50, 0.57, 0.49, 0.53];
const spheres = [...Array(18)].map((_, i) => ({
  scale: SPHERE_SCALES[i % SPHERE_SCALES.length],
  skillIndex: i % SKILL_CONFIGS.length,
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -45 * delta * scale,
          -130 * delta * scale,
          -45 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(14), r(14) - 16, r(14) - 6]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[1.8]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Refresh ScrollTrigger so pinning offsets are precisely calculated
    ScrollTrigger.refresh();

    const handleScroll = () => {
      const skillsEl = document.getElementById("skills");
      if (skillsEl) {
        const rect = skillsEl.getBoundingClientRect();
        // Activate physics when entering within 400px of the section
        setIsActive(rect.top < window.innerHeight + 200 && rect.bottom > -200);
      } else {
        setIsActive(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Generate materials for the 6 exact skills with subtle technology sheens
  const materials = useMemo(() => {
    return SKILL_CONFIGS.map((config) => {
      const texture = createSkillTexture(config);
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        color: "#ffffff",
        emissive: config.ringColor,
        emissiveMap: texture,
        emissiveIntensity: 0.16,
        metalness: config.metalness,
        roughness: config.roughness,
        clearcoat: 0.15,
      });
    });
  }, []);

  return (
    <div className="skills-section" id="skills">
      <div className="skills-container section-container">
        {/* Dedicated Section Heading with Burgundy Accent */}
        <div className="skills-header">
          <h3 className="skills-subtitle">EXPERTISE</h3>
          <h2 className="skills-title">SKILLS</h2>
          <p className="skills-desc">
            Interactive physics-driven neural & technology stack
          </p>
        </div>

        {/* Defined Matte Block enclosing the 3D Spheres */}
        <div className="skills-sphere-block">
          <Canvas
            shadows
            gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
            camera={{ position: [0, 0, 19], fov: 32.5, near: 1, far: 100 }}
            onCreated={(state) => (state.gl.toneMappingExposure = 1.35)}
            className="tech-canvas"
          >
            <ambientLight intensity={1.1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.25}
              color="#f5e6e8"
              castShadow
              shadow-mapSize={[512, 512]}
            />
            <directionalLight position={[0, 5, -4]} intensity={2} color="#ffffff" />
            <Physics gravity={[0, 0, 0]}>
              <Pointer isActive={isActive} />
              {spheres.map((props, i) => (
                <SphereGeo
                  key={i}
                  scale={props.scale}
                  material={materials[props.skillIndex]}
                  isActive={isActive}
                />
              ))}
            </Physics>
            <Environment
              files="/models/char_enviorment.hdr"
              environmentIntensity={0.45}
              environmentRotation={[0, 4, 2]}
            />
          </Canvas>
        </div>

        {/* Cinematic Technical Skills Chain / Network */}
        <SkillsChain />
      </div>
    </div>
  );
};

export default TechStack;
