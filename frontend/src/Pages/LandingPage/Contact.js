import React from "react";
import Phone from "../../images/icons/phone.png";
import Email from "../../images/icons/email.png";
import Location from "../../images/icons/location.png";
function Contact() {
  return (
    <div id="contact" className="px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:space-x-5 p-5 md:p-20 relative">
        <div className="border-1 shadow-lg shadow-violet-200 rounded-md md:h-3/6 md:w-2/6 px-auto relative">
          <div className="flex flex-col p-5 items-center mt-14">
            <img src={Phone} alt="" className="h-auto w-14" />
            <h1 className="text-slate-900 text-sm font-bold mt-5 md:text-2xl">
              Phone
            </h1>
            <span className="text-gray-500 text-sm font-medium mt-5 md:text-sm">
              (+977) 9100000000
            </span>
          </div>
        </div>

        <div className="border-1 shadow-lg shadow-violet-200 rounded-md md:h-3/6 md:w-2/6 px-auto relative">
          <div className="flex flex-col p-5 items-center mt-14">
            <img src={Email} alt="" className="h-auto w-14" />
            <h1 className="text-slate-900 text-sm font-bold mt-5 md:text-2xl">
              Email
            </h1>
            <span className="text-gray-500 text-sm font-medium mt-5 md:text-sm">
              info@avalonhirings.com
            </span>
          </div>
        </div>

        <div className="border-1 shadow-lg shadow-violet-200 rounded-md md:h-3/6 md:w-2/6 px-auto relative">
          <div className="flex flex-col p-5 items-center mt-14">
            <img src={Location} alt="" className="h-auto w-14" />
            <h1 className="text-slate-900 text-sm font-bold mt-5 md:text-2xl">
              Address
            </h1>
            <span className="text-gray-500 text-sm font-medium mt-5 md:text-sm">
              Golfutar, Kathmandu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
