import React from "react";
import { Slider } from "@/components/ui/slider";
import { useSlider } from "@/stores/store";

export default function SliderComponent() {
  const { seconds, setSeconds } = useSlider();
  return (
    <Slider
      value={[seconds]}
      max={100}
      step={1}
      onValueChange={(newValue) => setSeconds(newValue[0])}
    />
  );
}
