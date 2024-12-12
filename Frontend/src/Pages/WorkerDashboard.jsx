import { Link } from "react-router-dom";
import WorkerHeader from "../Components/WorkerHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useEffect, useState } from "react";
function WorkerDashboard (){
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("")
    // const navigate = useNavigate();

    const id = localStorage.getItem("worker")

    const HandleGetResult = () => {
        axios.get(`http://localhost:7000/request/SingleRead/${JSON.parse(id).id}`).then((response) => {
            // if (response.data.requests.length > 0){
                setRequests(response.data)
            // }else {
            //     setMessage("NO Requests was found")

            // }
        }).catch((error) => {
            console.log(error)
            alert("Error in getting requests")
        })
    }
    useEffect(() => {
        HandleGetResult();
    },[])

    return <div className="w-full  h-screen">
        <WorkerHeader />
        <div>
            { requests.length > 0 ? (
            <div className="w-full sm:ml-[14%]  ml-[2%]  top-14 absolute  mt-10 max-4-6xl sm:max-w-4xl max-auto bg-white rounded-lg shadow-lg  sm:overflow-hidden">
                
                <table className=" table-auto font-Nunito  w-full text-left text-deepBlue">
                    <thead>
                        <tr className="bg-[#D9D9D9E0] border-b text-[20px] font-semibold text-black">
                            <td className="p-4"> No.</td>
                            <td className="p-4"> Start Date </td>
                            <td className="p-4"> End Date </td>
                            <td className="p-4"> Status </td>
                            <td className="p-4"> Destination </td>
                            <td className="p-4"> Action </td>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            requests.map((RequestMessage, index) => {
                                return <tr className="border-b">
                                <td className="p-4"> {index + 1} </td>
                                <td className="p-4"> {RequestMessage.startDate} </td>
                                <td className="p-4"> {RequestMessage.endDate} </td>
                                <td className="p-4"> <span className="text-white  bg-[#6A6458] rounded-[5px] px-3 py-1">{RequestMessage.status}</span> </td>
                                <td className="p-4"> {RequestMessage.destination}  </td> {/* make the world range 5 word +*/}
                                <Link to={`/workerViewBox/${RequestMessage._id}`}><td className="p-4 text-[#3498DB]"> <span className=" text-[#6A6458] underline hover:text-black font-semibold rounded-full px-2 py-1">View more</span> </td></Link>
                            </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
                 )
                :(
                <div className=" ">
                    <h1 className="text-[20px] font-semibold pt-60 text-center text-red-500"> NO Requests was found </h1>
                </div>
                )
            } 
        
        </div>
        </div>
}
export default WorkerDashboard