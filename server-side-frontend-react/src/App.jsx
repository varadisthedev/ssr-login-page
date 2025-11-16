import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
  });

  const [response, setResponse] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    });
    const data = await res.json();
    setResponse(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">User Form</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Your Name</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="number"
              name="phone"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/70 focus:outline-none"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-black focus:outline-none"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-xl bg-white/30 border border-white/40 hover:bg-white/40 transition font-semibold"
          >
            Submit
          </button>
        </form>

        {response && (
          <div className="mt-6 p-4 rounded-xl bg-white/20 border border-white/30 text-sm">
            {response.status === "error" ? (
              <>
                <h2 className="font-bold mb-2 text-red-300">Errors:</h2>
                <ul className="list-disc ml-4">
                  {response.errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-green-300 font-semibold">{response.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
