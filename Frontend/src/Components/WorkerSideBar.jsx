import { RiUserLine } from "react-icons/ri";
import { RiUserFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
// import { FiUserPlus } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { RiShutDownLine } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { LuMessageSquarePlus } from "react-icons/lu";




function WorkerSideBar (){
    const navigate = useNavigate();  // useNavigate hook to navigate to other pages
    const [IsUserOpen, setIsUserOpen] = useState(false)
const HandleOpen = () => {
    setIsUserOpen(true)
}
const HandleClose = () => {
    setIsUserOpen(false)
}
    const worker = localStorage.getItem('worker'); // worker is key in local storage
    const LogOut = () => {
        localStorage.clear();
        navigate("/");
    }

    return <div> 
    <div className=" bg-[#0E0E0E] fixed   sm:h-screen  sm:block flex mb-[400px]  justify-between px-[15px] sm:px-0 items-center  top-0  sm:pt-4  w-full sm:w-[16%]       ">
        <h1 className=" text-[25px] text-white sm:pb-5 sm:w-full font-semibold text-center font-Roboto"> iDan </h1>
        <div className=" sm:block flex items-center sm:mt-20 px-[10px]  ">
            <NavLink to="/workerDashboard">
                <div className="flex gap-2 items-center hover:bg-[#008081] h-[40px] rounded-[10px] ">
                    <LuLayoutDashboard className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">Dashboard</h1>
                </div>
            </NavLink>
            <NavLink to="/workerForm">
                <div className="flex gap-2 mt-4 items-center hover:bg-[#008081] h-[40px] rounded-[10px]">
                    <LuMessageSquarePlus className="text-[27px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">Create request</h1>
                </div>
            </NavLink>

            <NavLink to="/workerNotification">
                <div className="flex gap-2 mt-4 items-center hover:bg-[#008081] h-[40px] rounded-[10px]">
                    <IoMdNotificationsOutline className="text-[28px] ml-4  text-white" />
                    <h1 className="text-white text-[18px]">Messages</h1>
                </div>
            </NavLink>
            
            <div className="flex gap-2 mt-4 items-center hover:bg-[#008081] h-[40px] rounded-[10px]">
                <div className="ml-2 flex items-center sm:ml-0" onClick={() => setIsUserOpen(!IsUserOpen)}>
                    {IsUserOpen ? (
                    <RiUserFill className="text-[28px] sm:ml-4 text-white" />
                    ) : (
                    <RiUserLine className="text-[28px] sm:ml-4 text-white" />
                    )}
                </div>
                <h1 className="text-white text-[18px]">Profile</h1>
            </div>
        </div>
    </div>
    <div style={{display: IsUserOpen ? "block" : "none"}} className="w-[200px] z-10 shadow-md  sm:right-4 right-4     fixed sm:top-12 top-20  h-[220px]  bg-white rounded-[10px]">
        <div className="w-full h-[50px]  rounded-t-[10px] bg-[#008081] shadow-b-md shadow-b-gray-200 pt-5 rounded-b-[20px]">
            <div className="w-[50px] ml-[36%]   py-[10px] px-[5px] h-[50px] shadow rounded-full bg-white">
                <FaUser className="w-[30px] h-[30px] ml-1 text-[#008081]" />
            </div>
            <div className="px-[20px] mt-3">
                <h1 className="text-[18px] text-center font-semibold font-Roboto"> {JSON.parse(worker).name} </h1>
                <h1 className="text-[16px]  font-Roboto"> <span className="font-semibold">ID:</span> {JSON.parse(worker).id} </h1>
                <h1 className="text-[16px]  font-Roboto"> <span className="font-semibold">Title:</span> {JSON.parse(worker).title} </h1>
            <button onClick={LogOut} className="w-[100px] flex items-center gap-2 justify-center px-1  h-[35px] mt-3 text-white bg-[#008081] hover:bg-[#0E0E0E] rounded-[5px] ml-7"> Log Out <RiShutDownLine className="w-[20px] h-[20px] " /></button>
            </div>
        </div>
    </div>
</div>
}
export default WorkerSideBar