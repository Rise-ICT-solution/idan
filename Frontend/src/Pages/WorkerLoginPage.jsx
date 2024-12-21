import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
function LoginPage (){
    const [ID, setID] = useState("")
    const [Password, setPassword] = useState("")

    const navigate = useNavigate()

    const HandleWorker = (e) => {
        e.preventDefault()
        axios.post("http://localhost:7000/worker/login", {
            "id" : ID,
            "password" : Password
        }).then((response) => {
            console.log(response.data)
            if (response.data.error){
                alert("Incorrect ID or Password")
            }
            else if (response.data.empty){
                alert("ID and Password are required")
            }
            else {
                alert("Login Successfully!! Wlecome to your account")
                localStorage.setItem("worker", JSON.stringify(response.data.worker))
                navigate("/workerDashboard")
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return <div className="w-full fixed h-screen bg-[#BEDDDF]">
    {/* <div className="w-full h-[80px] bg-[#0E0E0E]">
        <h1 className="text-center text-3xl text-white font-semibold pt-5"> iDan</h1>
    </div> */}
 <div className="w-full  h-screen flex my-40 sm:my-[110px]  justify-center ">
    <div className="bg-white pt-[15px] shadow-lg px-4 w-[350px] h-[350px] rounded-[5px]">
        <h1 className="  text-[30px] font-semibold text-[#0E0E0E]  "> Sign in </h1>
        <p className="  text-gray-600 text-[14px] pr-[20px]"> Log in with your <span className="font-semibold text-black">Employee ID and password </span> to proceed.</p>
        <form className="mt-4">
            <label className=" text-[15px]"> Worker ID </label>
            <input value={ID} onChange={(event) => setID(event.target.value)} className="w-[310px] px-1 h-[40px] outline-none  mb-2 rounded-[5px] border-2 border-[#008081] " type="text" />
            <label className=" text-[15px]"> Worker Password </label>
            <input value={Password} onChange={(event) => setPassword(event.target.value)} className="w-[310px] px-1  h-[40px] outline-none rounded-[5px] border-2 border-[#008081] " type="password" />
            <button onClick={HandleWorker} className="w-[310px] h-[35px] mt-7 text-white  hover:bg-[#0E0E0E] hover:text-white  bg-[#008081] rounded-[5px]"> Submit </button>
        </form>
    </div>
</div>
</div>
}
export default LoginPage