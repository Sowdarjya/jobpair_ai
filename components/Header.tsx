"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Brain, Menu, User, Home, BarChart3, CreditCard } from "lucide-react";

const Header = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const userNavigationItems = [
    { href: "#features", label: "Features", icon: BarChart3 },
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/pricing", label: "Pricing", icon: CreditCard },
  ];

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JobPair AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* User-specific navigation when signed in */}
            <SignedIn>
              {userNavigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </SignedIn>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
                userProfileProps={{
                  appearance: {
                    elements: {
                      rootBox: "w-full max-w-md",
                    },
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <div className="flex items-center space-x-3">
                <SignInButton>
                  <Button variant="ghost" className="font-medium">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-medium shadow-lg hover:shadow-xl transition-all">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 p-0 cursor-pointer"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b m-4">
                    <Link
                      href="/"
                      className="flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        JobPair AI
                      </span>
                    </Link>
                  </div>

                  <nav className="flex-1 py-6">
                    <div className="space-y-1">
                      <SignedIn>
                        <div className="pt-4 border-t">
                          <p className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Your Account
                          </p>
                          {userNavigationItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                <IconComponent className="h-5 w-5" />
                                <span className="font-medium">
                                  {item.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </SignedIn>
                    </div>
                  </nav>

                  {/* Mobile Auth */}
                  <div className="border-t pt-4">
                    <SignedIn>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 px-3 py-2">
                          <UserButton
                            appearance={{
                              elements: {
                                avatarBox: "w-10 h-10",
                              },
                            }}
                          />
                          <div className="flex flex-col">
                            {user?.firstName && (
                              <p className="font-medium text-sm">
                                {user.firstName} {user.lastName}
                              </p>
                            )}
                            {user?.primaryEmailAddress && (
                              <p className="text-xs text-muted-foreground truncate">
                                {user.primaryEmailAddress.emailAddress}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </SignedIn>

                    <SignedOut>
                      <div className="space-y-3">
                        <SignInButton>
                          <Button
                            variant="outline"
                            className="w-full bg-transparent"
                            onClick={() => setIsOpen(false)}
                          >
                            <User className="mr-2 h-4 w-4" />
                            Sign In
                          </Button>
                        </SignInButton>
                        <SignUpButton>
                          <Button
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            onClick={() => setIsOpen(false)}
                          >
                            Get Started
                          </Button>
                        </SignUpButton>
                      </div>
                    </SignedOut>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
