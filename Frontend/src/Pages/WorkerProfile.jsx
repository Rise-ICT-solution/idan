import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function WorkerProfile() {
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);


  const goBackToParent = () => {
    navigate(-1); // Page markii hore aan imaanay nagu celi
  };

  // Load worker data from localStorage
  useEffect(() => {
    const workerData = JSON.parse(localStorage.getItem("worker"));
    if (!workerData) {
      navigate("/signup"); // Redirect to signup page if worker is not logged in
    } else {
      setWorker(workerData);
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-[#F0F4F8] flex justify-center items-center">
      <div className="bg-white px-6 py-8 w-[360px] h-[420px] rounded-lg flex flex-col items-center shadow-xl transition-transform duration-300 transform hover:scale-105">
        {worker && (
          <>
            {/* Profile picture and background circle */}
            <div className="w-[70px] h-[70px] rounded-full bg-[#008081] flex justify-center items-center mb-4">
              <FaUser className="text-white text-[35px]" />
            </div>
            {/* Worker Info */}
            <h1 className="text-[20px] font-semibold text-[#333] mb-2">{worker.name}</h1>
            <h2 className="text-[16px] text-[#666]">
              <span className="font-semibold">ID:</span> {worker.id}
            </h2>
            <h3 className="text-[16px] text-[#666] mb-4">
              <span className="font-semibold">Title:</span> {worker.title}
            </h3>

            {/* Access Admin Login Link */}
            <Link to="/adminLogin">
              <h1 className="w-[120px] flex items-center justify-center gap-2 px-4 py-2 mt-5 text-white bg-[#008081] hover:bg-[#005f5f] rounded-[5px] transition-colors duration-200">
                Login Out
              </h1>
            </Link>
          </>
        )}
        <Link className="mt-10 cursor-pointer" onClick={goBackToParent}> 
         <p>Go back</p>
        </Link>
      </div>
    </div>
  );
}

export default WorkerProfile;
