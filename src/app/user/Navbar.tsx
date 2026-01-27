import ThemeToggler from "@/components/Navbar/ThemeToggler";
import { useAuth } from "@/context/AuthProvider";
import { IconMenu2, IconVideo } from "@tabler/icons-react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const links = [
  { name: "Predict (Video)", url: "/user/predict" },
  { name: "Predict (URL)", url: "/user/videos" },
  { name: "Summaries", url: "/user/summaries" },
  { name: "Highlights", url: "/user/highlights" },
  { name: "Quizzes", url: "/user/quizzes" },
];

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    toast.promise(axios.get("/api/auth/logout"), {
      loading: "Logging out...",
      success: () => {
        router.push("/");
        return "Logged out successfully";
      },
      error: "Error logging out",
    });
  };
  return (
    <div className="navbar bg-base-300 shadow-sm fixed top-0 left-0 right-0 z-50 lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <IconMenu2 className="w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.url} className="btn btn-ghost">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/user/dashboard"
          className="btn btn-ghost normal-case text-xl"
        >
          <div className="flex items-center gap-2">
            <IconVideo className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">
              NeuroStream
            </span>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link) => (
            <li key={link.name} className="text-base">
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggler />
        <div className="block">
          <ul className="menu menu-horizontal flex items-center space-x-4">
            <div className="dropdown dropdown-left cursor-pointer bg-transparent">
              <Image
                src={user?.profileImage!}
                alt="Avatar"
                className="rounded-full h-16 w-16 object-cover avatar-online border-2 border-primary"
                width={20}
                height={20}
                tabIndex={0}
                role="button"
              />
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-72 p-2 shadow"
              >
                {/* User Initial */}
                <div className="flex items-center justify-center mb-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-base-conten rounded-full text-xl font-bold">
                    {user?.name[0].toUpperCase()}
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <span className="text-lg font-semibold text-base-content">
                    {user?.name}
                  </span>
                </div>
                <hr className="my-2 border-base-content" />
                <div className="flex flex-col">
                  <Link
                    className="text-left px-4 py-2 text-base-content hover:bg-base-200 transition duration-200"
                    href={`/user/settings`}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 text-base-content text-dark hover:bg-base-200 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
