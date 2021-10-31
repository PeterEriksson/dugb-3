import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center mt-7">
      <div className="absolute  mx-auto z-30 w-20 h-20">
        <LazyLoadImage className="" src="/spinner2.svg" alt="" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
