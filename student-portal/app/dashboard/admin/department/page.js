"use client";
import {useState,useEffect} from "react"
import axios from "axios"

export default function Department() {
  const [departments,setDepartments] = useState([])



  useEffect(()=>{
    fetchDepartments()
  },[])


  const fetchDepartments = async()=>{
    try {
      const res = await axios.get("http://localhost:5002/api/admin/departments")
      console.log("API response", res.data)
      setDepartments(res.data)
      
    } catch (error) {
      console.error("Error fetching documents",error)
      
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Departments
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Manage complaint handling departments
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {departments.map((dept,index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition"
          >

            {/* Icon Badge */}
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${dept.color}`}>
              Department
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mt-3">
              {dept.name}
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm mt-2">
              {dept.description}
            </p>

            {/* Button */}
            <button className="mt-5 w-full bg-[#14297A] hover:bg-[#0f1f5c] text-white py-2 rounded-xl transition">
              View Complaints
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}