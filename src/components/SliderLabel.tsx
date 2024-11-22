import React from "react";
import { useSlider } from "@/stores/store";

export default function SliderLabelComponent() {
  const { seconds } = useSlider();
  return <p> {seconds}</p>;
}
