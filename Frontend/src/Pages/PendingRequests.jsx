import { Link } from "react-router-dom"
import { FaDeleteLeft } from "react-icons/fa6";
// import { AiFillDelete } from "react-icons/ai";
import ManagerHeader from "../Components/ManagerHeader"
import ManagerSidebar from "../Components/ManagerSidebar"
import { useEffect, useState } from "react";
import axios from "axios";
function PendingRequests (){

    const [allPendingRequests, setAllPendingRequests] = useState([])
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


    const getAllPendingRequests = () => {
        axios.get("http://localhost:7000/requests/read").then((res) => {
            setAllPendingRequests(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllPendingRequests()
    },[])

    return <div className="w-full h-screen bg-lightBlue">
        <ManagerHeader />
        <ManagerSidebar />
        <h1 className=" text-center text-3xl font-semibold text-[#3b3832] pt-[8%]"> Pending Requests </h1>
        <Link to="/managerDashboard"><FaDeleteLeft className="text-[40px] text-[#3b3832] hover:text-[#6A6458] right-48 mt-[-33px] absolute " /></Link>

        <div className="w-full  ml-[15%] top-58 absolute  mt-10 max-w-4xl  bg-white rounded-lg shadow-md ">

        <table className=" table-auto  font-Nunito w-full text-left text-[#3b3832]">
                <thead>
                    <tr className="bg-[#D9D9D9E0] border-b  text-[20px] font-semibold text-black">
                        <td className="p-4 text-center"> No.</td>
                        <td className="p-4 text-center"> Worker ID </td>
                        <td className="p-4 text-center"> Name </td>
                        <td className="p-4 text-center"> Status </td>
                        <td className="p-4 text-center"> Destination </td>
                        <td className="p-4 text-center"> Action </td>
                        <td className="p-4 text-center"> Action </td>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {
                        allPendingRequests.map((requestInfo, index) => {
                           return <tr className="border-b text-center">
                        <td className="p-4 text-center"> {index + 1}</td>
                        <td className="p-4 text-center"> {requestInfo.ID} </td>
                        <td className="p-4 text-center"> {requestInfo.name} </td>
                        <td className="p-4 text-center"> <span className="text-white bg-[#6A6458]  rounded-[5px] px-3 py-1"> {requestInfo.status} </span> </td>
                        <td className="p-4 text-center"> {requestInfo.destination}  </td> {/* make the world range 5 word +*/}
                        <Link to="/workerViewMore"><td className="p-4 text-[#3498DB]"> <span className="text-[#6A6458] underline hover:text-black font-semibold rounded-full px-2 py-1">View more</span> </td></Link>
                        <td> 
                            <button  className="mx-2 bg-red-500 p-1 rounded">Rejected</button>
                            <button className="mx-2 p-1 bg-green-500 rounded">Approved</button>
                        </td>
                    </tr>
                        })
                    }
                </tbody>
                
                       </table>
</div>
    </div>
}
export default PendingRequests