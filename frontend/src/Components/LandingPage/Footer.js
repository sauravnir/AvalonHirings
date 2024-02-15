import React from "react";
import logo from "../../images/A.png";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <footer class="bg-dark dark:bg-gray-900">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
            <a href="#" class="flex items-center">
              <img src={logo} class="h-8 mr-3" alt="FlowBite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Avalon Hirings
              </span>
            </a>
          </div>
          <div class="grid   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-12">
            <div class="mb-6 sm:mb-0">
              <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Page Links
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-2">
                  <HashLink to="#hero" class="hover:underline">
                    Home
                  </HashLink>
                </li>
                <li class="mb-2">
                  <HashLink to="#about" class="hover:underline">
                    About
                  </HashLink>
                </li>
                <li class="mb-2">
                  <HashLink to="#contact" class="hover:underline">
                    Contact
                  </HashLink>
                </li>
                <li>
                  <HashLink to="#reviews" class="hover:underline">
                    Reviews
                  </HashLink>
                </li>
              </ul>
            </div>

            <div>
              <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-2">
                  <a
                    href="https://github.com/sauravnir"
                    class="hover:underline"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/saurav-niraula-411b93215/"
                    class="hover:underline"
                  >
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
            {/* Integrating Maps */}
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16796.98382062905!2d85.3415292138548!3d27.744109174918034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb192127d644c1%3A0xde0e145559103704!2sAvalon%20Logistics%20-%20Golfutar%20Branch!5e0!3m2!1sen!2snp!4v1707985365598!5m2!1sen!2snp"
                width="300"
                height="250"
                style={{border:0}}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="text-center text-sm text-gray-500 dark:text-gray-400">
          © 2023{" "}
          <a href="#" class="hover:underline">
            Avalon
          </a>
          . All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
