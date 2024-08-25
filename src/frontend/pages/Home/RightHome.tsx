import { Suspense, useEffect, useState } from "react";
import { Canvas, events } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../../components/CanvasLoader/CanvasLoader";
import { modelsPathConstants } from "../../constants/PathConstants";
import { screenSizeConstants } from "../../constants/SizeConstants";
import { colorConstants } from "../../constants/ColorsConstants";
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";

type DiviceType = {
  isMobile: boolean;
};

const screenSize = window.innerHeight;

const WindowScrollHandler = () => {
  window.scrollTo(0, screenSize + 80);
};

const Computers = ({ isMobile }: DiviceType) => {
  const computer = useGLTF(modelsPathConstants.homePage3dModelPathConstant1);

  const [cursorLocationX, setCursorLocationX] = useState(2.5);
  const [cursorLocationY, setCursorLocationY] = useState(2.5);


  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorLocationX(event.clientX - (event.target as HTMLElement).offsetLeft);
      setCursorLocationY(event.clientY - (event.target as HTMLElement).offsetTop);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <mesh>
      <hemisphereLight intensity={isMobile ? 0.4 : 0.8} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.7}
        penumbra={2}
        intensity={0}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 3 : 2}
        position={isMobile ? [0, -2.7, 0] : [0, -1, 0]}
        rotation={[0, 2.5, 0]}
      />
    </mesh>
  );
};

const RightHome = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = () => {
      // setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div
      className={`${screenSizeConstants.subScreenSize} min-h-screen flex-col z-40 order-1 lg:order-2`}
    >
      <Canvas
        style={isMobile ? { height: "100vh" } : { height: "100vh" }}
        frameloop="always"
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Computers isMobile={isMobile} />
        </Suspense>

        <Preload all />
      </Canvas>
      {/* Button */}
      <div
        onClick={WindowScrollHandler}
        className={`${colorConstants.activeBackgroundColor} animate-bounce w-16 h-16 rounded-full absolute lg:hidden top-[43rem]`}
      >
        <ArrowDownCircleIcon className="text-white" />
      </div>
    </div>
  );
};

export default RightHome;
