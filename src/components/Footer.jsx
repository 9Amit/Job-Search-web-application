import React from "react";
import "font-awesome/css/font-awesome.min.css";


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl font-semibold">JobFinder</h2>
          <p className="text-sm mt-2">© 2025 JobFinder. All rights reserved.</p>
        </div>

        <div className="flex space-x-6 mb-6 md:mb-0">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500"
          >
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-red-600"
          >
            <i className="fab fa-youtube text-xl"></i>
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600"
          >
            <i className="fab fa-facebook text-xl"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400"
          >
            <i className="fab fa-twitter text-xl"></i>
          </a>
        </div>

        <div className="flex space-x-6">
          <a href="/terms" className="text-sm text-gray-400 hover:text-white">
            Terms of Service
          </a>
          <a href="/privacy" className="text-sm text-gray-400 hover:text-white">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
