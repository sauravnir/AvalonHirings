import React from 'react'
import AboutImg1 from "../../images/AboutImg1.jpg"
import Story from "../../images/Story.jpg"
function About() {
  return (
    <div >
        <div class="bg-sky-900" id="about">
        <div class="grid grid-cols-2 mb-20 px-auto overflow-hidden p-2">
            <div class="relative p-20 ">
                <img src={AboutImg1} alt="Image1" class="rounded-lg shadow-xl shadow-grey-900"></img>
                <div class="flex flex-col auto-rows-min items-start justify-start mt-10">
                    <h1 class="text-white text-2xl font-medium">Our Mission</h1>
                    <p class=" text-start text-white text-justify font-light mt-5 max-w-xl text-m ">
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum '</p>
                </div>
            </div>

            <div class="relative p-20">
                <img src={Story} alt="Image1" class="rounded-lg shadow-xl shadow-grey-900"></img>
                <div class="flex flex-col auto-rows-min items-start justify-start mt-10">
                    <h1 class="text-white text-2xl font-medium">Our Story</h1>
                    <p class=" text-start text-white text-justify font-light mt-5 max-w-xl text-m ">
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum '</p>
                </div>
            </div>
            
        </div>  

    </div>

    </div>
  )  
}

export default About