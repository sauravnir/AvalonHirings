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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
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
