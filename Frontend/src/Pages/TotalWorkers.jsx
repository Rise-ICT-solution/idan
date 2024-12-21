import ManagerHeader from "../Components/ManagerHeader";
import ManagerSidebar from "../Components/ManagerSidebar";
import { Link } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";
import { useState, useEffect } from "react";

function TotalWorkers() {
  const [Workers, setWorkers] = useState([]);

  const HandleGetWorkers = () => {
    axios
      .get("http://localhost:7000/worker/read")
      .then((response) => {
        setWorkers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    HandleGetWorkers();
  }, []);

  return (
    <div className="w-full h-screen fixed bg-[#dadada]">
      {/* Fixed Header and Sidebar */}
      <div className="fixed ">
        <ManagerHeader />
        <ManagerSidebar />
      </div>

      {/* Main Content */}
      <div className="pt-[100px]  overflow-y-auto w-full ml-[20%]">
        <h1 className="text-3xl font-semibold text-deepBlue ml-[30%] mb-4">
          All Workers
        </h1>

        {/* Scrollable Table Container */}
        <div className="w-[950px]    bg-white rounded-lg shadow-md h-[500px]">
          <table className=" w-full overflow-y-auto  text-left border-collapse">
            <thead>
              <tr className="bg-[#008080] text-white font-semibold">
                <td className="p-3 border-[#008080] border text-center">No.</td>
                <td className="p-3 border-[#008080] border text-center">Admin ID</td>
                <td className="p-3 border-[#008080] border text-center">Name</td>
                <td className="p-3 border-[#008080] border text-center">Email</td>
                <td className="p-3 border-[#008080] border text-center">Action</td>
              </tr>
            </thead>
            <tbody className="bg-[#d2d2d2]">
              {Workers.map((workerData, index) => (
                <tr key={index} className="border-b border border-gray-300">
                  <td className="p-3 border text-center border-gray-500">
                    {index + 1}
                  </td>
                  <td className="p-3 border text-center border-gray-500">
                    {workerData.id}
                  </td>
                  <td className="p-3 border text-center border-gray-500">
                    {workerData.name}
                  </td>
                  <td className="p-3 border text-center border-gray-500">
                    {workerData.email}
                  </td>
                  <td className="p-3 border text-center border-gray-500">
                    <Link to={`/workerDetail/${workerData._id}`}>
                      <button className="px-2 py-1 rounded-md bg-[#008080] hover:bg-[#0e0e0e] text-white">
                        View More
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TotalWorkers;
