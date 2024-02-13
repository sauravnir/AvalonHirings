import React from "react";

function HeadinInfo(props) {
  return (
    <div className={props.bgcolor}>
      <div className="flex flex-col p-3 items-center justify-center space-y-6">
        <h1
          className={`text-center ${props.tcolor} text-3xl sm:text-5xl font-bold mt-5`}
        >
          {props.headingText}
        </h1>
        <p
          className={`text-center ${props.tcolor} font-medium mt-4 max-w-xl text-base sm:text-lg`}
        >
          {props.bodyPara}
        </p>
      </div>
    </div>
  );
}

export default HeadinInfo;
