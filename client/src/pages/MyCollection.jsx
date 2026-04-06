import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { Loader2, Library, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MyCollection = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCollection = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/books/user/collection', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(res.data);
      } catch (err) {
        setError('Failed to fetch your collection.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyCollection();
  }, []);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-sm border border-primary-500/20 shadow-sm mb-4 text-primary-400 font-semibold text-sm">
              <Library className="w-4 h-4" />
              <span>Personal Library</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              My <span className="text-gradient">Collection</span>
            </h1>
            <p className="mt-4 text-slate-400 text-lg">Books you have personally added to the platform.</p>
          </div>
          
          <Link to="/add-book" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/20 transform hover:-translate-y-1">
            <PlusCircle className="w-5 h-5" />
            Add New Book
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-32">
            <Loader2 className="w-12 h-12 text-primary-400 animate-spin mb-4" />
            <p className="text-slate-400 font-medium">Loading your books...</p>
          </div>
        ) : error ? (
          <div className="glass-card text-red-400 p-8 rounded-2xl text-center max-w-lg mx-auto border-red-900/50 shadow-red-500/10">
            <p className="font-semibold">{error}</p>
          </div>
        ) : books.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-4 glass-card rounded-3xl"
          >
            <div className="bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Library className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Your collection is empty</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-8">You haven't added any books to the platform yet. Click the button below to start building your personal library.</p>
            <Link to="/add-book" className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-all">
              <PlusCircle className="w-5 h-5" />
              Add Your First Book
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyCollection;
