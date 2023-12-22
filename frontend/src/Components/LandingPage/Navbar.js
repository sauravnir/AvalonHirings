import React from "react";
import TitleLogo from "../../images/A.png";
import { Link } from "react-router-dom";
import { HashLink as Hlink } from "react-router-hash-link";

export default function Navbar() {
  return (
    <div class="flex justify-between bg-white items-center  sticky block top-0 h-16 z-50 px-20 ">
      <div class="flex items-center text-lg">
        <img class="w-10 " src={TitleLogo}></img>
        <h1 class="">Avalon Hirings</h1>
      </div>
      <div class="space-x-3 items-center ">
        <Hlink to="#hero" class='hover:text-sky-700'>Home</Hlink>
        <Hlink to="#about" class='hover:text-sky-700'>About</Hlink>
        <Hlink to="#contact" class='hover:text-sky-700'>Contact</Hlink>
        <Hlink to="#reviews" class='hover:text-sky-700'>Reviews</Hlink>
       </div>
       <div class="space-x-3 "> 
        <button class="bg-green-600 w-20 h-10 shadow-lg rounded-sm border border-lg text-white hover:bg-green-900">
          <Link  to="/login" ><h1>LOGIN</h1></Link>
        </button>
        
        <button class="bg-sky-600 w-20 h-10 shadow-lg rounded-sm border border-lg text-white hover:bg-sky-900">
          <Link  to="/register" ><h1>SIGN-UP</h1></Link>
        </button>
      </div>
    </div>
  );
}
