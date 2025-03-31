
import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  const { theme } = useTheme();
  
  return (
    <Link 
      to="/" 
      className={`block transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <div className="flex items-center">
        <div className="relative h-10 w-10 mr-2 bg-accent/10 rounded-lg flex items-center justify-center">
          <span className="text-accent font-bold text-2xl">CB</span>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full"></div>
        </div>
        <span className="font-semibold text-xl">ConnectingBee</span>
      </div>
    </Link>
  );
};

export default Logo;
