
import React from "react";
import { Hourglass } from "ldrs/react";
import "ldrs/react/Hourglass.css";

const LoaderSpinner = ({
  size = 40,
  speed = 1.75,
  bgOpacity=0.1,
  color = "red",
}) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Hourglass size={size} speed={speed} color={color} bgOpacity={bgOpacity} />
    </div>
  );
};

export default LoaderSpinner;
