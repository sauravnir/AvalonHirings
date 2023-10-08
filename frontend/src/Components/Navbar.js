import React from 'react';
import TitleLogo from '../images/A.png'
import { Link } from 'react-router-dom';

export default function Navbar(){
    return( 
            <nav class="bg-white border-gray-200 dark:bg-white-500 shadow-xl sticky top-0 z-10">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-end mt-1 mx-auto p-2 text-gray-900 font-medium">
                    <a  href="https://maps.app.goo.gl/R5DdmntpcHbsEFs26">Golfutar, Kathmandu</a>
                    <a href="#"><h1 class="ml-4">+977 9815977947</h1></a>
                </div>
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                <a href="#" class="flex items-center">
                    <img src={TitleLogo} class="h-8 mr-3" alt="Avalon Hirings" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-dark">Avalon Hirings</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:white:bg-gray-900 dark:border-white-700 place-items-center">
                    <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-dark bg-blue-700 rounded md:bg-transparent md:text-dark-700 md:p-0 dark:text-dark md:dark:text-dark-500 md:dark:hover:text-blue-500" aria-current="page">HOME</a>
                    </li>
                    <li>
                    <Link to='../Pages/LoginPage' class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">ABOUT</Link>
                    </li>
                    <li>
                    <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-dark-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">CONTACT</a>
                    </li>
                    <li>
                    <Link to='../Pages/LoginPage' class="mt-2 block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-dark-700 md:p-0 dark:text-dark md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                        <button class="text-white bg-sky-900 hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-blue-800 place-items-center">LOGIN</button></Link>
                    </li>    
                </ul>
                </div>
            </div>
            </nav>
    )    
}