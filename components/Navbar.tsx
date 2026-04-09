"use client";
import { Button } from "@/components/ui/button";
import { Building, DollarSignIcon, LogOut, Moon, Sun, UsersRound } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "./ui/sidebar";
import { useRouter } from "next/navigation"; // <- added

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter(); // <- added

  const handleLogout = () => {
    router.push("/"); 
  };

  return (
    <nav className="p-4 flex items-center justify-between shadow-sm bg-[var(--color-background)] text-[var(--color-foreground)] border-b border-[var(--color-border)] transition-colors">
      {/* Left side: collapse button */}
      <div>
        <SidebarTrigger />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="font-medium hover:text-[var(--primary)] transition-colors"
        >
          Dashboard
        </Link>

        {/* THEME MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--accent)] transition-colors"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* USER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="border-2 border-[var(--primary)]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} className="bg-[var(--color-card)] text-[var(--color-card-foreground)]">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem className="flex items-center gap-2">
                <Building className="h-[1.2rem] w-[1.2rem]" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <DollarSignIcon className="h-[1.2rem] w-[1.2rem]" /> Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2">
                <UsersRound className="h-[1.2rem] w-[1.2rem]" /> Team
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                className="flex items-center gap-2"
                onClick={handleLogout} 
              >
                <LogOut className="h-[1.2rem] w-[1.2rem]" /> Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;