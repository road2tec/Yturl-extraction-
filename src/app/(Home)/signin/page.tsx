"use client";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = axios.post("/api/auth/signin", { formData });
      toast.promise(response, {
        loading: "Signing In...",
        success: (data: AxiosResponse) => {
          router.push(data.data.route);
          return "Sign In Successful";
        },
        error: (err) => err.data?.response.message || "Something went wrong",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    }
  };

  return (
    <>
      <section className="flex justify-center items-center bg-gradient-to-b from-base-100 to-primary min-h-screen pt-24 pb-12">
        <div className="mx-auto w-full max-w-xl px-4 md:px-8">
          <div className="rounded-2xl bg-base-100 shadow-2xl overflow-hidden border border-base-300">
            <div className="bg-primary p-6 text-primary-content text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="opacity-80 mt-1">Please sign in to your account</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-10 space-y-4 text-base-content"
            >
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Email <span className="text-error">*</span>
                </legend>
                <input
                  type="email"
                  className="input input-bordered input-primary w-full"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Password <span className="text-error">*</span>
                </legend>
                <div className="join w-full">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="input input-bordered input-primary w-full join-item"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-square join-item"
                    onClick={() =>
                      setIsPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {isPasswordVisible ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </fieldset>
              <div className="flex justify-between items-center mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link href="/signin" className="text-sm link link-primary">
                  Forgot Password?
                </Link>
              </div>
              <button className="btn btn-primary w-full text-lg mt-2" type="submit">
                Sign In
              </button>
              <p className="text-sm text-center mt-4 pt-4 border-t border-base-200">
                Don’t have an account?{" "}
                <Link href="/signup" className="link link-primary font-bold">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
