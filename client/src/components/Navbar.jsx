import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, User, PlusCircle, Library, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-card sticky top-0 z-50 border-b-0 border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-primary-600 to-pink-500 p-2 rounded-xl shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Book<span className="text-primary-400">Hub</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-slate-300 hover:text-primary-400 font-bold transition-colors">Home</Link>
            <Link to="/contact" className="text-slate-300 hover:text-primary-400 font-bold transition-colors">Contact</Link>
            
            {user ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-700">
                <Link to="/my-collection" className="flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-white transition-colors">
                  <Library className="w-4 h-4 text-primary-400" />
                  My Collection
                </Link>
                <Link to="/manage" className="flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-white transition-colors">
                  <Settings className="w-4 h-4 text-primary-400" />
                  Manage
                </Link>
                <Link to="/add-book" className="flex items-center gap-1.5 text-sm font-bold text-primary-400 hover:text-primary-300 bg-slate-800/50 hover:bg-slate-800 px-3 py-2 rounded-xl transition-all duration-300 border border-transparent hover:border-primary-500/30">
                  <PlusCircle className="w-4 h-4" />
                  Add Book
                </Link>
                <span className="flex items-center gap-2 text-sm font-bold text-slate-200 bg-slate-800 shadow-sm border border-slate-700 px-4 py-2 rounded-full">
                  <User className="w-4 h-4 text-primary-400" />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-900/30 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/20 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
                <Link to="/login" className="text-slate-200 hover:text-primary-400 px-4 py-2 font-bold transition-colors">Login</Link>
                <Link to="/signup" className="bg-primary-600 text-white hover:bg-primary-500 px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transform hover:-translate-y-0.5 transition-all duration-300">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
