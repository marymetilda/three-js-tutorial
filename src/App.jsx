import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Suspense } from "react";
import Three from "./components/Three";

function App() {
  return (
    <Canvas id="three-canvas-container" shadows>
      <Suspense fallback={null}>
        <Three />
      </Suspense>
    </Canvas>
  );
}

export default App;
