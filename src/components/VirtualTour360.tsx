import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { supabase } from '@/integrations/supabase/client';

interface Scene {
  id: number;
  name: string;
  imageUrl: string;
  hotspots: Hotspot[];
}

interface Hotspot {
  type: string;
  x: number;
  y: number;
  z: number;
  label?: string;
}

interface VirtualTour360Props {
  listingId: string;
}

const VirtualTour360 = ({ listingId }: VirtualTour360Props) => {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [currentScene, setCurrentScene] = useState(0);
  const [isVRMode, setIsVRMode] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number>();
  
  useEffect(() => {
    if (scenes.length > 0 && containerRef.current) {
      initializeViewer();
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, [currentScene, scenes]);
  
  const initializeViewer = () => {
    if (!containerRef.current) return;
    
    // Clear previous content
    if (rendererRef.current) {
      containerRef.current.removeChild(rendererRef.current.domElement);
      rendererRef.current.dispose();
    }
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.1);
    cameraRef.current = camera;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = -0.5;
    controlsRef.current = controls;
    
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(scenes[currentScene]?.imageUrl || '', (texture) => {
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      geometry.scale(-1, 1, 1);
      
      const material = new THREE.MeshBasicMaterial({
        map: texture
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      
      addHotspots(scene, scenes[currentScene]?.hotspots || []);
    });
    
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };
  
  const addHotspots = (scene: THREE.Scene, hotspots: Hotspot[]) => {
    hotspots.forEach(hotspot => {
      const spriteMaterial = new THREE.SpriteMaterial({
        map: createHotspotTexture(hotspot.type),
        depthTest: false
      });
      
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.set(hotspot.x, hotspot.y, hotspot.z);
      sprite.scale.set(10, 10, 1);
      
      scene.add(sprite);
    });
  };
  
  const createHotspotTexture = (type: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = type === 'info' ? '#3b82f6' : '#10b981';
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(type === 'info' ? 'i' : '→', 32, 32);
    }
    
    return new THREE.CanvasTexture(canvas);
  };
  
  const handleImageUpload = async (file: File, sceneName: string) => {
    setLoading(true);
    
    const { data, error } = await supabase.storage
      .from('360-images')
      .upload(`${listingId}/${sceneName}-${Date.now()}.jpg`, file);
    
    if (!error && data) {
      const { data: urlData } = supabase.storage
        .from('360-images')
        .getPublicUrl(data.path);
      
      setScenes(prev => [...prev, {
        id: Date.now(),
        name: sceneName,
        imageUrl: urlData.publicUrl,
        hotspots: []
      }]);
    }
    
    setLoading(false);
  };
  
  const SceneSelector = () => (
    <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur rounded-xl p-4 z-10">
      <div className="flex gap-2 overflow-x-auto">
        {scenes.map((scene, index) => (
          <button
            key={scene.id}
            onClick={() => setCurrentScene(index)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
              currentScene === index
                ? 'bg-white text-black'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {scene.name}
          </button>
        ))}
        
        <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 whitespace-nowrap">
          + Ajouter
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const sceneName = prompt('Nom de la vue:');
                if (sceneName) handleImageUpload(file, sceneName);
              }
            }}
          />
        </label>
      </div>
    </div>
  );
  
  const VRButton = () => (
    <button
      onClick={() => setIsVRMode(!isVRMode)}
      className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-10 flex items-center gap-2"
    >
      <span>🥽</span>
      {isVRMode ? 'Quitter VR' : 'Mode VR'}
    </button>
  );
  
  return (
    <div className="relative w-full h-[600px] bg-black rounded-xl overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      
      {scenes.length > 0 ? (
        <>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-4 max-w-sm z-10">
            <h3 className="font-bold mb-2">🏠 {scenes[currentScene]?.name}</h3>
            <p className="text-sm text-muted-foreground">
              Utilisez la souris pour naviguer. Cliquez sur les points d'intérêt.
            </p>
          </div>
          <VRButton />
          <SceneSelector />
          
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Chargement de la vue 360°...</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🎥</div>
            <h3 className="text-xl font-bold mb-2">Créez une visite virtuelle</h3>
            <p className="text-sm opacity-80 mb-6">
              Ajoutez des photos 360° pour permettre une visite immersive
            </p>
            
            <label className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 inline-block">
              📸 Ajouter une première vue
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, 'Vue principale');
                }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTour360;
