import React from "react";
import { Link } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";


function ContractReviewDashboard() {
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
          <h1 class="text-3xl text-white font-base">Contract/Review</h1>
        </div>

        <div class="grid p-3 mt-2 bg-white rounded shadow-xl">
          <div class="grid p-3 grid-cols-2">
            <div>
              <form class="space-x-5" onSubmit={ContractSearch}>
                <input
                  class="shadow rounded border border-gray-200 w-60 py-2 px-3 text-gray-700 text-sm mb-3 leading-tight invalid:border-red-500  focus:shadow-outline"
                  type="text"
                  placeholder="Search For Contracts"
                  name="SearchBarForContracts"
                />
                <button
                  class="bg-sky-500  py-2 px-2 rounded border hover:bg-sky-600 hover:shadow-lg hover:text-slate-100 text-sm"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="justify-self-end">
              <div>
                <form class="space-x-5 " onSubmit={ContractSearch}>
                    <select class="rounded border border-gray-200 text-sm text-gray-500 px-2 py-2" type="text" >
                    <option class="">Choose From The List Below</option>
                    <option>Test</option>
                    <option>Test</option>
                  </select>
                  <button
                    class="bg-sky-500  py-2 px-2 rounded border hover:bg-sky-600 hover:shadow-lg hover:text-slate-100 text-sm"
                    type="submit"
                  >
                    Filter Search
                  </button>

                  
                </form>
              </div>
            </div>
          </div>
            {/* Horiziontal Line */}
           <div class="w-full h-0.5 bg-gray-500 border">
            </div>

            <div class="grid grid-row pt-3"> 
                <table class="table-fixed w-full text-sm text-center ">
                    <thead class="uppercase text-gray-900">
                        <tr>
                            <th>S.N</th>
                            <th>Contract ID</th>
                            <th>User Name</th>
                            <th>User Type</th>
                            <th>Created Date</th>
                            <th>Contract Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr class="">
                            <td>1</td>
                            <td>A123</td>
                            <td>Saurav Niraula</td>
                            <td>Employee</td>
                            <td>2080-01-20</td>
                            <td>Active</td>
                            <td>
                                <Link to="/contractaction   ">
                                <button class=" bg-gray-200  py-2 px-2 w-auto rounded border hover:bg-green-400 hover:shadow-lg hover:text-slate-100">
                                   <img class="w-6 h-6 align-center" src={require(`../../images/icons/eyebutton.png`)} alt="Button"/>
                                </button>
                                </Link>
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>

        </div>
        <DashboardFooter />
      </div>
    </div>
  );
}

export default ContractReviewDashboard;
