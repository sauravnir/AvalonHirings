import React from 'react'

function HeadinInfo(props) {
  return (
    <div class={props.bgcolor}>
        <div class='flex flex-col w-sceen p-3 items-center justify-center space-y-6'>
            <h1 class={`${props.tcolor} text-5xl font-bold mt-5`}>{props.headingText}</h1>
            <p class={`text-center ${props.tcolor} font-medium mx-auto mt-4 max-w-xl text-lg`}>
                {props.bodyPara}
      </p>
        </div>
    </div>
  )
}

export default HeadinInfo