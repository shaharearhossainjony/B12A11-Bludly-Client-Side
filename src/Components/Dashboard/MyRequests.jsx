import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const MyRequests = () => {
  const {loading, setLoading} =useContext(AuthContext)
  const [myRequests, setMyRequests] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequests(res.data.request);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberOfPages = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

const handlePrevious=()=>{
  if(currentPage > 1){
    setCurrentPage(currentPage -1 )
  }
}

const handleNext=()=>{
  if(currentPage < pages.length){
    setCurrentPage(currentPage + 1 )
  }
}
if (loading){
  return <LoaderSpinner></LoaderSpinner>
}



  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Recepient Name</th>
              <th>Hospital Name</th>
              <th>Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map((request, index) => (
              <tr>
                <th>{(currentPage - 1) * 10 + (index + 1)}</th>
                <td>{request?.recipientName}</td>
                <td>{request?.hospitalName}</td>
                <td>{request?.bloodGroup}</td>
                
                
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-12 gap-4">
          <button onClick={()=>handlePrevious()} className="btn">Previous</button>
          {
            pages.map(page =><button onClick={()=>setCurrentPage(page)} className={`btn ${page == currentPage ? "bg-[#435585] text-white" : ""}`} >{page}</button>)
          }
          <button onClick={()=>handleNext()} className="btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
