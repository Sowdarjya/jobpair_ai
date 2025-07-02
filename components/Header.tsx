"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Brain } from "lucide-react";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            JobPair AI
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>
          )}
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton />
            <SignOutButton>
              <Button className="cursor-pointer">Sign Out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignUpButton mode="modal">
              <Button className="cursor-pointer">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
