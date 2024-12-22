import { Link } from "react-router-dom";
import axios from "axios";
import { ImSpinner3 } from "react-icons/im";
import { FaCheckDouble } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import WorkerOverView from "../Components/WorkerOverView";
import WorkerSideBar from "../Components/WorkerSideBar";

function WorkerDashboard (){
    const [requests, setRequests] = useState([]);
    const [approvedCount, setApprovedCount] = useState(0); // State for approved requests count
    const [pendingCount, setPendingCount] = useState(0);   // State for pending requests count
    const [rejectedCount, setRejectedCount] = useState(0); // State for rejected requests count
    const id = localStorage.getItem("worker");

    const HandleGetResult = () => {
        axios.get(`http://localhost:7000/request/SingleRead/${JSON.parse(id).id}`)
            .then((response) => {
                setRequests(response.data);
                // Filter approved, pending, and rejected requests and count them
                const approvedRequests = response.data.filter(request => request.status === "Approved");
                const pendingRequests = response.data.filter(request => request.status === "pending"); 
                const rejectedRequests = response.data.filter(request => request.status === "Rejected");

                setApprovedCount(approvedRequests.length); // Set count for approved requests
                setPendingCount(pendingRequests.length);   // Set count for pending requests
                setRejectedCount(rejectedRequests.length); // Set count for rejected requests
            })

            .catch((error) => {
                console.log(error);
                alert("Error in getting requests");
            });
    };

    useEffect(() => {
        HandleGetResult();
    }, []);

    return (
        <div className="w-full h-screen">
            <WorkerSideBar />

            <div>
                <div className="pt-10 ml-4 mt-12 sm:mt-0 sm:ml-[18%]">
                    <h1 className="text-[25px] font-semibold">Request Status Insights</h1>
                    <div className="pt-4 sm:flex grid-cols-[160px_160px] gap-5 grid sm:gap-24 mt-12 sm:mt-0">
                        <Link to="/workerPendingRequests">
                            <WorkerOverView icon={ImSpinner3} IconColor="text-black" Users="Pending Requests" Count={pendingCount} />
                        </Link>
                        <Link to="/workerAcceptedRequests">
                            <WorkerOverView icon={FaCheckDouble} IconColor="text-black" Users="Accepted Requests" Count={approvedCount} /> 
                        </Link>
                        <Link to="/workerRejectedRequests">
                            <WorkerOverView icon={FaUserSlash} IconColor="text-black" Users="Rejected Requests" Count={rejectedCount} />
                        </Link>
                    </div>
                </div>

                <div className="w-[360px] sm:w-full sm:ml-[18%] px-[10px] top-5 absolute sm:mt-[15%] mt-[100%] max-4-6xl sm:max-w-4xl max-auto overflow-x-auto sm:overflow-hidden">
                    <h1 className="text-[23px] font-semibold">Previous Requests</h1>
                    {requests.length > 0 ? (
                        <div className="mt-4">
                            <div>
                                <table className="shadow-md rounded-lg w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#008081] text-white font-semibold">
                                            <td className="p-4 text-center rounded-tl-lg">No.</td>
                                            <td className="p-4 text-center">Start Date</td>
                                            <td className="p-4 text-center">End Date</td>
                                            <td className="p-4 text-center">Status</td>
                                            <td className="p-4 text-center">Destination</td>
                                            <td className="p-4 text-center rounded-tr-lg">Action</td>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {requests.map((RequestMessage, index) => (
                                            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-300 hover:bg-gray-100`}>
                                                <td className="p-4 text-center">{index + 1}</td>
                                                <td className="p-4 text-center">{new Date(RequestMessage.startDate).toLocaleDateString('en-SO')}</td>
                                                <td className="p-4 text-center">{new Date(RequestMessage.endDate).toLocaleDateString('en-SO')}</td>
                                                <td className="p-4 text-center">
                                                    <span className={`font-semibold ${
                                                        RequestMessage.status === "pending" ? "text-yellow-500"
                                                        : RequestMessage.status === "Approved" ? "text-[#008081]"
                                                        : RequestMessage.status === "Rejected" ? "text-red-500"
                                                        : "text-gray-500" // Default for unknown statuses
                                                    }`}>{RequestMessage.status}</span>
                                                </td>
                                                <td className="p-4 text-center">{RequestMessage.destination}</td>
                                                <td className="p-4 text-center">
                                                    <Link to={RequestMessage.status === "Approved" || RequestMessage.status === "Rejected" 
                                                    ? `/workerMessageView/${RequestMessage._id}`
                                                    : `/workerViewBox/${RequestMessage._id}`}>
                                                        <button className="px-4 py-2 bg-[#008081] text-white rounded-md hover:bg-[#1b5a5a]">
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
                    ) : (
                        <div>
                            <h1 className="text-[20px] font-semibold pt-60 text-center text-red-500">NO Requests were found</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WorkerDashboard;
