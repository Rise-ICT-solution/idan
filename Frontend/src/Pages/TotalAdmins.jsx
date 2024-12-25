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
    return <div className="bg-[#dadada] flex w-full  h-screen">
        <div className="fixed">
            <ManagerHeader />
            <ManagerSidebar />
        </div>
        <div className="sm:pt-20 pt-24 sm:pl-[18%] w-full overflow-y-auto px-[10px]">
        <h1 className=" ml-[43%] text-3xl font-semibold text-[#0e0e0e]"> All Admins </h1>
        <div className="w-[950px] sm:ml-10  top-58   mt-10  overflow-y-auto  bg-white rounded-lg shadow-md ">

            <table className=" table-auto font-Nunito   w-full text-left border-collabse">
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
                        <td className="p-2 border border-[#0e0e0e] text-center"> {index +1 } </td>
                        <td className="p-2 border border-[#0e0e0e] text-center"> {adminData.id} </td>
                        <td className="p-2 border border-[#0e0e0e] text-center"> {adminData.name} </td>
                        <td className="p-2 border border-[#0e0e0e] text-center"> {adminData.email}  </td> {/* make the world range 5 word +*/}
                        <td className="p-2 border border-[#0e0e0e] text-center  "> <Link to={`/adminDetail/${adminData._id}`} > <button className="px-2 py-1 rounded-md bg-[#008080]  text-white hover:bg-[#0e0e0e]   ">View More </button> </Link>  </td> 
                    </tr>
                    })
                   }
                </tbody>
                
            </table>
            </div>
     </div>
</div>
}
export default TotalAdmins