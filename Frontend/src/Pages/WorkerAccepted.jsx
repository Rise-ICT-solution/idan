import { Link } from "react-router-dom"
import { FaDeleteLeft } from "react-icons/fa6";
// import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import WorkerSideBar from "../Components/WorkerSideBar";
function WorkerAcceptedRequests (){

    const [AcceptedRequests, setAcceptedRequests] = useState([])
    const [statusUpdate, setStatusUpdate] = useState("")

    // Function oo update gareenaayo xaalada qofka
    // const updateUserStatus = (id) => {
    //     axios.put(`http://localhost:7000/update/status/${id}`, {
    //         "status": "Approved"
    //     }).then((res) => {
    //         if(res.data.massage){
    //             alert("Status has been updated")
    //         }
    //     }).catch((err) => console.log(err))
    // }

    const id = localStorage.getItem("worker")
    const getAllApprovedRequests = () => {
        axios.get(`http://localhost:7000/request/SingleRead/${JSON.parse(id).id}`).then((res) => {
            const workerApproved = res.data;
            const filteredRequest = workerApproved.filter((req) => req.status === "Approved")
            setAcceptedRequests(filteredRequest)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllApprovedRequests()
    },[])

    return <div className="w-full h-screen flex fixed bg-[#DADADA]">
        <WorkerSideBar />
        <div className="ml-20">
            <div className="flex items-center justify-between w-[900px] ml-44 mt-10">
                <h1 className=" text-center text-3xl ml-64 font-semibold "> Worker Accepted Requests </h1>
                <Link to="/managerDashboard"><FaDeleteLeft className="text-[40px] text-[#3b3832] hover:text-[#008081]  " /></Link>
            </div>

            <div className="w-full  ml-[15%] top-58 absolute  mt-10 max-w-4xl overflow-y-auto bg-[#F2F2F2] rounded-lg shadow-md ">

            <table className=" shadow-md  w-full text-left border-collabse">
                    <thead>
                        <tr className=" bg-[#008081] text-white">
                            <td className="p-4 text-center rounded-tl-lg"> No.</td>
                            <td className="p-4  text-center"> Worker ID </td>
                            <td className="p-4  text-center"> Name </td>
                            <td className="p-4  text-center"> Status </td>
                            <td className="p-4  text-center"> Destination </td>
                            <td className="p-4  text-center"> Action </td>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            AcceptedRequests.map((requestInfo, index) => {
                            return <tr key={index}  className={`${ index % 2=== 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-300 hover:bg-gray-100`}>
                            <td className="p-4 text-center"> {index + 1}</td>
                            <td className="p-4 text-center"> {requestInfo.ID} </td>
                            <td className="p-4 text-center"> {requestInfo.fullName} </td>
                            <td className="p-4 text-center "> <span className="text-[#0E0E0E]"> {requestInfo.status} </span> </td>
                            <td className="p-4 text-center "> {requestInfo.destination}  </td> {/* make the world range 5 word +*/}
                            <td className="p-4 text-center"> 
                                <Link to={ requestInfo.status === "Approved" || requestInfo.status === "Rejected" 
                                ? `/workerMessageView/${requestInfo._id}` 
                                : `/workerViewBox/${requestInfo._id}`
                                }> 
                                    <button className="px-4 py-2 bg-[#008081] text-white rounded-md hover:bg-[#1b5a5a]">
                                        View More
                                    </button>
                                </Link>  
                            </td>                        </tr>
                            })
                        }
                    </tbody>
                    
                        </table>
    </div>
        </div>
    </div>
}
export default WorkerAcceptedRequests