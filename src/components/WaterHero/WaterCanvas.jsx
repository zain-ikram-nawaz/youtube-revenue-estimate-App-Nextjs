'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useMemo, useRef } from 'react';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying float vElevation;

  float wave(vec2 p, float speed, float frequency, float amplitude) {
    return sin(dot(p, vec2(0.82, 0.57)) * frequency + uTime * speed) * amplitude;
  }

  void main() {
    vUv = uv;

    vec3 transformed = position;
    vec2 surfacePosition = transformed.xy;
    float distanceToMouse = distance(surfacePosition, uMouse);
    float rippleEnvelope = exp(-distanceToMouse * 0.72);
    float ripple = sin(distanceToMouse * 7.0 - uTime * 4.5)
      * rippleEnvelope
      * uMouseStrength;

    float broadWaves = wave(surfacePosition, 0.45, 0.48, 0.24)
      + wave(surfacePosition + 3.0, -0.28, 0.82, 0.105)
      + wave(surfacePosition - 5.0, 0.2, 1.45, 0.04);

    transformed.z = broadWaves + ripple * 0.34;
    vElevation = transformed.z;

    vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uDeepColor;
  uniform vec3 uMidColor;
  uniform vec3 uLightColor;
  uniform vec3 uSunDirection;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying float vElevation;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    vec2 flowUv = vWorldPosition.xz * 0.72;
    float n1 = noise(flowUv + vec2(uTime * 0.035, -uTime * 0.02));
    float n2 = noise(flowUv * 2.15 - vec2(uTime * 0.06, uTime * 0.025));
    float caustics = smoothstep(0.28, 0.9, n1 * 0.7 + n2 * 0.3);

    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vec3(
      (n1 - 0.5) * 0.34,
      1.0,
      (n2 - 0.5) * 0.34
    ));

    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.2);
    vec3 reflectedSky = mix(uMidColor, uLightColor, fresnel * 0.9 + caustics * 0.2);

    vec3 reflectionDirection = reflect(-viewDirection, normal);
    float sunHighlight = pow(max(dot(reflectionDirection, normalize(uSunDirection)), 0.0), 72.0);
    float glint = pow(max(dot(reflectionDirection, normalize(uSunDirection)), 0.0), 240.0);

    float depthGradient = smoothstep(-0.55, 0.45, vWorldPosition.y + vUv.y * 0.25);
    vec3 waterColor = mix(uDeepColor, reflectedSky, depthGradient * 0.82 + fresnel * 0.34);
    waterColor += uLightColor * sunHighlight * 0.72;
    waterColor += vec3(0.68, 0.92, 1.0) * glint * 1.4;
    waterColor += uLightColor * caustics * 0.075;

    float edgeFoam = smoothstep(0.23, 0.58, abs(vElevation));
    waterColor = mix(waterColor, waterColor + vec3(0.12, 0.32, 0.36), edgeFoam * 0.18);

    gl_FragColor = vec4(waterColor, 0.98);
  }
`;

function WaterSurface({ reducedMotion = false }) {
  const materialRef = useRef(null);
  const { clock } = useThree();
  const mouseTarget = useRef(new THREE.Vector2(0, 0));
  const mouseCurrent = useRef(new THREE.Vector2(0, 0));
  const rippleTarget = useRef(0);
  const rippleCurrent = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: 0 },
      uDeepColor: { value: new THREE.Color('#031629') },
      uMidColor: { value: new THREE.Color('#08728a') },
      uLightColor: { value: new THREE.Color('#7de9ed') },
      uSunDirection: { value: new THREE.Vector3(-0.45, 0.85, 0.3) },
    }),
    [],
  );

  useFrame(() => {
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.uTime.value = reducedMotion ? 0 : clock.getElapsedTime();

    mouseCurrent.current.lerp(mouseTarget.current, 0.075);
    rippleCurrent.current = THREE.MathUtils.lerp(
      rippleCurrent.current,
      rippleTarget.current,
      0.08,
    );

    material.uniforms.uMouse.value.copy(mouseCurrent.current);
    material.uniforms.uMouseStrength.value = reducedMotion ? 0 : rippleCurrent.current;
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerMove={(event) => {
        mouseTarget.current.set(event.point.x, -event.point.z);
        rippleTarget.current = 1;
      }}
      onPointerEnter={() => {
        rippleTarget.current = 1;
      }}
      onPointerLeave={() => {
        rippleTarget.current = 0;
      }}
    >
      <planeGeometry args={[24, 16, 150, 100]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
}

function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.3, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.8 + pointer.y * 0.12, 0.035);
    target.set(0, 0, 0);
    camera.lookAt(target);
  });

  return null;
}

export default function WaterCanvas({ reducedMotion = false, className = '' }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 2.8, 7.4], fov: 43, near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#031824', 1)}
    >
      <ambientLight intensity={0.45} color="#9de7ed" />
      <directionalLight position={[-4, 7, 4]} intensity={2.2} color="#b8ffff" />
      <directionalLight position={[5, 2, -3]} intensity={0.55} color="#267b9d" />
      <WaterSurface reducedMotion={reducedMotion} />
      <CameraRig />
    </Canvas>
  );
}
