import React from 'react';
import { Link } from "react-router-dom";
import DashboardFooter from './DashboardFooter';

function ContractReviewAction(){
    const ContractSearch = async (e) => {
        e.preventDefault();
        try {
          console.log("Hello Word!");
        } catch (e) {}
      };
    
    return (
    <div class="w-screen">
      <div class="flex flex-col mt-14 p-5">
        <div class="flex mb-5">
          <h1 class="text-3xl text-white font-base">Contract/Review/Actions</h1>
        </div>

        <div class="grid p-3 mt-2 bg-white rounded shadow-xl">
          
        </div>
        <DashboardFooter />
      </div>
    </div>
    )
}

export default ContractReviewAction;