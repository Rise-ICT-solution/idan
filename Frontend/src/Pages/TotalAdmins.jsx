import ManagerHeader from "../Components/ManagerHeader"
import ManagerSidebar from "../Components/ManagerSidebar"
import { Link } from "react-router-dom"
import { FaDeleteLeft } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";


function TotalAdmins (){
    const [Admins, setAdmins] = useState([])

    const HandleGetAdmins = () => {
        axios.get("http://localhost:7000/Admin/read").then((response) => {
            setAdmins(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }


    useEffect (() => {
        HandleGetAdmins()
    },[])
    return <div className="bg-[#dadada] w-full h-screen">
        <ManagerHeader />
        <ManagerSidebar />
        <h1 className=" ml-[48%] text-3xl font-semibold text-[#0e0e0e] pt-[6%]"> All Admins </h1>
        <div className="w-[950px]  ml-[20%] top-58 absolute  mt-10   bg-white rounded-lg shadow-md ">

            <table className=" table-auto font-Nunito  w-full text-left border-collabse">
                <thead>
                    <tr className="bg-[#008080] text-white font-semibold ">
                        <td className="p-3 border-[#008080] border text-center"> No.</td>
                        <td className="p-3 border-[#008080] border text-center"> Admin ID </td>
                        <td className="p-3 border-[#008080] border text-center"> Name </td>
                        <td className="p-3 border-[#008080] border text-center"> Email </td>
                        <td className="p-3 border-[#008080] border text-center"> Action </td>
                    </tr>
                </thead>
                <tbody className="bg-[#d2d2d2]">
                   {
                    Admins.map((adminData, index) => {
                        return  <tr className="border-b text-center">
                        <td className="p-3 border border-[#0e0e0e] text-center"> {index +1 } </td>
                        <td className="p-3 border border-[#0e0e0e] text-center"> {adminData.id} </td>
                        <td className="p-3 border border-[#0e0e0e] text-center"> {adminData.name} </td>
                        <td className="p-3 border border-[#0e0e0e] text-center"> {adminData.email}  </td> {/* make the world range 5 word +*/}
                        <td className="p-3 border border-[#0e0e0e] text-center  "> <Link to={`/adminDetail/${adminData._id}`} > <button className="px-2 py-1 rounded-md bg-[#008080]  text-white hover:bg-[#0e0e0e]   ">View More </button> </Link>  </td> 
                    </tr>
                    })
                   }
                </tbody>
                
            </table>
            </div>
     </div>
}
export default TotalAdmins