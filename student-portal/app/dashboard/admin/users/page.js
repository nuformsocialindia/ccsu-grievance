"use client"

export default function Users() {
  const users = [
    { id: 1, name: "John", email: "john@mail.com" },
    { id: 2, name: "Amit", email: "amit@mail.com" },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="bg-white shadow rounded-xl p-4">
        {users.map((u) => (
          <div key={u.id} className="border-b py-3">
            <p className="font-semibold">{u.name}</p>
            <p className="text-gray-500 text-sm">{u.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}