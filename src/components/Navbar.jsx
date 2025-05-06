import React from "react";
import { Link } from "react-router-dom";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
</style>;
const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-relaway font-bold text-blue-600">
          JobFinder
        </Link>

        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/admin" className="text-gray-700 hover:text-blue-600">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
