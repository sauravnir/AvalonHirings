import React from "react";
import AboutImg1 from "../../images/AboutImg1.jpg";
import Story from "../../images/Story.jpg";
function About() {
  return (
    <div>
      <div class="bg-sky-900" id="about">
        <div class="grid grid-cols-2 mb-20 px-auto overflow-hidden p-2">
          <div class="relative p-20 ">
            <img
              src={AboutImg1}
              alt="Image1"
              class="rounded-lg shadow-xl shadow-grey-900"
            ></img>
            <div class="flex flex-col auto-rows-min items-start mt-10">
              <h1 class="text-white text-2xl font-medium">Our Mission</h1>
              <p class=" text-white text-justify  font-light mt-5 max-w-xl text-m ">
                In our mission to revolutionize the housemaid hiring experience,
                we are committed to providing a seamless and trustworthy
                platform connecting households with reliable and skilled
                domestic helpers. Our goal is to simplify the process of finding
                and hiring housemaids, ensuring that families can welcome
                qualified and trustworthy individuals into their homes with
                confidence.We prioritize transparency, security, and
                professionalism, aiming to bridge the gap between employers and
                domestic helpers through a user-friendly interface. With a focus
                on customer satisfaction, we strive to empower families by
                offering a diverse pool of vetted and qualified housemaids, each
                selected through a rigorous screening process. Our mission is to
                create a supportive and efficient ecosystem that not only meets
                the unique needs of households but also elevates the standards
                of domestic service, fostering lasting and positive
                relationships between employers and housemaids.{" "}
              </p>{" "}
            </div>
          </div>

          <div class="relative p-20">
            <img
              src={Story}
              alt="Image1"
              class="rounded-lg shadow-xl shadow-grey-900"
            ></img>
            <div class="flex flex-col auto-rows-min items-start justify-start mt-10">
              <h1 class="text-white text-2xl font-medium">Our Story</h1>
              <p class=" text-white text-justify font-light mt-5 max-w-xl text-m ">
                Our journey began with a simple yet profound realization: the
                process of hiring a housemaid can be a daunting and uncertain
                experience for many families. Fueled by a passion for
                transforming this often-overlooked aspect of domestic life, we
                embarked on a mission to create a platform that redefines the
                way people find and connect with reliable housemaids. Our story
                is one of dedication to transparency, security, and the overall
                well-being of households. We started by envisioning a
                user-friendly interface that simplifies the hiring process,
                making it accessible to all. Through meticulous screening and
                vetting processes, we assembled a community of skilled and
                trustworthy housemaids, each bringing their unique talents and
                dedication to our platform. Our commitment to customer
                satisfaction has driven us to continuously improve and innovate,
                ensuring that families can welcome domestic helpers into their
                homes with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
