import { useEffect, useState } from "react";
import homebg from "../../assets/homebg.png";
import { Link } from "react-router-dom";

export default function Home() {
  const [state, setState] = useState(false);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <div className="relative bg-gray-50">
      {/* Background Blur with White and Light Blue Gradient */}
      <div
        className="absolute inset-0 blur-xl h-[580px] animate-fade-in"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 1) 20%, rgba(173, 216, 230, 0.6) 80%)",
        }}
      ></div>

      <div className="relative">
        <header></header>
        <section>
          <div className="max-w-screen-xl mx-auto px-6 py-28 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex md:items-center">
            {/* Content Section */}
            <div
              className="flex-none space-y-6 max-w-xl animate-slide-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h1 className="text-4xl text-gray-900 font-extrabold sm:text-5xl leading-tight animate-scale-up" style={{ animationDelay: "0.4s" }}>
                Manage Your Tasks <br />
                <span className="text-blue-500 animate-text-fade">
                  Effortlessly and Beautifully
                </span>
              </h1>
              <p
                className="text-lg text-gray-700 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                Organize your daily tasks with ease. Plan ahead, track your
                progress, and stay on top of your goals with our simple and
                intuitive platform.
              </p>
              <ul
                className="list-disc list-inside text-gray-700 space-y-2 animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                <li className="font-semibold text-blue-400">Add tasks and assign deadlines.</li>
                <li className="font-semibold text-blue-400">Track your progress visually.</li>
                <li className="font-semibold text-blue-400">Stay organized and focused.</li>
              </ul>
              <div className="flex items-center gap-x-4 sm:text-sm">
                <Link
                  to="/tasks"
                  className="flex items-center justify-center gap-x-2 py-2 px-6 text-white font-medium bg-blue-500 duration-150 hover:bg-blue-400 active:bg-blue-600 rounded-lg shadow-md md:inline-flex animate-hover"
                  style={{ animationDelay: "0.8s" }}
                >
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
           
              </div>
            </div>

            {/* Image Section */}
            <div
              className="flex-1 hidden md:block animate-slide-in-right"
              style={{ animationDelay: "0.9s" }}
            >
              <img
                src={homebg}
                alt="Create Tasks"
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
