import { Link } from "react-router-dom";
import { FaDeleteLeft } from "react-icons/fa6";
import ManagerHeader from "../Components/ManagerHeader";
import ManagerSidebar from "../Components/ManagerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function RejectedRequests() {
  const [RejectedRequests, setRejectedRequests] = useState([]);
  const [Requests, setRequests] = useState([]);

  const getAllRejectedRequests = () => {
    axios
      .get("http://localhost:7000/requests/read")
      .then((res) => {
        const AllRequests = res.data
        setRequests(AllRequests);
        setRejectedRequests(AllRequests.filter((req) => req.status === "Rejected"));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllRejectedRequests();
  }, []);

  return (
    <div className="w-full flex h-screen bg-[#dadada]">
      {/* Fixed Header and Sidebar */}
      <div className="fixed w-full z-10">
        <ManagerHeader />
      </div>
      <div className="fixed top-[60px] z-10">
        <ManagerSidebar />
      </div>

      {/* Scrollable Content Below Header and Sidebar */}
      <div className="sm:ml-[250px] px-[10px] sm:px-0 sm:pt-[80px] pt-[100px] w-full h-screen overflow-y-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between px-[20px] w-full">
          <h1 className="text-center text-2xl sm:text-3xl ml-12 sm:ml-64 font-semibold ">
            Rejected Requests 
          </h1>
          <Link to="/managerDashboard">
            <FaDeleteLeft className="sm:text-[35px] sm:ml-[-130px] text-2xl text-[#3b3832] hover:text-[#008081]" />
          </Link>
        </div>

        {/* Scrollable Table Section */}
        <div className="w-full  mt-3 max-w-4xl mb-10 bg-white rounded-lg shadow-md">
          {/* Set the height and apply scrolling */}
          <div className="max-h-[600px] overflow-y-auto">
            <table className="table-auto shadow-md w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#008081] text-white font-semibold">
                  <td className="sm:p-4 p-3 text-center rounded-tl-lg">No.</td>
                  <td className="sm:p-4 p-3 text-center">ID</td>
                  <td className="sm:p-4 p-3 text-center">Name</td>
                  <td className="sm:p-4 p-3 text-center">Status</td>
                  <td className="sm:p-4 p-3 text-center">Destination</td>
                  <td className="sm:p-4 p-3 text-center rounded-tr-lg">Action</td>
                </tr>
              </thead>
              <tbody className="bg-white">
                {RejectedRequests.map((pendingRequest, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-b border-gray-300 hover:bg-gray-100`}
                  >
                    <td className="sm:p-4 p-3 text-center">{index + 1}</td>
                    <td className="sm:p-4 p-3 text-center">{pendingRequest.ID}</td>
                    <td className="sm:p-4 p-3 text-center">{pendingRequest.fullName}</td>
                    <td className="sm:p-4 p-3 text-center">
                      <span
                        className={`font-semibold ${
                          pendingRequest.status === "pending"
                            ? "text-yellow-500"
                            : pendingRequest.status === "approved"
                            ? "text-[#008081]"
                            : pendingRequest.status === "Rejected"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {pendingRequest.status}
                      </span>
                    </td>
                    <td className="sm:p-4 p-3 text-center">{pendingRequest.destination}</td>
                    <td className="sm:p-4 p-3 text-center">
                      <Link to={`/managerMessageView/${pendingRequest._id}`}>
                        <button className="sm:px-4 w-[110px] py-2 bg-[#008081] text-white rounded-md hover:bg-[#1b5a5a]">
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
    </div>
  );
}

export default RejectedRequests;
