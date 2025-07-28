import { Button } from "@/component";
import { FaCar, FaExclamationCircle } from "react-icons/fa";

export default function GlobalNotFound() {
  return (
    <div className="bg-blue-500 dark:bg-gray-800 h-screen w-screen flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-lg mx-auto p-8 bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm rounded-2xl shadow-2xl animate-fadeIn">
        
        {/* Icon or Visual Element */}
        <div className="flex justify-center">
          <div className="relative">
            <FaCar className="text-white text-6xl md:text-8xl drop-shadow-lg animate-bounce-slow" />
            <FaExclamationCircle className="absolute -top-2 -right-2 text-yellow-300 text-2xl md:text-3xl animate-ping" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          404
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-white font-light opacity-90">
          Oops! Lost the keys?
        </p>

        {/* Description */}
        <p className="text-lg text-white/90 leading-relaxed">
          The page you're looking for isn't in our garage. 
          It might've gone for a joyride.
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            label="Back to Home"
            link="/"
            className="bg-white text-blue-600 hover:bg-blue-50 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold px-8 py-3 rounded-xl shadow-lg"
          />
        </div>

        {/* Decorative Bottom Line */}
        <div className="pt-4">
          <span className="block w-16 h-1 mx-auto bg-yellow-300 rounded-full opacity-70"></span>
        </div>
      </div>
    </div>
  );
}
