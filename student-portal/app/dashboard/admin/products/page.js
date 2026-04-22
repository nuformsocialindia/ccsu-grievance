"use client"
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi"

export default function Products() {
  const products = [
    { id: 1, name: "iPhone 14", price: "₹70,000", stock: 12, img: "/images/login.jpg" },
    { id: 2, name: "Laptop", price: "₹55,000", stock: 8, img: "/images/abstract.jpg" },
    { id: 3, name: "Headphones", price: "₹2,500", stock: 25, img: "/images/login.jpg" },
    { id: 4, name: "Smart Watch", price: "₹5,000", stock: 15, img: "/images/logo.jpg" },
  ]

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500 text-sm">Manage your inventory</p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="flex items-center bg-white px-3 py-2 rounded-xl shadow w-full md:w-64">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 w-full outline-none text-sm"
            />
          </div>

          {/* Add Button */}
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#14297A]-600 to-[#14297A] text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition">
            <FiPlus />
            Add Product
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
          >

            {/* Image */}
            <div className="relative">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Stock Badge */}
              <span className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full text-white ${
                item.stock < 10 ? "bg-red-500" : "bg-green-600"
              }`}>
                {item.stock < 10 ? "Low Stock" : "In Stock"}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-gray-500 text-sm">{item.price}</p>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm">
                  Qty:{" "}
                  <span className="font-medium">{item.stock}</span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-between mt-4 border-t pt-3">
                <button className="flex items-center gap-1 text-[#14297A] hover:text-[#14297A] text-sm">
                  <FiEdit /> Edit
                </button>
                <button className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm">
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}