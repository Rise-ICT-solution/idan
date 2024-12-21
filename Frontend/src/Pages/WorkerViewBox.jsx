import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6"; // Assuming the same icon
import {jsPDF} from "jspdf"
import WorkerSideBar from "../Components/WorkerSideBar";

function WorkerViewBox() {
  const params = useParams();
  const [ViewMore, setViewMore] = useState({});
  const [status, setStatus] = useState({});
  const [title, setTitle] = useState("")
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const navigate = useNavigate();

  const HandleGetMore = () => {
    axios
      .get(`http://localhost:7000/request/${params.id}`)
      .then((response) => {
        setViewMore(response.data);
        setName(response.data.name)
        setTitle(response.data.title)
        setId(response.data.ID)
        setStatus(response.data.status)
        calculateDuration(response.data.startDate, response.data.endDate); // Calculate duration when data is fetched
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const HandleDeleteRequest = () => {
  //   axios
  //     .delete(`http://localhost:7000/request/delete/${params.id}`)
  //     .then((response) => {
  //       console.log(response);
  //       alert("Request has been deleted successfully");
  //       calculateDuration(response.data.startDate, response.data.endDate); // Calculate duration when data is fetched
  //       navigate("/workerDashboard");
  //     })
  //     .catch((err) => {
  //       alert("Error in deleting request");
  //       console.log(err);
  //     });
  // };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.floor((end - start) / (1000 * 3600 * 24)); // Difference in days
    setViewMore((prevState) => ({ ...prevState, duration })); // Update the duration in state
  };


  // Function sameenaayo pdf
  const generatePDF = () => {

    const doc = new jsPDF()

    doc.text(`Name: ${name} <br>`, 10, 10)
    doc.text(`Title: ${title} <br>`, 10, 20)
    doc.text(`ID: ${id}`, 10, 40)
    doc.text(`Permission Status: ${status}`, 10, 30)
    doc.save("an.pdf")

  }


  useEffect(() => {
    HandleGetMore();
  }, []);

  return (
    <div>
      <WorkerSideBar />
      <div className="w-full bg-[#DADADA] h-screen">
        <div className="w-[450px] bg-white absolute px-[60px] rounded-md pt-[20px] mt-5 ml-[35%] h-[500px] shadow-[#6A6458]">
          <h1 className="text-center text-[#017779] font-semibold text-[20px]">More Details</h1>
          <div className="mt-4 gap-5">
            <div className="flex gap-2 items-center ">
              <FaRegCircleUser className="w-8 h-6" />
              <h1 className="font-semibold text-lg"> {ViewMore.fullName} </h1>
            </div>
            <div className="flex mt-6 gap-10">
              <ul className="font-semibold leading-[30px]">
                <li>Title</li>
                <li>Destination</li>
                <li>Start Date</li>
                <li>End Date</li>
                <li>Duration</li>
              </ul>
              <ul className="leading-[30px] ml-[-30px] ">
                <li>:</li>
                <li>:</li>
                <li>:</li>
                <li>:</li>
                <li>:</li>
              </ul>
              <ul className="leading-[30px] ml-10">
                <li>{ViewMore.title}</li>
                <li>{ViewMore.destination}</li>
                <li>{new Date(ViewMore.startDate).toLocaleDateString("en-SO")}</li>
                <li>{new Date(ViewMore.endDate).toLocaleDateString("en-SO")}</li>
                <li>{ViewMore.duration} days</li>
              </ul>
            </div>
            <div className="">
              <h1 className="mt-1 font-semibold">Permission reason:</h1>
              <textarea
                value={ViewMore.reason}
                className="w-[360px] border-black ml-[-5px] h-[75px] outline-none px-[6px]"
                placeholder="Enter your reason"
                readOnly
              ></textarea>
              {/* <h1 className="mt-1 font-semibold">Manager Comment:</h1>
              <textarea value={ViewMore.comment} className="w-[360px] border-black ml-[-5px] h-[75px] outline-none px-[6px]"
                placeholder="Manager's comment" readOnly >
              </textarea> */}
              <div className="flex mt-5 gap-10">
                <button className="mt-1 w-[125px] h-[40px] rounded-[8px] bg-[#017779] hover:bg-[#0E0E0E] text-white">
                  {ViewMore.status}
                </button>
                <button
                  onClick={generatePDF} className="mt-1 w-[125px] h-[40px] rounded-[8px] bg-[#017779] hover:bg-[#0E0E0E] text-white" > Download PDF 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerViewBox;
