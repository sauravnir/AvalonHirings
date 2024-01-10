import React, { useState, useEffect } from "react";
import DashboardFooter from "../Dashboards/DashboardFooter";
import {
  Collapse,
} from "antd";
import { GiFallingStar, GiUpgrade } from "react-icons/gi";

import Spinner from "../../Pages/ProfileSettings/Spinner";

function ReviewAndRatingsEmployee() {
  const [getEmployeeCaliber, setEmployeeCaliber] = useState(null);
  //   const [getRatings , setGetRatings] = useState([]);
  const [getTotalRatings, setGetTotalRatings] = useState([]);
  const [loading , setLoading] = useState(false);
  // Loading the user rating based on the user profile details
  const data = localStorage.getItem("userData");
  const userType = JSON.parse(data);

  const items = [
    {
      key: "1",
      label: "What are tiers?",
      children: (
        <>
          <div class="flex flex-row p-3">
            <h1 class="flex flex-row font-bold mr-2">
              <img
                class="w-5 h-5 mr-2"
                src={require(`../../images/bronze.png`)}
              ></img>
              Bronze-tier:{" "}
            </h1>
            <p>
              The entry-level tier is automatically assigned as the default upon
              user registration. Strive to enhance your rating through dedicated
              effort and improvement.
            </p>
          </div>
          <div class="flex flex-row p-3">
            <h1 class="flex flex-row font-bold mr-2">
              <img
                class="w-5 h-5 mr-2"
                src={require(`../../images/silver.png`)}
              ></img>
              Silver-tier:{" "}
            </h1>
            <p>
              The intermediate-level tier is attained when upgrading from the
              bronze tier. Progress is gradual, but you are steadily moving
              towards your goal.
            </p>
          </div>
          <div class="flex flex-row p-3">
            <h1 class="flex flex-row font-bold mr-2">
              <img
                class="w-5 h-5 mr-2"
                src={require(`../../images/gold.png`)}
              ></img>
              Gold-tier:{" "}
            </h1>
            <p>
              The highest attainable tier signifies that the user has achieved
              expertise in their current field.
            </p>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Why improve rating?",
      children: (
        <div class="">
          <p>
            Improving tiers is crucial for several reasons, notably the
            potential for an increase in salary. Advancing through tiers
            reflects continuous skill development and enhanced contributions to
            the organization. Each tier progression often corresponds to
            elevated responsibilities, expertise, and overall job performance,
            which, in turn, can lead to salary increments and recognition of
            one's professional growth. As employees move up the tiers, they not
            only gain personal satisfaction but also enjoy tangible benefits
            such as higher compensation, making it a valuable endeavor for
            career development.
          </p>
        </div>
      ),
    },
    {
      key: "3",
      label: "How to improve rating?",
      children: (
        <div class="">
          Improving your rating involves a focus on key aspects such as
          trustworthiness, professionalism, and the quality of your work.
          Upholding a high standard of trustworthiness builds credibility and
          reliability. Demonstrating professionalism in your interactions and
          work ethic contributes positively to your overall rating. Strive for
          excellence in the quality of your work, ensuring accuracy and
          efficiency. Consistent communication, collaboration, and meeting
          deadlines also play vital roles. Embrace a proactive approach, seek
          constructive feedback, and actively engage in continuous learning. By
          consistently embodying these qualities, you enhance your professional
          reputation and contribute to an improved rating.
        </div>
      ),
    },
  ];

  //   Getting the total ratings

  useEffect(() => {
    const allRatings = async () => {
      try{
        setLoading(true);
        const res = await fetch(
          `http://127.0.0.1:8000/getratings/${userType.user_id}`
        );
        const data = await res.json();
        const total = data.reduce((acc, obj) => acc + parseFloat(obj.ratings), 0);
        // setGetRatings(data);
        setGetTotalRatings(total);
      }finally{
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
      }
      
    };
    allRatings();
  }, [userType.user_id]);

  //   Getting the caliber

  useEffect(() => {
    const viewprofile = async () => {
      try{
        setLoading(true);
        const respone = await fetch(
          `http://127.0.0.1:8000/app/viewprofile/${userType.user_id}`
        );
        const data = await respone.json();
        const employee_caliber = data.employee_caliber?.caliber_level;
  
  
        if (employee_caliber && employee_caliber !== null) {
          setEmployeeCaliber(employee_caliber);
        } else {
          setEmployeeCaliber(null);
        }
        setLoading(false);
      }catch(error){
        console.log(error);
      }finally {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
      }
    };

    viewprofile();
  }, []);

  return (
    <div className="w-screen mt-8">
      {loading && <Spinner />}
      <div className="flex flex-col mt-10 p-6">
        <div class="p-3 mt-2 bg-white h-auto rounded items-center shadow">
          {getEmployeeCaliber === "bronze" ? (
            <div className="flex flex-row items-center rounded justify-center h-full p-4 border bg-gradient-to-r from-amber-600 to-yellow-900 space-y-2">
              <img
                className="w-40 h-40 mr-4"
                src={require(`../../images/bronze.png`)}
                alt="Bronze"
              ></img>
              
              <div className="flex flex-col">
                <h1 className="text-white text-base">YOU ARE CURRENTLY</h1>
                <h1 className="text-3xl font-bold text-white">
                  BRONZE <span class="text-lg">- Tier</span>
                </h1>
                <div class="flex flex-row">
                  <h1 class="text-sm text-white mr-2">
                    {getTotalRatings}/50 for upgrade{" "}
                  </h1>
                  
                  <GiUpgrade  color="white" size={20}/>
                </div>
              </div>
            </div>
          ) : getEmployeeCaliber === "silver" ? (
            <div className="flex flex-row items-center justify-center h-full p-4 border bg-gradient-to-r from-slate-300 to-gray-500 space-y-2">
              <img
                className="w-40 h-40 mr-4"
                src={require(`../../images/silver.png`)}
                alt="Silver"
              ></img>
              <div className="flex flex-col items-start">
                <h1 className="text-white text-base">YOU ARE CURRENTLY</h1>
                <h1 className="text-3xl font-bold text-white">
                  SILVER <span class="text-lg">- Tier</span>
                </h1>
                <div class="flex flex-row">
                  <h1 class="text-sm text-white mr-2">
                    {getTotalRatings}/50 for upgrade{" "}
                  </h1>
                  {/* <img
                    class="w-5 h-5 ml-1"
                    src={require(`../../images/upgrade.gif`)}
                  ></img> */}
                  <GiUpgrade  color="white" size={20}/>
                </div>
              </div>
            </div>
          ) : getEmployeeCaliber === "gold" ? (
            <div className="flex flex-row items-center justify-center h-full p-4 border bg-gradient-to-r from-amber-500 to-amber-400 space-y-2">
              <img
                className="w-40 h-40 mr-4"
                src={require(`../../images/gold.png`)}
                alt="Gold"
              ></img>
              <div className="flex flex-col items-start">
                <h1 className="text-white text-base">YOU ARE CURRENTLY</h1>
                <h1 className="text-3xl font-bold text-white">
                  GOLD <span class="text-lg">- Tier</span>
                </h1>
                <h1 class="text-xs text-white">You are at the highest tier!</h1>
              </div>
            </div>
          ) : null}
        </div>
        <div class="flex flex-row w-full rounded bg-white shadow p-4 mt-3">
          <div class="flex flex-row w-full">
            <div class="w-full">
              <h1 class="text-lg font-bold p-2">FAQ's</h1>
              <Collapse accordion items={items} />
            </div>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default ReviewAndRatingsEmployee;
