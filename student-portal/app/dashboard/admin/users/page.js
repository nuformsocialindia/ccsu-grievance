"use client";

import { useEffect, useState } from "react";

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          "http://localhost:5002/api/admin/getadmindata"
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch admin data");
        }

        setAdmin(data);
      } catch (err) {
        setError(err.message);
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>

      <div className="bg-white shadow rounded-xl p-6 max-w-md">

        {/* Loading */}
        {loading && (
          <p className="text-gray-600">Loading admin data...</p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="text-red-500">{error}</p>
        )}

        {/* Admin Data */}
        {!loading && !error && admin && (
          <div>
            <p className="text-lg font-semibold">{admin.name}</p>
            <p className="text-gray-500">{admin.email}</p>

            <div className="mt-4 space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Role:</span> Admin
              </p>

              {admin.phone && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Phone:</span>{" "}
                  {admin.phone}
                </p>
              )}
            </div>
          </div>
        )}

        {/* No Data */}
        {!loading && !error && !admin && (
          <p className="text-gray-500">No admin data found</p>
        )}

      </div>
    </div>
  );
}