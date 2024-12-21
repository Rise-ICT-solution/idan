import { FaUserPlus } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { HiUsers } from "react-icons/hi";
import { LiaUserTieSolid } from "react-icons/lia";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import { LiaUserPlusSolid } from "react-icons/lia";
import { TbUserPlus } from "react-icons/tb";





function ManagerSidebar (){
    return <div className="bg-[#0E0E0E] fixed   sm:h-screen  sm:block flex mb-[400px]  justify-between px-[15px] sm:px-0 items-center  top-0  sm:pt-4  w-full sm:w-[16%]  ">
        <h1 className=" text-[25px] text-white sm:pb-5 sm:w-full font-semibold text-center font-Roboto"> iDan </h1>
        <div className="sm:block flex items-center sm:mt-10 px-[10px]">
          
            <Link to="/managerDashboard">
                <div className="flex gap-2 items-center hover:bg-[#008081] h-[40px] rounded-[10px] ">
                    <LuLayoutDashboard className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">Dashboard</h1>
                </div>
            </Link>
            <Link to="/totalAdmins">
                <div className="flex gap-2 items-center mt-5 hover:bg-[#008081] h-[40px] rounded-[10px] ">
                    <LiaUserTieSolid className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">All admins</h1>
                </div>
            </Link>
            <Link to="/totalWorkers">
                <div className="flex gap-2 items-center  mt-5 hover:bg-[#008081] h-[40px] rounded-[10px] ">
                    <TbUsersGroup className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">All workers</h1>
                </div>
            </Link>
            <Link to="/addAdmin">
                <div className="flex gap-2 items-center mt-5 hover:bg-[#008081] h-[40px] rounded-[10px] ">
                    <LiaUserPlusSolid className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">Add Admin</h1>
                </div>
            </Link>
            <Link to="/addWorker">
                <div className="flex gap-2 items-center mt-5 hover:bg-[#008081] h-[40px] rounded-[10px] ">
                    <TbUserPlus className="text-[28px] ml-5  text-white" />
                    <h1 className="text-white text-[18px]">Add Worker</h1>
                </div>
            </Link>
        
           
        </div>
    </div>
}
export default ManagerSidebar