import ManagerHeader from "../Components/ManagerHeader"
import ManagerSidebar from "../Components/ManagerSidebar"
import OverView from "../Components/Overview"
import { ImSpinner3 } from "react-icons/im";
import { FaCheckDouble } from "react-icons/fa";
import { FaUserSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



function ManagerDashboard (){

    //Search ID
    const [searchUser, setSearchUser] = useState("")



    const params = useParams()
    const [PendingRequests, setPendingRequests] = useState([])
    const [Requests, setRequests] = useState([])
    const [approvedCount, setApprovedCount] = useState(0); // State for approved requests count
    const [pendingCount, setPendingCount] = useState(0);   // State for pending requests count
    const [rejectedCount, setRejectedCount] = useState(0); // State for rejected requests count
    const getAllPendingRequests = () => {
        axios.get("http://localhost:7000/requests/read").then((res) => {
            const AllRequests = res.data;
            setRequests(AllRequests);
    
            // Filter and count requests based on their status
            const approvedRequests = AllRequests.filter(request => request.status.toLowerCase() === "approved");
            const pendingRequests = AllRequests.filter(request => request.status.toLowerCase() === "pending");
            const rejectedRequests = AllRequests.filter(request => request.status.toLowerCase() === "rejected");
    
            // Set counts for different statuses
            setApprovedCount(approvedRequests.length);
            setPendingCount(pendingRequests.length);
            setRejectedCount(rejectedRequests.length);
    
            // Set pending requests to display in the table
            setPendingRequests(pendingRequests);
        }).catch((err) => {
            console.log(err);
        });
    }


        //search id function oo loo isticmaalay props ahaan ManagerHeader
        const handleSearch = (event)=>{
            setSearchUser(event.target.value)
        } 

    
    
    

    useEffect(() => {
        getAllPendingRequests()
    },[])
    return <div className="w-full flex  h-screen">
        <div className=" fixed">
            <ManagerHeader search={handleSearch} />
            <ManagerSidebar />
        </div>
        <div className="pt-8    mt-24 w-[950px] h-screen rounded-xl pb-10 px-[10px]   sm:ml-[18%]">
            <h1 className="text-[20px]  font-semibold "> Dashboard Overview </h1>
            <div className="pt-4 sm:flex grid-cols-[160px_160px] gap-y-4 gap-x-5  sm:ml-12 grid sm:gap-16 sm:mt-0 ">
                <Link to="/pendingRequests"><OverView icon={ImSpinner3}  Users="Pending Requests" Count={pendingCount} /></Link>
                <Link to="/acceptedRequests"><OverView icon={FaCheckDouble}  Users="Accepted Requests" Count={approvedCount} /></Link>
                <Link to="/rejectedRequests"><OverView icon={FaUserSlash}  Users="Rejected Requests" Count={rejectedCount} /></Link>
            </div>
            <div className=" w-[360px] sm:w-full sm:ml-[3%]  top-5 absolute sm:mt-[22%] mt-[95%] ">
                <h1 className="font-semibold text-[20px]"> Waiting Requests</h1>
                {PendingRequests.length > 0 ? (
                    <div className="w-[360px] sm:w-full  px-[1px] top-5 absolute mt-[3%] sm:mtsm:-[1 p-3%] max-4-6xl sm:max-w-4xl max-auto overflow-x-auto sm:overflow-hidden">
                        <table className=" shadow-md rounded-lg mt-2 w-[850px] text-left border-collabse">
                            <thead>
                                <tr className="bg-[#008081] text-white font-semibold">
                                    <td className="sm:p-4 p-3 text-center rounded-tl-lg"> No.</td>
                                    <td className="sm:p-4 p-3 text-center"> Worker ID </td>
                                    <td className="sm:p-4 p-3 text-center"> Name </td>
                                    <td className="sm:p-4 p-3 text-center"> Status </td>
                                    <td className="sm:p-4 p-3 text-center"> Destination </td>
                                    <td className="sm:p-4 p-3 text-center rounded-tr-lg"> Action </td>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {
                                    PendingRequests.filter((user)=>{
                                        return searchUser.toLowerCase() === "" ? user : 
                                        user.ID.toLowerCase().includes(searchUser.toLowerCase())
                                    }).map((pending, index) => {
                                        return <tr key={index}  className={`${ index %2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-300 hover:bg-gray-100`}>                        
                                        <td className="sm:p-4 p-3  text-center">{index + 1} </td>
                                        <td className="sm:p-4 p-3 text-center"> {pending.ID} </td>
                                        <td className="sm:p-4 p-3 text-center"> {pending.fullName} </td>
                                        <td className="sm:p-4 p-3 text-center"> <span className="text-[#0e0e0e]   ">{pending.status}</span> </td>
                                        <td className="sm:p-4 p-3 text-center"> {pending.destination}  </td> {/* make the world range 5 word +*/}
                                        <td className="sm:p-4 p-3 text-center"> <span className="text-[#0e0e0e] underline  font-semibold hover:text-[#008080] "><Link to={`/managerMessageView/${pending._id}`}>View more</Link></span> </td>
                                    </tr>

                                    })
                                }
                            </tbody>
                        </table>
                </div>
            ) : (
                <div>
                    <h1 className="text-[20px] font-semibold pt-60 text-center text-red-500">NO Requests were found</h1>
                </div>
            )}
            
            </div>
        </div>
        </div>
    // </div>
}
export default ManagerDashboard
// text-[#6A6458] underline hover:text-black font-semibold rounded-full px-2 py-1