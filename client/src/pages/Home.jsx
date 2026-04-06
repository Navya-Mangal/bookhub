import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { Loader2, Search, BookOpen, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const url = activeCategory === 'All' 
          ? 'http://localhost:5001/api/books' 
          : `http://localhost:5001/api/books/category/${activeCategory}`;
        const res = await axios.get(url);
        setBooks(res.data);
        
        if (activeCategory === 'All' && categories.length === 1) {
          const uniqueCategories = ['All', ...new Set(res.data.map(b => b.category))];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        setError('Failed to fetch books. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchBooks();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-sm border border-primary-500/20 shadow-sm mb-8 text-primary-400 font-semibold text-sm">
              <Star className="w-4 h-4 fill-primary-400 text-primary-400" />
              <span className="text-slate-200">The #1 Choice for Book Enthusiasts</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              {user ? (
                <>Welcome, <span className="text-gradient">{user.name}</span>! <br className="hidden sm:block" /> Ready for a</>
              ) : (
                <>Discover Your Next <br className="hidden sm:block" /></>
              )}{" "}
              <span className="text-gradient">Great Read</span>{user ? "?" : " Today"}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-medium">
              Explore thousands of books across different categories. Find your favorites, read detailed descriptions, and join our vibrant community of readers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} className="px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg shadow-lg hover:shadow-primary-500/30 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center">
                <BookOpen className="w-5 h-5" /> Start Exploring
              </button>
              <button 
                onClick={() => {
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                  if (categories.includes('Fiction')) setActiveCategory('Fiction');
                }}
                className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-lg border border-slate-700 shadow-sm transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <TrendingUp className="w-5 h-5 text-primary-400" /> View Trending
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                  : 'glass-card text-slate-300 hover:text-primary-400 hover:border-primary-500/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Loading/Error/Content */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32">
            <Loader2 className="w-12 h-12 text-primary-400 animate-spin mb-4" />
            <p className="text-slate-400 font-medium">Curating your library...</p>
          </div>
        ) : error ? (
          <div className="glass-card text-red-400 p-8 rounded-2xl text-center max-w-lg mx-auto border-red-900/50 shadow-red-500/10">
            <p className="font-semibold">{error}</p>
          </div>
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

        {!loading && !error && books.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 glass-card rounded-3xl"
          >
            <div className="bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No books found</h3>
            <p className="text-slate-400">Try selecting a different category to see more books.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
