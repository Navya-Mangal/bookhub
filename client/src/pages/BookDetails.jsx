import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowLeft, Book, User, Bookmark, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setError('Failed to fetch book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary-400 animate-spin" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-red-400 mb-4 bg-red-900/30 px-6 py-3 rounded-xl border border-red-500/20">{error || 'Book not found'}</p>
        <Link to="/" className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-2 font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen py-12 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 font-bold transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3 bg-slate-900 relative">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-full object-cover min-h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="p-8 md:p-12 md:w-2/3">
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-slate-800 border border-slate-700 text-primary-400 rounded-full text-sm font-bold mb-6 shadow-sm">
                {book.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                {book.title}
              </h1>
              
              <div className="flex items-center gap-4 text-slate-400 mb-8 pb-8 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-slate-500" />
                  <span className="font-bold text-slate-300">{book.author}</span>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Book className="w-5 h-5 text-primary-500" />
                  Synopsis
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {book.description}
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setIsReading(true)}
                  className="flex-1 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 flex items-center justify-center gap-3 transform hover:-translate-y-1"
                >
                  <Book className="w-5 h-5" />
                  Start Reading
                </button>
                <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 p-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-sm">
                  <Bookmark className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reading Overlay Modal */}
      <AnimatePresence>
        {isReading && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-3xl flex flex-col pt-20 px-4 sm:px-8 pb-12 overflow-y-auto"
          >
            <button 
              onClick={() => setIsReading(false)} 
              className="fixed top-6 right-6 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 p-3 rounded-full transition-colors z-50 shadow-lg border border-slate-700"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-3xl mx-auto w-full text-slate-300 text-lg leading-loose space-y-8 mt-8">
              <h2 className="text-4xl text-white font-extrabold mb-12 text-center border-b border-slate-800 pb-8 tracking-tight">
                {book.title} <span className="text-primary-500 opacity-70">| Chapter 1</span>
              </h2>
              <p className="first-letter:text-7xl first-letter:font-bold first-letter:text-primary-400 first-letter:mr-3 first-letter:float-left">
                The cold void of space stretched endlessly before the viewport, a velvet curtain punctuated by the diamond-hard glare of distant stars. It was exactly as they described it in the simulations, yet fundamentally different. The silence here wasn't an absence of noise, but a presence of nothingness that pressed against the hull of the ship.
              </p>
              <p>
                He checked the diagnostic displays for the third time this hour. Everything was nominal. Life support, optimal. Thrusters, ready. Navigation, locked on a trajectory that wouldn't change for another eighteen months. The sheer scale of the journey was impossible to fully internalize, so he focused on the immediate. The subtle hum of the atmospheric recyclers. The faint blue glow of the console reflecting off the reinforced glass. 
              </p>
              <p>
                "Log entry," he murmured, his voice sounding entirely too loud in the confined space of the command module. The system chimed softly in response, a comforting electronic bleat. "Day 42. Still no anomalies detected. The crew remains in deep stasis. It's just me and the ghosts of a thousand engineers whispering over the comms channel." He paused, looking out into the abyss. "Sometimes I wonder if any of us truly understood what we were volunteering for."
              </p>
              <div className="flex justify-center pt-16 pb-8">
                <button className="px-8 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-semibold shadow-sm">
                  Next Chapter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookDetails;
