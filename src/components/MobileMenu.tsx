import React from "react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  visible?: boolean;
  isAdmin?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible, isAdmin }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <Link to="/home/">
          <div className="px-3 text-center text-white hover:underline">
            Home
          </div>
        </Link>
        {/* <div className="px-3 text-center text-white hover:underline">
          Series
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Films
        </div>
        <div className="px-3 text-center text-white hover:underline">
          New & Popular
        </div> */}
        <Link to="/home/favorite">
          <div className="px-3 text-center text-white hover:underline">
            My List
          </div>
        </Link>
        {isAdmin && (
          <Link to="/home/dashboard">
            <div className="px-3 text-center text-white hover:underline">
              Dashboard
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
