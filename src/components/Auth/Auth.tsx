// AuthPage.tsx

"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Ubuntu } from "next/font/google";
import ContactUs from "./ContactUs";
import { motion, AnimatePresence } from "framer-motion";
import backgroundImage from "../../Assets/authBG.jpeg";
import contactBackgroundImage from "../../Assets/contactBG.jpeg"; // Import your second image

const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const AuthPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isContactUs, setIsContactUs] = useState(false);

  // Choose the background image based on the current page
  const currentBackgroundImage = isContactUs
    ? contactBackgroundImage
    : backgroundImage;

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-[1200px] overflow-hidden rounded-[32px] flex flex-col md:flex-row">
        {/* Left Section - Visible on large screens */}
        <div className="relative bg-black text-white p-8 flex flex-col justify-end pb-20 min-h-[600px] w-full lg:w-1/2 hidden lg:flex">
          {/* Animated Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isContactUs ? "contact-image" : "login-image"}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DynamicImage
                src={currentBackgroundImage}
                alt="Background"
                layout="fill"
                objectFit="cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className={`${ubuntu.className} relative`}>
            <h1 className="text-5xl mb-4 whitespace-pre-line">
              {isContactUs ? "Get in Touch" : "Don't\nDeliver\na Product"}
            </h1>
            <p className="text-md font-bold opacity-80 ml-4">
              {isContactUs ? "We're here to help" : "Deliver an Experience"}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-8 md:p-12 flex flex-col w-full lg:w-1/2">
          <div className="flex justify-end mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-black" />
              <span className="font-medium">Admin Dashboard</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full px-4 sm:px-0">
            <AnimatePresence mode="wait">
              {!isContactUs ? (
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Login Form */}
                  <h2 className={`${ubuntu.className} text-3xl font-serif mb-2`}>
                    Welcome Back
                  </h2>
                  <p className="text-gray-500 mb-8">
                    Enter your email and password to access your account
                  </p>

                  <form className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-sm" htmlFor="email">
                        Email
                      </label>
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        className="h-12 rounded-xl border-gray-200"
                      />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                      <label className="text-sm" htmlFor="password">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          id="password"
                          placeholder="Enter your password"
                          type={showPassword ? "text" : "password"}
                          className="h-12 rounded-xl border-gray-200 pr-10"
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          type="button"
                          className="absolute right-0 top-0 h-12 w-12 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label htmlFor="remember" className="text-sm">
                          Remember me
                        </label>
                      </div>
                      <Button
                        variant="link"
                        className="text-sm p-0 h-auto font-normal"
                      >
                        Forgot Password
                      </Button>
                    </div>

                    {/* Sign In Button */}
                    <Button className="w-full h-12 rounded-xl bg-black text-white">
                      Sign In
                    </Button>

                    {/* Divider */}
                    {/* <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">or</span>
                      </div>
                    </div> */}

                  </form>

                  {/* Contact Us Link */}
                  <div className="text-center mt-8">
                    <span className="text-gray-500">Having an issue? </span>
                    <button
                      onClick={() => setIsContactUs(true)}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      Contact Us
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Contact Us Form */}
                  <ContactUs onBack={() => setIsContactUs(false)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
