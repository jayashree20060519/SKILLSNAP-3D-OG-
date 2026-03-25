import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Extend Three.js elements to React Three Fiber
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      ambientLight: any;
      pointLight: any;
    }
  }
}

export {};
