import React from "react";
import TitleLogo from "../images/A.png";
import { Link } from "react-router-dom";
import { HashLink as Hlink } from "react-router-hash-link";

export default function Navbar() {
  return (
    <div class="flex justify-between bg-white items-center sticky top-2 h-14 z-5000">
      <div class="flex items-center space-x-2 text-lg">
        <img class="w-10 " src={TitleLogo}></img>
        <h1 class="">Avalon Hirings</h1>
      </div>
      <div class="flex space-x-4 justify-between items-center text-lg">
        <Hlink to="#hero">Home</Hlink>
        <Hlink to="#about">About</Hlink>
        <Hlink to="#contact">Contact</Hlink>
        <button class="bg-sky-900 w-20 h-10 rounded-sm text-white hover:bg-sky-700">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
}
