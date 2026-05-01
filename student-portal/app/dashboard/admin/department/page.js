"use client";

export default function Department() {
  const departments = [
    {
      name: "Technical Support",
      desc: "Handles bugs, system errors, login issues",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Billing & Accounts",
      desc: "Payment, refund, invoice related complaints",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Customer Support",
      desc: "General queries and user assistance",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      name: "Management / Escalation",
      desc: "High priority and escalated complaints",
      color: "bg-red-100 text-red-700",
    },
    {
      name: "Legal & Compliance",
      desc: "Legal issues and policy related cases",
      color: "bg-purple-100 text-purple-700",
    },
  ];

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

        {departments.map((dept, index) => (
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
              {dept.desc}
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