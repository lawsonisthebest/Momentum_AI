import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-indigo-100 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Momentum</h3>
            <p className="text-gray-600 text-sm">
              Your personal productivity companion. Track, achieve, and
              celebrate your goals.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  to="/tasks"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/wellness"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/documentation"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <i className="fas fa-envelope mr-2 text-indigo-500"></i>
                support@momentum.com
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fas fa-phone mr-2 text-indigo-500"></i>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-gray-600">
                <i className="fas fa-map-marker-alt mr-2 text-indigo-500"></i>
                123 Productivity St, Suite 100
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Momentum. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
