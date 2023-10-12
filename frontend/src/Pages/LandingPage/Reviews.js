import React from "react";
import Slider from "../../objects/Slider";

function Reviews() {
  
  return (
    <div id="reviews">
      <div class="flex h-3/6 w-full mt-14 my-14 justify-center ">
        {Slider.map((info) => (
            <div class="flex  w-3/6 h-[250px] p-5 m-2 px-auto space-x-2 bg-gray-900 shadow-xl shadow-gray-500 rounded-xl">
            <div class="flex items-end">
              <img alt="profile" class="h-auto w-[150px]" src='../images/review.png'></img>
            </div>
  
            <div class="flex flex-col text-justify px-2  w-10/12 min-w-8/12 text-base sm:text-sm text-white">
              <p>
                {info.desc}
              </p>
              <div class="flex flex-col w-fit">
                <span class="text-white font-medium mt-3 sm:text-xl">
                  {info.name}
                </span>
              </div>
              </div>
          </div>
        )) }
      </div>

    </div>
  );
}

export default Reviews;
