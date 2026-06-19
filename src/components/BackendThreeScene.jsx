import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatePresence } from 'framer-motion';

// Helper to simulate typed/flickering code lines in the IDE
function CodeLine({ position, length, delay }) {
  const meshRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Fast blinking/flickering opacity to simulate compiling code text
      const pulse = 0.4 + Math.sin(time * 6.5 + delay) * 0.35;
      meshRef.current.material.opacity = pulse;
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[length, 0.032, 0.015]} />
      <meshBasicMaterial color="#00d2ff" transparent opacity={0.7} />
    </mesh>
  );
}

// Helper to simulate request flashing LEDs on Server
function ServerLed({ position, delay, isHovered }) {
  const meshRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Rapid blinking rate when hovered, normal pacing when idle
      const rate = isHovered ? 16.0 : 7.0;
      const blink = Math.sin(time * rate + delay) > 0.0 ? 1.0 : 0.2;
      meshRef.current.material.opacity = blink;
      meshRef.current.material.color.set(isHovered ? "#00d2ff" : (Math.sin(time * 2.0 + delay) > 0 ? "#00d2ff" : "#005bb5"));
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.026, 8, 8]} />
      <meshBasicMaterial color="#00d2ff" transparent opacity={0.8} />
    </mesh>
  );
}

// Helper to simulate spinning database platter tracks
function DatabasePlatter({ yOff, idx, isHovered }) {
  const groupRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Disk spin: alternate direction based on index position
      const dir = idx % 2 === 0 ? 1 : -1;
      const speed = isHovered ? 1.8 : 0.7;
      groupRef.current.rotation.y = time * speed * dir;
    }
  });
  return (
    <group ref={groupRef} position={[0, yOff, 0]}>
      {/* Outer steel cylinder */}
      <mesh>
        <cylinderGeometry args={[0.42, 0.42, 0.15, 24]} />
        <meshStandardMaterial 
          color={isHovered ? "#001e3d" : "#020208"} 
          roughness={0.15} 
          metalness={0.9} 
        />
      </mesh>
      {/* Glowing wireframe ring wrapper */}
      <mesh>
        <cylinderGeometry args={[0.43, 0.43, 0.16, 24]} />
        <meshBasicMaterial 
          color={isHovered ? "#00d2ff" : "#0070f3"} 
          wireframe={true} 
          transparent 
          opacity={isHovered ? 0.95 : 0.35} 
        />
      </mesh>
      
      {/* Platter Read/Write Head Indicator Led */}
      <mesh position={[0.32, 0, 0.25]}>
        <sphereGeometry args={[0.024, 6, 6]} />
        <meshBasicMaterial color="#00d2ff" />
      </mesh>
    </group>
  );
}

// Individual components with hover/click interactions
function CodeEditorNode({ position, isHovered, onHover, onClick }) {
  const meshRef = useRef();
  const scaleRef = useRef(1.0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.08;
      // Lerp scale smoothly on hover
      const targetScale = isHovered ? 1.15 : 1.0;
      scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, 0.1);
      meshRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(false); }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {/* Editor Case */}
      <mesh>
        <boxGeometry args={[1.0, 0.8, 0.2]} />
        <meshStandardMaterial 
          color={isHovered ? "#001e3d" : "#020208"} 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>
      
      {/* Glowing frame */}
      <mesh>
        <boxGeometry args={[1.02, 0.82, 0.22]} />
        <meshBasicMaterial 
          color={isHovered ? "#00d2ff" : "#0070f3"} 
          wireframe={true} 
          transparent 
          opacity={isHovered ? 0.9 : 0.4} 
        />
      </mesh>

      {/* Simulated lines of code */}
      <CodeLine position={[-0.2, 0.24, 0.11]} length={0.42} delay={0} />
      <CodeLine position={[-0.1, 0.09, 0.11]} length={0.55} delay={1.8} />
      <CodeLine position={[-0.25, -0.06, 0.11]} length={0.32} delay={3.6} />
      <CodeLine position={[-0.05, -0.21, 0.11]} length={0.62} delay={5.4} />

      {/* Label */}
      <Html position={[0, -0.65, 0]} distanceFactor={4.5} center>
        <span className="px-2 py-0.5 rounded bg-black/90 border border-accent-cyan/20 text-[8px] font-mono text-slate-300 select-none uppercase tracking-wide">
          IDE Console
        </span>
      </Html>
    </group>
  );
}

function ApiGatewayNode({ position, isHovered, onHover, onClick }) {
  const meshRef = useRef();
  const coreRef = useRef();
  const scaleRef = useRef(1.0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 0.6) * 0.08;
      const targetScale = isHovered ? 1.15 : 1.0;
      scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, 0.1);
      meshRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    }
    if (coreRef.current) {
      // Rotation for inner core gateway
      coreRef.current.rotation.y = time * 2.2;
      coreRef.current.rotation.x = time * 1.3;
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(false); }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <mesh>
        <octahedronGeometry args={[0.42]} />
        <meshStandardMaterial 
          color={isHovered ? "#001e3d" : "#020208"} 
          roughness={0.1}
          metalness={0.9} 
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.44]} />
        <meshBasicMaterial 
          color={isHovered ? "#00d2ff" : "#0070f3"} 
          wireframe={true} 
          transparent 
          opacity={isHovered ? 0.95 : 0.4} 
        />
      </mesh>

      {/* API inner core code */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.15]} />
        <meshBasicMaterial color={isHovered ? "#ffffff" : "#00d2ff"} transparent opacity={0.9} />
      </mesh>

      <Html position={[0, -0.65, 0]} distanceFactor={4.5} center>
        <span className="px-2 py-0.5 rounded bg-black/90 border border-accent-cyan/20 text-[8px] font-mono text-slate-300 select-none uppercase tracking-wide">
          API Router
        </span>
      </Html>
    </group>
  );
}

function ServerNode({ position, isHovered, onHover, onClick }) {
  const meshRef = useRef();
  const scaleRef = useRef(1.0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 0.72) * 0.08;
      const targetScale = isHovered ? 1.15 : 1.0;
      scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, 0.1);
      meshRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    }
  });

  const rows = [-0.35, -0.1, 0.15, 0.4];

  return (
    <group 
      ref={meshRef} 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(false); }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {/* Server Rack Body */}
      <mesh>
        <boxGeometry args={[0.8, 1.1, 0.8]} />
        <meshStandardMaterial 
          color={isHovered ? "#001e3d" : "#020208"} 
          roughness={0.1} 
          metalness={0.9} 
        />
      </mesh>
      <mesh>
        <boxGeometry args={[0.82, 1.12, 0.82]} />
        <meshBasicMaterial 
          color={isHovered ? "#00d2ff" : "#0070f3"} 
          wireframe={true} 
          transparent 
          opacity={isHovered ? 0.9 : 0.3} 
        />
      </mesh>

      {/* LEDs */}
      {rows.map((yOff, idx) => (
        <group key={idx}>
          <ServerLed position={[-0.2, yOff, 0.41]} delay={idx * 1.2} isHovered={isHovered} />
          <ServerLed position={[0.2, yOff, 0.41]} delay={idx * 2.1 + 0.6} isHovered={isHovered} />
        </group>
      ))}

      <Html position={[0, -0.75, 0]} distanceFactor={4.5} center>
        <span className="px-2 py-0.5 rounded bg-black/90 border border-accent-cyan/20 text-[8px] font-mono text-slate-300 select-none uppercase tracking-wide">
          Server Blade
        </span>
      </Html>
    </group>
  );
}

function DatabaseNode({ position, isHovered, onHover, onClick }) {
  const meshRef = useRef();
  const scaleRef = useRef(1.0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(time * 0.64) * 0.08;
      const targetScale = isHovered ? 1.15 : 1.0;
      scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, 0.1);
      meshRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(false); }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {[0.25, 0.0, -0.25].map((yOff, idx) => (
        <DatabasePlatter key={idx} yOff={yOff} idx={idx} isHovered={isHovered} />
      ))}

      <Html position={[0, -0.65, 0]} distanceFactor={4.5} center>
        <span className="px-2 py-0.5 rounded bg-black/90 border border-accent-cyan/20 text-[8px] font-mono text-slate-300 select-none uppercase tracking-wide">
          Database
        </span>
      </Html>
    </group>
  );
}

// Connection Line component that continuously pulses in opacity
function ConnectionLine({ start, end, isHighlighted, index }) {
  const materialRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (materialRef.current) {
      // Glow and pulse opacity sequentially
      materialRef.current.opacity = isHighlighted 
        ? 0.8 + Math.sin(time * 12.0) * 0.15 
        : 0.18 + Math.sin(time * 3.5 + index) * 0.09;
    }
  });

  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  const lineGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={lineGeo}>
      <lineBasicMaterial 
        ref={materialRef}
        color={isHighlighted ? "#00d2ff" : "#0070f3"} 
        transparent 
      />
    </line>
  );
}

// Logic connector system with data packets
function ArchitectureSystem({ mouse, activeTooltip, setActiveTooltip }) {
  const mainRef = useRef();
  const pointsRef = useRef();
  const { width: viewportWidth } = useThree((state) => state.viewport);
  
  // Track hover states for specific nodes to light up connection paths
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = {
    ide: [-1.5, 0.8, 0],
    api: [-1.5, -0.8, 0],
    server: [1.5, 0.8, 0],
    db: [1.5, -0.8, 0]
  };

  const connectionPaths = useMemo(() => {
    return [
      { start: nodes.ide, end: nodes.server, id: 'ide-server' },
      { start: nodes.api, end: nodes.server, id: 'api-server' },
      { start: nodes.server, end: nodes.db, id: 'server-db' },
      { start: nodes.api, end: nodes.db, id: 'api-db' }
    ];
  }, []);

  // Compute dynamically scaled group dimensions depending on the viewport size
  const responsiveScale = useMemo(() => {
    const requiredWidth = 4.8;
    return Math.min(1.0, viewportWidth / requiredWidth);
  }, [viewportWidth]);

  // Set up flowing particles
  const [particlePositions, particleSpecs] = useMemo(() => {
    const count = 75; // Increased density for richer visual weight
    const positions = new Float32Array(count * 3);
    const specs = [];

    for (let i = 0; i < count; i++) {
      const pathIdx = Math.floor(Math.random() * connectionPaths.length);
      const path = connectionPaths[pathIdx];
      specs.push({
        path,
        speed: 0.006 + Math.random() * 0.007,
        progress: Math.random(),
        // Small organic stream offsets
        jitterX: (Math.random() - 0.5) * 0.08,
        jitterY: (Math.random() - 0.5) * 0.08,
        jitterZ: (Math.random() - 0.5) * 0.08,
      });

      const p = specs[i].progress;
      positions[i * 3] = path.start[0] + (path.end[0] - path.start[0]) * p + specs[i].jitterX;
      positions[i * 3 + 1] = path.start[1] + (path.end[1] - path.start[1]) * p + specs[i].jitterY;
      positions[i * 3 + 2] = path.start[2] + (path.end[2] - path.start[2]) * p + specs[i].jitterZ;
    }
    return [positions, specs];
  }, [connectionPaths]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Mouse parallax floating tilt with slower futuristic auto-sway
    if (mainRef.current) {
      const tx = mouse.current.x * 0.45;
      const ty = mouse.current.y * 0.35;
      
      const swayY = Math.sin(time * 0.3) * 0.15;
      const swayX = Math.cos(time * 0.2) * 0.08;

      mainRef.current.rotation.y = THREE.MathUtils.lerp(mainRef.current.rotation.y, tx + swayY, 0.05);
      mainRef.current.rotation.x = THREE.MathUtils.lerp(mainRef.current.rotation.x, -ty + swayX, 0.05);
      
      // Floating up/down motion (noticeable but professional: 10px-20px range in equivalent px)
      mainRef.current.position.y = Math.sin(time * 0.5) * 0.18;
    }

    // Animate flow particles
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      const posArr = posAttr.array;

      for (let i = 0; i < particleSpecs.length; i++) {
        const spec = particleSpecs[i];
        spec.progress += spec.speed;
        if (spec.progress >= 1.0) {
          spec.progress = 0;
        }

        const { start, end } = spec.path;
        posArr[i * 3] = start[0] + (end[0] - start[0]) * spec.progress + spec.jitterX;
        posArr[i * 3 + 1] = start[1] + (end[1] - start[1]) * spec.progress + spec.jitterY;
        posArr[i * 3 + 2] = start[2] + (end[2] - start[2]) * spec.progress + spec.jitterZ;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={mainRef} scale={[responsiveScale, responsiveScale, responsiveScale]}>
      
      {/* 3D Nodes */}
      <CodeEditorNode 
        position={nodes.ide} 
        isHovered={hoveredNode === 'ide'} 
        onHover={(h) => setHoveredNode(h ? 'ide' : null)}
        onClick={() => setActiveTooltip(activeTooltip === 'ide' ? null : 'ide')}
      />
      <ApiGatewayNode 
        position={nodes.api} 
        isHovered={hoveredNode === 'api'} 
        onHover={(h) => setHoveredNode(h ? 'api' : null)}
        onClick={() => setActiveTooltip(activeTooltip === 'api' ? null : 'api')}
      />
      <ServerNode 
        position={nodes.server} 
        isHovered={hoveredNode === 'server'} 
        onHover={(h) => setHoveredNode(h ? 'server' : null)}
        onClick={() => setActiveTooltip(activeTooltip === 'server' ? null : 'server')}
      />
      <DatabaseNode 
        position={nodes.db} 
        isHovered={hoveredNode === 'db'} 
        onHover={(h) => setHoveredNode(h ? 'db' : null)}
        onClick={() => setActiveTooltip(activeTooltip === 'db' ? null : 'db')}
      />

      {/* Path lines linking nodes */}
      {connectionPaths.map((line, idx) => {
        const pathType = line.id.split('-');
        const isPathHighlighted = hoveredNode === pathType[0] || hoveredNode === pathType[1];

        return (
          <ConnectionLine 
            key={idx}
            start={line.start}
            end={line.end}
            isHighlighted={isPathHighlighted}
            index={idx}
          />
        );
      })}

      {/* Data flow particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#00d2ff"
          transparent={true}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Dynamic Tooltip Popup Display using Html */}
      <AnimatePresence>
        {activeTooltip && (
          <Html 
            position={
              activeTooltip === 'ide' ? [-1.5, 1.4, 0] :
              activeTooltip === 'api' ? [-1.5, -0.2, 0] :
              activeTooltip === 'server' ? [1.5, 1.4, 0] :
              [1.5, -0.2, 0]
            } 
            distanceFactor={5} 
            center
          >
            <div className="p-3 rounded-lg border border-accent-cyan/40 bg-slate-950/95 shadow-2xl backdrop-blur-md min-w-[150px] text-left text-[10px] space-y-1.5 select-none relative z-50">
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <span className="font-bold text-white uppercase font-mono tracking-wider">
                  {activeTooltip === 'ide' ? 'Java & Python IDE' :
                   activeTooltip === 'api' ? 'REST API Gateway' :
                   activeTooltip === 'server' ? 'Server Engine' :
                   'MySQL Database'}
                </span>
                <button 
                  onClick={() => setActiveTooltip(null)} 
                  className="text-slate-500 hover:text-accent-cyan cursor-pointer font-bold text-xs"
                >
                  &times;
                </button>
              </div>
              <p className="text-slate-400 font-medium leading-relaxed">
                {activeTooltip === 'ide' ? 'Java Development Kit (JDK), Python modules, and local code compilers.' :
                 activeTooltip === 'api' ? 'Endpoint routers, REST protocols, FastAPI setups, and request handlers.' :
                 activeTooltip === 'server' ? 'Spring Boot services, JDBC communication interfaces, and middleware logic.' :
                 'Structured MySQL query optimization, schema models, and transactional data integrity.'}
              </p>
            </div>
          </Html>
        )}
      </AnimatePresence>

    </group>
  );
}

export default function BackendThreeScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      mouse.current.x = (event.clientX / innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-full relative z-10 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 4.0], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[8, 8, 8]} intensity={1.5} color="#00d2ff" />
        <pointLight position={[-8, -8, -8]} intensity={0.8} color="#3b82f6" />
        
        <ArchitectureSystem 
          mouse={mouse} 
          activeTooltip={activeTooltip} 
          setActiveTooltip={setActiveTooltip}
        />
      </Canvas>
    </div>
  );
}
