import React from 'react';
import { BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <BookOpen className="h-6 w-6 text-primary-600" />
          <span className="font-bold text-lg text-gray-900">BookHub</span>
        </div>
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} BookHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
