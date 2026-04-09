"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  revenue: number;
  status: "active" | "inactive" | "pending";
  joinedDate: string;
  royaltyRate: number;
}

interface ClientContextType {
  clients: Client[];
  addClient: (client: Omit<Client, "id">) => void;
  deleteClient: (id: string) => void;
}

const ClientContext = createContext<ClientContextType | null>(null);

// -------------------
// Initial mock data
// -------------------
const initialClients: Client[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@techcorp.com",
    company: "TechCorp Industries",
    revenue: 125000,
    status: "active",
    joinedDate: "2024-01-15",
    royaltyRate: 12.5,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@innovate.io",
    company: "Innovate Solutions",
    revenue: 89000,
    status: "active",
    joinedDate: "2024-02-20",
    royaltyRate: 10.0,
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "mchen@globaltech.com",
    company: "Global Tech Partners",
    revenue: 156000,
    status: "active",
    joinedDate: "2023-11-10",
    royaltyRate: 15.0,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@startup.co",
    company: "StartUp Co",
    revenue: 45000,
    status: "pending",
    joinedDate: "2024-03-05",
    royaltyRate: 8.5,
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "rwilson@enterprise.com",
    company: "Enterprise Systems",
    revenue: 210000,
    status: "active",
    joinedDate: "2023-09-12",
    royaltyRate: 18.0,
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "l.anderson@digital.net",
    company: "Digital Ventures",
    revenue: 67000,
    status: "inactive",
    joinedDate: "2024-01-28",
    royaltyRate: 9.0,
  },
];

// -------------------
// Provider
// -------------------
export function ClientProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(initialClients);

  const addClient = (client: Omit<Client, "id">) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
    };

    setClients((prev) => [...prev, newClient]);
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ClientContext.Provider value={{ clients, addClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  );
}

// -------------------
// Hook
// -------------------
export function useClients() {
  const context = useContext(ClientContext);

  if (!context) {
    throw new Error("useClients must be used within a ClientProvider");
  }

  return context;
}