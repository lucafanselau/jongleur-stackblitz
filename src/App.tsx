import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Scroll, orchestrate, helpers, useRegister } from 'jongleur';
import { Vector3 } from 'three';

const clips = orchestrate(
  {
    box: {
      scale: new Vector3(0, 0, 0),
      rotation: new Vector3(0, 0, 0),
    },
  },
  {
    box: {
      1: {
        scale: helpers.state(new Vector3(1, 1, 1)),
        rotation: helpers.state(new Vector3(0, (2 / 3) * Math.PI, 0)),
      },
    },
  },
  {
    damping: true,
    interpolation: 'linear',
  }
);

function App() {
  const [count, setCount] = useState(0);

  const register = useRegister(clips);
  return (
    <Canvas>
      <Scroll.Controls clips={clips} damping={2}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <mesh ref={register('box')}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'hotpink'} />
        </mesh>
        <Scroll.Html fixed>
          <Scroll.At at={0} align={'center'} placement={['start', 'center']}>
            <h3 style={{ marginTop: 24 }}>This will stay here</h3>
          </Scroll.At>
        </Scroll.Html>
        <Scroll.Html>
          <Scroll.At at={0.8} align={'center'}>
            <h1 style={{ textAlign: 'center', width: '80vw' }}>
              This will scroll with the progress
            </h1>
          </Scroll.At>
        </Scroll.Html>
      </Scroll.Controls>
    </Canvas>
  );
}

export default App;
