"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    // simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // save auth
    localStorage.setItem("auth", "true");

    setIsLoading(false);

    // redirect to dashboard overview
    router.push("/admin/overview");
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="bg-teal-950 p-8 rounded-2xl shadow-md w-full max-w-md">
        
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          QUANTEDGE LIMITED
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg text-black placeholder-gray-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg text-black placeholder-gray-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-cyan-600 font-semibold p-3 rounded-lg hover:bg-gray-100 transition"
          >
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}