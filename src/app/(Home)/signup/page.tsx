"use client";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
    password: "",
    rememberMe: false,
    otp: "",
  });
  const [otpSent, setOtpSent] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const router = useRouter();

  const handleProfileImageUpload = (
    folderName: string,
    imageName: string,
    path: string
  ) => {
    if (!formData.name) {
      toast.error("Name is required for images");
      return;
    }
    if (profileImage) {
      const file = profileImage;
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file,
        name: imageName,
        folderName: folderName,
      });
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setFormData({
            ...formData,
            [path]: data.data.path,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };

  const verifyEmail = async () => {
    if (
      !formData.email ||
      !formData.email.includes("@") ||
      !formData.email.includes(".")
    ) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!formData.name) {
      toast.error("Please enter your name first");
      return;
    }
    try {
      const response = axios.post("/api/helper/verify-email", {
        name: formData.name,
        email: formData.email,
      });
      toast.promise(response, {
        loading: "Sending Email...",
        success: (data: AxiosResponse) => {
          (
            document.getElementById("otpContainer") as HTMLDialogElement
          ).showModal();
          setOtpSent(data.data.token);
          return "Email Sent!!";
        },
        error: (err) => err.data?.response.message || "Something went wrong",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.password ||
        !formData.profileImage
      ) {
        toast.error("Please fill all the required fields");
        return;
      }
      const res = axios.post("/api/auth/signup", { formData });
      toast.promise(res, {
        loading: "Creating Account...",
        success: (data: AxiosResponse) => {
          router.push("/signin");
          return "Account Created Successfully";
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
              <h1 className="text-3xl font-bold">Sign Up to NeuroStream</h1>
              <p className="opacity-80 mt-1">Start your learning journey today</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-10 space-y-4 text-base-content"
            >
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Name <span className="text-error">*</span>
                </legend>
                <input
                  type="text"
                  className="input input-bordered input-primary w-full"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Email <span className="text-error">*</span>
                </legend>
                <div className="join w-full">
                  <input
                    type="email"
                    className="input input-bordered input-primary w-full join-item"
                    disabled={isEmailVerified}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  {!isEmailVerified && (
                    <button
                      type="button"
                      className="btn btn-primary join-item"
                      disabled={isEmailVerified || !formData.email}
                      onClick={() => verifyEmail()}
                    >
                      Verify
                    </button>
                  )}
                </div>
              </fieldset>

              <fieldset className="fieldset ">
                <legend className="fieldset-legend">
                  Phone Number <span className="text-error">*</span>
                </legend>
                <input
                  type="tel"
                  className="input input-bordered input-primary w-full"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </fieldset>

              <fieldset className="fieldset ">
                <legend className="fieldset-legend">
                  Profile Image <span className="text-error">*</span>
                </legend>
                <div className="join w-full">
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-primary w-full join-item"
                    disabled={!!formData.profileImage || !formData.name}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setProfileImage(file);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary join-item"
                    onClick={() =>
                      handleProfileImageUpload(
                        "ProfileImages",
                        formData.name,
                        "profileImage"
                      )
                    }
                  >
                    Upload
                  </button>
                </div>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Password <span className="text-error">*</span>
                </legend>
                <div className="join w-full">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className="input input-bordered input-primary w-full join-item"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-primary join-item"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
              </fieldset>

              <div className="flex justify-between mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="text-sm">
                    {" "}
                    I agree to the{" "}
                    <Link href="#" className="link link-primary">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="link link-primary">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>
              <div className="space-y-4">
                <button
                  className="btn btn-primary w-full disabled:btn-disabled"
                  type="submit"
                  disabled={
                    !isEmailVerified ||
                    !formData.name ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.password ||
                    !formData.profileImage
                  }
                >
                  Sign Up
                </button>

                {/* Validation messages for better UX */}
                <div className="text-xs space-y-1 text-center">
                  {!isEmailVerified && <p className="text-error">Please verify your email</p>}
                  {!formData.profileImage && <p className="text-error">Please upload a profile image</p>}
                  {(!formData.name || !formData.email || !formData.phone || !formData.password) && (
                    <p className="text-error">Please fill all required fields</p>
                  )}
                </div>

                <p className="text-sm text-center text-base-300 pt-4 border-t border-base-100/20">
                  Already have an account?{" "}
                  <a href="/signin" className="link link-primary font-bold px-2 py-1">
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <dialog id="otpContainer" className="modal">
        <div className="modal-box space-y-6">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content hover:text-primary transition duration-200">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl text-center text-base-content uppercase my-4">
            Please Enter The OTP
          </h3>

          <div className="flex justify-center gap-4">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="input input-bordered input-primary text-center w-12 h-12 text-xl font-semibold placeholder:text-base-content/70"
                value={formData.otp?.[index] ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d$/.test(value) || value === "") {
                    const otp = (formData.otp || "").split("");
                    otp[index] = value;
                    setFormData({ ...formData, otp: otp.join("") });
                    if (value && index < 5) {
                      document
                        .getElementById(`otp-input-${index + 1}`)
                        ?.focus();
                    }
                  }
                }}
                id={`otp-input-${index}`}
                placeholder="●"
              />
            ))}
          </div>

          <button
            className="btn btn-primary w-full mt-4 py-2"
            onClick={(e) => {
              e.preventDefault();
              if (formData.otp?.length === 6 && formData.otp === otpSent) {
                setIsEmailVerified(true);
                (
                  document.getElementById("otpContainer") as HTMLDialogElement
                )?.close();
                toast.success("OTP Verified");
              } else {
                toast.error("Invalid OTP!!!");
              }
            }}
          >
            Verify
          </button>
        </div>
      </dialog>
    </>
  );
}
