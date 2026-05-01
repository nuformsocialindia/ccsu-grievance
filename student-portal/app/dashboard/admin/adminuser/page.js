"use client"
import { useState, useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Adminuser() {
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const [form, setForm] = useState({
        full_name: "",
        phone: "",
        email: "",
        address: "",
        username: "",
        password: "",
        role: "",
        action: "",
        assign_admin_id: "",
        assign_manager_id: ""
    });

    const [users, setUsers] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [editForm, setEditForm] = useState({
        id: "",
        full_name: "",
        phone: "",
        email: "",
        address: "",
        username: "",
        password: "",
        role: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(user);
    }, []);
    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value

        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token")
            const payload = {
                ...form,
                assign_admin_id:
                    currentUser?.role === "admin" ? currentUser.id : form.assign_admin_id
            }
            console.log("Payload ja rh h", payload)
            const res = await fetch("http://localhost:5002/api/adminadd/add-adminuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log("Server Response",data)

            if (res.ok) {
                toast.success("User created successfully");

                setForm({
                    full_name: form.full_name,
                    phone: form.phone,
                    email: form.email,
                    address: form.address,
                    username: form.username,
                    password: form.password,
                    role: form.role,
                    assign_admin_id:
                        currentUser?.role === "admin" ? currentUser.id : null,
                    assign_manager_id: form.assign_manager_id || null
                });
                setOpen(false);
                fetchUsers();
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            toast.error("Server error");
        }
    };
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await fetch("http://localhost:5002/api/adminadd/all", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            console.log("API response", data)
           setUsers(Array.isArray(data) ? data : data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    // delete user 
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`http://localhost:5002/api/adminadd/delete/${id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("User deleted successfully");
                fetchUsers(); // refresh table
            } else {
                toast.error(data.message || "Delete failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("Server error");
        }
    };
    const handleEdit = (user) => {
        setEditForm(user);
        setEditOpen(true);
    };
    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token")
            const res = await fetch(`http://localhost:5002/api/adminadd/update/${editForm.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editForm),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("User updated successfully");
                setEditOpen(false);
                fetchUsers(); // table refresh
            } else {
                toast.error(data.message || "Update failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("Server error");
        }
    };

    return (
        <>
            <div>
                <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
                    <div className='w-full flex justify-end mt-4'>
                        {currentUser?.role === "admin" && (
                            <button
                                onClick={() => setOpen(true)}
                                className="bg-[#14297a] text-white px-6 py-2 rounded-lg shadow-lg hover:bg-[#14297a] transition cursor-pointer justify-end"> + Add user

                            </button>
                        )

                        }
                    </div>
                    {/* table  */}

                    <div className='w-full overflow-x-auto mt-6'>
                        <table className='min-w-full border'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='p-2 border'>Id</th>
                                    <th className='p-2 border'>Name</th>
                                    <th className='p-2 border'>Phone</th>
                                    <th className='p-2 border'>Email</th>
                                    <th className='p-2 border'>UserName</th>
                                    <th className='p-2 border'>Role</th>
                                    <th className='p-2 border'>Action</th>


                                    {/* <th className='p-2 border'>Status</th> */}




                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id} className='text-center'>
                                        <td className="p-2 border">{user.id}</td>
                                        <td className="p-2 border">{user.full_name}</td>

                                        <td className="p-2 border">{user.phone}</td>
                                        <td className="p-2 border">{user.email}</td>

                                        <td className="p-2 border">{user.username}</td>

                                        <td className="p-2 border">
                                            <span className={`px-2 py-1 rounded text-white text-sm
        ${user.role === "admin" ? "bg-blue-600" :
                                                    user.role === "manager" ? "bg-green-600" :
                                                        "bg-yellow-500"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-2 border flex gap-3 justify-center items-center">

                                            {/* Edit Button */}
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="text-green-600 hover:text-green-800 cursor-pointer"
                                                title="Edit User"
                                            >
                                                <MdEdit size={20} />
                                            </button>

                                            {/* Delete Button */}
                                            {currentUser?.role === "admin" && (
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-600 hover:text-red-800 cursor-pointer"
                                                    title="Delete User"
                                                >
                                                    <MdDelete size={20} />
                                                </button>
                                            )}

                                        </td>

                                        {/* <td className="p-2 border">{user.status}</td> */}



                                    </tr>
                                ))

                                }
                            </tbody>

                        </table>

                    </div>
                    {
                        open && (
                            <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 p-4">
                                <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6 relative overflow-y-auto max-h-[100vh] ">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl cursor-pointer"

                                    >
                                        ✕
                                    </button>

                                    <h2 className="text-2xl font-semibold mb-6 text-center">
                                        Add  User
                                    </h2>
                                    <div className='overflow-hidden'>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                            {/* Full Name */}
                                            <div>
                                                <label className="block mb-1 font-medium">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="full_name"
                                                    placeholder="Enter Full Name"
                                                    onChange={handleChange}
                                                    value={form.full_name}
                                                    className="border p-2 rounded w-full"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <label className="block mb-1 font-medium">Phone Number</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    placeholder="Enter Phone Number"
                                                    className="border p-2 rounded w-full"
                                                    onChange={handleChange}
                                                    value={form.phone}
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label className="block mb-1 font-medium">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Enter Email"
                                                    className="border p-2 rounded w-full"
                                                    onChange={handleChange}
                                                    value={form.email}
                                                />
                                            </div>

                                            {/* Address */}
                                            <div>
                                                <label className="block mb-1 font-medium">Address</label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    placeholder="Enter Address"
                                                    className="border p-2 rounded w-full"
                                                    onChange={handleChange}
                                                    value={form.address}
                                                />
                                            </div>

                                            {/* Username */}
                                            <div>
                                                <label className="block mb-1 font-medium">Username / ID</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    placeholder="Enter Username"
                                                    className="border p-2 rounded w-full"
                                                    onChange={handleChange}
                                                    value={form.username}
                                                />
                                            </div>

                                            {/* Password */}
                                            <div>
                                                <label className="block mb-1 font-medium">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    placeholder="Enter Password"
                                                    className="border p-2 rounded w-full"
                                                    onChange={handleChange}
                                                    value={form.password}
                                                />
                                            </div>

                                            {/* Role */}
                                            <select
                                                name="role"
                                                value={form.role}
                                                onChange={handleChange}
                                                className="border p-2 rounded w-full" defaultValue="">
                                                <option value="" disabled>Select Role</option>
                                                <option value="admin">Admin</option>
                                                <option value="sub_admin">Sub Admin</option>
                                                <option value="manager">Manager</option>
                                                {/* <option value="user">User</option> */}
                                            </select>

                                            {currentUser?.role === "admin" && (
                                                <select
                                                    name="assign_manager_id"
                                                    value={form.assign_manager_id}
                                                    onChange={handleChange}
                                                    className="border p-2 rounded w-full"
                                                >
                                                    <option value="">Assign Manager / Sub Admin</option>

                                                    {users
                                                        .filter(u => u.role === "manager" || u.role === "sub_admin")
                                                        .map(u => (
                                                            <option key={u.id} value={u.id}>
                                                                {u.full_name} ({u.role})
                                                            </option>
                                                        ))}
                                                </select>
                                            )}
                                            {/* Submit */}
                                            <div className="md:col-span-2">
                                                <button

                                                    type="submit"
                                                    className="bg-[#14297a] text-white py-2 rounded-lg w-full cursor-pointer"
                                                >
                                                    Submit User
                                                </button>

                                            </div>

                                        </form>

                                    </div>
                                </div>

                            </div>


                        )
                    }
                    {editOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">

                            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative overflow-hidden">

                                {/* Header */}
                                <div className=" text-black px-6 py-4 flex justify-between items-center ">
                                    <h2 className="text-lg font-semibold justify-center text-center">Edit User</h2>

                                    {/* Close Button */}
                                    <button
                                        onClick={() => setEditOpen(false)}
                                        className="text-black text-2xl hover:opacity-80"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="p-6 overflow-y-auto max-h-[90vh]">

                                    <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <input
                                            name="full_name"
                                            value={editForm.full_name}
                                            onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                                            className="border rounded-lg p-3"
                                            placeholder="Full Name"
                                        />
                                        <input
                                            name="phone"
                                            value={editForm.phone}
                                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                        />

                                        <input
                                            name="email"
                                            value={editForm.email}
                                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        />

                                        <input
                                            name="address"
                                            value={editForm.address}
                                            onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                        />

                                        <input
                                            name="username"
                                            value={editForm.username}
                                            onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                                        />

                                        <input
                                            type="password"
                                            name="password"
                                            value={editForm.password}
                                            onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                                        />

                                        {currentUser?.role === "admin" && (
                                            <select
                                                name="assign_admin_id"
                                                value={editForm.assign_admin_id}
                                                onChange={(e) =>
                                                    setEditForm({ ...editForm, assign_admin_id: e.target.value })
                                                }
                                                className="border p-2 rounded w-full"
                                            >
                                                <option value="">Select Admin</option>

                                                {users
                                                    .filter(u => u.role === "admin")
                                                    .map(admin => (
                                                        <option key={admin.id} value={admin.id}>
                                                            {admin.full_name}
                                                        </option>
                                                    ))}
                                            </select>
                                        )}
                                        <select
                                            name="assign_manager_id"
                                            value={editForm.assign_manager_id || ""}
                                            onChange={(e) =>
                                                setEditForm({ ...editForm, assign_manager_id: e.target.value })
                                            }
                                            className="border p-2 rounded w-full"
                                        >
                                            <option value="">Assign Manager</option>

                                            {users
                                                .filter(u => u.role === "manager" || u.role === "sub_admin")
                                                .map(u => (
                                                    <option key={u.id} value={u.id}>
                                                        {u.full_name}
                                                    </option>
                                                ))}
                                        </select>

                                        {/* Button */}
                                        <div className="md:col-span-2 mt-2">
                                            <button
                                                type="button"
                                                onClick={handleUpdate}
                                                className="w-full bg-[#14297a] text-white py-3 rounded-lg"
                                            >
                                                Update User
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}