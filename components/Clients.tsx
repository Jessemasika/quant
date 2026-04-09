"use client";

import { useClients } from "@/contexts/ClientContext";
import { useState } from "react";
import { UserPlus, CheckCircle, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"; // path to your dialog

export default function Clients() {
  const { clients, addClient, deleteClient } = useClients();

  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    revenue: "",
    status: "pending" as "active" | "inactive" | "pending",
    royaltyRate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null); // for selected client

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.revenue || parseFloat(formData.revenue) < 0)
      newErrors.revenue = "Revenue must be positive";
    if (
      !formData.royaltyRate ||
      parseFloat(formData.royaltyRate) < 0 ||
      parseFloat(formData.royaltyRate) > 100
    )
      newErrors.royaltyRate = "Royalty rate must be 0-100";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addClient({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      revenue: parseFloat(formData.revenue),
      status: formData.status,
      joinedDate: new Date().toISOString().split("T")[0],
      royaltyRate: parseFloat(formData.royaltyRate),
    });

    setShowSuccess(true);
    setFormData({
      name: "",
      email: "",
      company: "",
      revenue: "",
      status: "pending",
      royaltyRate: "",
    });
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 p-6 bg-background text-foreground min-h-screen">
      {/* Form */}
      <div
        className="p-6 rounded-xl border"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <UserPlus className="w-6 h-6 text-primary" />
          Add New Client
        </h2>

        {showSuccess && (
          <div
            className="mb-4 p-3 rounded-lg flex items-center gap-2"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
              border: "1px solid var(--border)",
            }}
          >
            <CheckCircle className="w-5 h-5" />
            Client added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "company", "revenue", "royaltyRate"].map((field) => (
            <input
              key={field}
              name={field}
              type={field === "revenue" || field === "royaltyRate" ? "number" : "text"}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
                color: "var(--card-foreground)",
              }}
            />
          ))}

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border focus:outline-none"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--card)",
              color: "var(--card-foreground)",
            }}
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            type="submit"
            className="w-full py-2 rounded-lg hover:brightness-90"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            Add Client
          </button>
        </form>
      </div>

      {/* Table */}
      <div
        className="p-6 rounded-xl border overflow-x-auto"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
          color: "var(--card-foreground)",
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Clients</h2>

        <table className="w-full">
          <thead>
            <tr
              className="text-left text-sm uppercase"
              style={{ color: "var(--muted-foreground)" }}
            >
              <th>Client</th>
              <th>Company</th>
              <th>Revenue</th>
              <th>Royalty</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((c) => (
              <tr
                key={c.id}
                className="hover:brightness-95"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <td>{c.name}</td>
                <td>{c.company}</td>
                <td>{c.revenue.toLocaleString()}</td>
                <td>{c.royaltyRate}%</td>
                <td>{c.status}</td>
                <td>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="flex items-center gap-1 text-destructive"
                      >
                        <Trash className="w-4 h-4" /> Delete
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {c.name}? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteClient(c.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}