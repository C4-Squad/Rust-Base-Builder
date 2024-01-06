import { RootState } from "../../Store";
import { useSelector, useDispatch } from "react-redux";

import { Bloom, EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize, Resolution, BlendFunction } from "postprocessing";

export default function Postprocessing() {
  const page_mode = useSelector((state: RootState) => state.pageMode.page_mode);

  const bloom_state = useSelector((state: RootState) => state.pageSettings.bloom_state); //prettier-ignore
  const ssao_state = useSelector((state: RootState) => state.pageSettings.ssao_state); //prettier-ignore

  return (
    <EffectComposer>
      <Bloom
        intensity={bloom_state ? 0.8 : 0}
        luminanceThreshold={0.6}
        luminanceSmoothing={1}
        mipmapBlur={true}
        radius={0.4}
      />
      <SSAO
        blendFunction={BlendFunction.MULTIPLY}
        samples={50}
        rings={8}
        intensity={ssao_state && page_mode === "overview" ? 22 : 0}
        worldDistanceThreshold={10}
        worldDistanceFalloff={25}
        worldProximityFalloff={25}
        worldProximityThreshold={1}
        luminanceInfluence={1}
        radius={0.2}
        resolutionScale={0.5}
        bias={0.275}
      />
    </EffectComposer>
  );
}
