import { Suspense, useEffect, useState } from "react";
// it is an empty canvas so we could place something on it
import { Canvas } from "@react-three/fiber";
// helpers to draw on the canvas, useGLTF allows us to import 3d models
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  // importing the model from public
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (

    //  we start with a mesh not a div when making with 3d models
    // we shuold always create a light inside the mesh or we wont see anything
    <mesh>
      <hemisphereLight intensity={0.7} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      {/* pointlight is the light inside the screen of the computer model */}
      <pointLight intensity={3} />
      {/* we load this primitive inside the canvas to see the computer */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75} // we write the size we need of the model 
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]} // position of x y and z axis
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  // to check if the model is in mobile device
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }} // camera angle through which the computer is being looked with pov
      gl={{ preserveDrawingBuffer: true }}// this property shuoold be thhere to prperly render our model
    >
      {/* suspense is from react to show a loader before the computer is loaded to the screen */}
      <Suspense fallback={<CanvasLoader />}>
        {/* orbitcontrols lets us to move the computer model on demand */}
        <OrbitControls
          // we dont want any zoom in our model
          enableZoom={false}
          // bot the max polar angle and min polar angle lets us to rotate our model only in a specified angle. here its horizontal
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* finally rendering the above created computer component */}
        <Computers isMobile={isMobile} /> 
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
