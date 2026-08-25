declare module "react-water-wave" {
  import { ComponentType, ReactNode } from "react";

  // The package ships no types. This covers the props we actually pass.
  interface WaterWaveProps {
    imageUrl?: string;
    dropRadius?: string | number;
    perturbance?: string | number;
    resolution?: string | number;
    interactive?: boolean;
    children?: (methods: {
      pause: () => void;
      play: () => void;
      drop: (x: number, y: number, radius: number, strength: number) => void;
      destroy: () => void;
    }) => ReactNode;
  }

  const WaterWave: ComponentType<WaterWaveProps>;
  export default WaterWave;
}
