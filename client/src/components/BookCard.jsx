import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

const BookCard = ({ book }) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-primary-400 rounded-full shadow-lg border border-slate-700/50 transform group-hover:-translate-y-1 transition-transform">
          {book.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-20">
        <div className="flex items-center gap-1 mb-2 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
          <span className="text-xs text-slate-400 font-medium ml-1">(4.8)</span>
        </div>

        <h3 className="text-xl font-extrabold text-white mb-1 line-clamp-1 group-hover:text-primary-400 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-slate-400 mb-4 font-semibold">by <span className="text-slate-200">{book.author}</span></p>
        
        <p className="text-slate-300 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
          {book.description}
        </p>

        <Link 
          to={`/books/${book._id}`} 
          className="relative overflow-hidden inline-flex items-center justify-between w-full bg-slate-800 border border-slate-700 hover:bg-primary-600 text-slate-200 hover:text-white px-5 py-3 rounded-xl font-bold transition-all duration-300 group/btn"
        >
          <span className="relative z-10">View Details</span>
          <ArrowRight className="w-4 h-4 relative z-10 transform group-hover/btn:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BookCard;
