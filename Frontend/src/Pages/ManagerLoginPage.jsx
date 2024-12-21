import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ManagerLoginPage (){
    const [ID, setID] = useState("")
    const [Password, setPassword] = useState("")
    
    const navigate = useNavigate()
    const HandleAdmin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:7000/admin/login",{
            "id": ID,
            "password": Password
        }).then((response) => {
            if (response.data.error){
                alert("Incorrect ID or Password: ")
            }
            else if (response.data.empty){
                alert("ID and Password are required")
            }
            else (
                alert ("Login successfully!! Welcome to your Account"),
                localStorage.setItem("admin", JSON.stringify(response.data.admin)), // 2 da Admin kan wuxuu ka imade router ka gaar haan /admin/login waliba if admin
                navigate("/managerDashboard")
            )
        }).catch((error) => {
            console.log(error)
            alert("Error in Login", error)
        })

    }

    return <div className="w-full h-screen bg-[#BEDDDF] fixed">
        {/* <div className="w-full h-[80px] bg-[#6A6458]">
            <h1 className="text-center text-3xl text-white font-semibold pt-5"> iDan</h1>
        </div> */}
     <div className="w-full h-screen flex  my-40 sm:my-20  justify-center ">
     <div className="bg-white pt-[15px] shadow-lg px-4 w-[350px] h-[350px] rounded-[5px]">
        <h1 className="  text-[30px] text-center font-semibold text-[#0E0E0E]  "> Sign in </h1>
        <p className="  text-gray-600 text-center px-[40px] text-[14px] pr-[20px]"> Log in with your <span className="font-semibold text-black">Admin ID and password </span> to access the management dashboard.</p>
        <form className="mt-4">
            <label className=" text-[15px]"> Admin ID </label>
            <input value={ID} onChange={(event) => setID(event.target.value)} className="w-[310px] px-1 h-[40px] outline-none  mb-2 rounded-[5px] border-2 border-[#008081] " type="text" />
            <label className=" text-[15px]"> Admin Password </label>
            <input value={Password} onChange={(event) => setPassword(event.target.value)} className="w-[310px] px-1  h-[40px] outline-none rounded-[5px] border-2 border-[#008081] " type="password" />
            <button onClick={HandleAdmin} className="w-[310px] h-[35px] mt-7 text-white  hover:bg-[#0E0E0E] hover:text-white  bg-[#008081] rounded-[5px]"> Submit </button>
        </form>
    </div>
    </div>
    </div>
}
export default ManagerLoginPage