// components/AppSidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BarChart, CreditCard, Plus, Projector, User } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";

// Menu items
const items = [
  { title: "Clients", url: "/admin/clients", icon: User },
  { title: "Overview", url: "/admin/overview", icon: BarChart },
  { title: "Royalties", url: "/admin/royalties", icon: CreditCard },
];

const AppSidebar: React.FC = () => {
  const sidebar = useSidebar();

  const handleClose = () => {
    // 🔥 ensures sidebar always closes
    sidebar?.setOpen?.(false);
  };

  return (
    <Sidebar
      collapsible="offcanvas" // ✅ FIXED
      side="left"
      className="bg-teal-600 text-white dark:bg-teal-800 dark:text-gray-100"
    >
      {/* HEADER */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                onClick={handleClose}
                className="flex items-center gap-2 group-data-[collapsed=true]:justify-center"
              >
                <Image src="/logo.png" alt="logo" width={24} height={24} />
                <span className="font-bold text-white group-data-[collapsed=true]:hidden">
                  QUANTEDGE LIMITED
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* APPLICATION */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-teal-200 dark:text-teal-300">
            Application
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      onClick={handleClose}
                      className="flex items-center gap-2 group-data-[collapsed=true]:justify-center text-white hover:text-teal-300 dark:hover:text-teal-200"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span className="group-data-[collapsed=true]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* PROJECTS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-teal-200 dark:text-teal-300">
            Projects
          </SidebarGroupLabel>

          <SidebarGroupAction
            onClick={handleClose}
            className="flex items-center gap-1 cursor-pointer text-white hover:text-teal-300 dark:hover:text-teal-200"
          >
            <Plus />
            <span className="sr-only">Add Project</span>
          </SidebarGroupAction>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/projects"
                    onClick={handleClose}
                    className="flex items-center gap-2 group-data-[collapsed=true]:justify-center text-white hover:text-teal-300"
                  >
                    <Projector className="w-5 h-5 shrink-0" />
                    <span className="group-data-[collapsed=true]:hidden">
                      See All Projects
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/projects/new"
                    onClick={handleClose}
                    className="flex items-center gap-2 group-data-[collapsed=true]:justify-center text-white hover:text-teal-300"
                  >
                    <Plus className="w-5 h-5 shrink-0" />
                    <span className="group-data-[collapsed=true]:hidden">
                      Add Project
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="bg-teal-500 dark:bg-teal-600 p-4 text-white">
        {/* Optional footer content */}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;