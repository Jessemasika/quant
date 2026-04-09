"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ClientProvider } from "@/contexts/ClientContext"; // ✅ ADD THIS

import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth");

    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [router]);

  return (
    <ClientProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />

          <main className="flex-1 flex flex-col">
            <SidebarTrigger/>
            <Navbar />

            {children}
          </main>
        </div>
      </SidebarProvider>
    </ClientProvider>
  );
}