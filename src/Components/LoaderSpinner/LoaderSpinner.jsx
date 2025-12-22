
import React from "react";
import { Ripples } from "ldrs/react";
import "ldrs/react/Ripples.css";

const LoaderSpinner = ({
  size = 50,
  speed = 1.5,
  color = "purple",
}) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Ripples size={size} speed={speed} color={color} />
    </div>
  );
};

export default LoaderSpinner;
