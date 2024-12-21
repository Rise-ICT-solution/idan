import { Link } from "react-router-dom"
import { FaDeleteLeft } from "react-icons/fa6";
// import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import WorkerSideBar from "../Components/WorkerSideBar";
function WorkerPendingRequests (){

    const [allPendingRequests, setAllPendingRequests] = useState([])

    const id = localStorage.getItem("worker")

    const getAllPendingRequests = () => {
            axios.get(`http://localhost:7000/request/SingleRead/${JSON.parse(id).id}`).then((res) => {
                const WorkerPending = res.data;
                const filteredRequest = WorkerPending.filter((req) => req.status === "pending")
                setAllPendingRequests(filteredRequest)
            }).catch((err) => {
                console.log(err)
            })
        }
    
        useEffect(() => {
            getAllPendingRequests()
        },[])

    return <div className="w-full flex h-screen fixed bg-[#DADADA]">
        <WorkerSideBar />
        <div className="ml-20">
            <div className="flex items-center justify-between w-[900px] ml-44 mt-10">
                <h1 className=" text-center text-3xl ml-64 font-semibold "> Worker Pending Requests </h1>
                <Link to="/workerDashboard"><FaDeleteLeft className="text-[40px] text-[#3b3832] hover:text-[#008081]  " /></Link>
            </div>
            <div className="w-full  ml-[15%] top-58 absolute  mt-10 max-w-4xl  bg-white rounded-lg shadow-md ">

                <table className="  w-full text-left border-collabse">
                        <thead>
                            <tr className="bg-[#008081]   text-white">
                                <td className="p-4 text-center rounded-tl-lg"> No.</td>
                                <td className="p-4  text-center"> Worker ID </td>
                                <td className="p-4  text-center"> Name </td>
                                <td className="p-4  text-center"> Status </td>
                                <td className="p-4  text-center"> Destination </td>
                                <td className="p-4  text-center rounded-tr-lg"> Action </td>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {
                                allPendingRequests.map((requestInfo, index) => {
                                return <tr key={index}  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b border-gray-300 hover:bg-gray-100`}>
                                <td className="p-4 text-center "> {index + 1}</td>
                                <td className="p-4 text-center"> {requestInfo.ID} </td>
                                <td className="p-4 text-center"> {requestInfo.fullName} </td>
                                <td className="p-4 text-center"> <span className="text-[#0E0E0E]   rounded-[5px] px-3 py-1"> {requestInfo.status} </span> </td>
                                <td className="p-4 text-center"> {requestInfo.destination}  </td> {/* make the world range 5 word +*/}
                                <td className="p-4 text-center"> <span className="text-[#0E0E0E] underline hover:text-[#008081] font-semibold rounded-full px-2 py-1"><Link to={`/workerViewMore/${requestInfo.id}`}>View more </Link></span> </td>
                            </tr>
                                })
                            }
                        </tbody>
                        
                    </table>
    </div>
        </div>
    </div>
}
export default WorkerPendingRequests