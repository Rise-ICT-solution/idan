// import { HiUsers } from "react-icons/hi";

function OverView ({icon: Icon, Users, Count}){
    return <div>
            <div className={`sm:w-[230px] flex gap-5 items-center  w-[170px] sm:h-[100px] px-[8px] py-5 sm:py-3 shadow-md bg-white border-l-4 border-l-[#008081]  rounded-r-[5px]`}>
                {/* <div className={`text-[27px] px-[8px] py-[9px] sm:w-[45px] sm:h-[45px] mt-[-125px] ml-[165px] bg-black w  rounded-[15px] `}>
                    <Icon className={` text[20px]  ${IconColor}`} />
                </div> */}
                <div className="  text-[27px] px-[10px] text-center py-[11px] sm:w-[50px] sm:h-[50px]     bg-[#cceaea]  rounded-[10px]">
                    <Icon className={` text[20px] text-[#008181] `} />
                </div>
                <div className="mt-[-8px]">
                    <h1 className="text-[30px] sm:text-[35px]    font-Nunito font-bold"> {Count} </h1>
                    <h3 className=" text-[16px] sm:text-[16px] mt-[-5px] font-semibold font-Nunito "> {Users}</h3>
                </div>
            </div>
    </div>
}
export default OverView
// HiUsers