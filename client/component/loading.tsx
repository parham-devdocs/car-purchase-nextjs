const Loading = ({ size }: { size: "small" | "medium" | "large" }) => {
    // Define sizes dynamically
    const sizeClasses = {
      small: "w-8 h-8",
      medium: "w-16 h-16",
      large: "w-24 h-24"
    };
  
    return (
      <div className="flex items-center justify-center w-full">
        <div className={`relative ${sizeClasses[size]}`}>
          {/* Outer orbiting ring */}
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-purple-500 animate-spin-slow"></div>
  
          {/* Inner rotating orb */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/30 animate-pulse-slow">
            {/* Dynamic orb size based on loader size */}
            {size === "small" && <div className="w-2 h-2"></div>}
            {size === "medium" && <div className="w-5 h-5"></div>}
            {size === "large" && <div className="w-7 h-7"></div>}
          </div>
        </div>
        </div>)}
        

export default Loading;