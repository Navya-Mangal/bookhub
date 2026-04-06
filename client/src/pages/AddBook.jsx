import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BookOpen, AlertCircle, Loader2, Link as LinkIcon, Edit3, Heading, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    coverImage: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const categories = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Self-Help', 'Fantasy', 'Biography', 'Mystery'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/api/books', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/my-collection');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-12 relative flex justify-center items-center">
      {/* Background Shapes */}
      <div className="fixed top-20 -left-20 w-96 h-96 bg-primary-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 z-0"></div>
      <div className="fixed bottom-20 -right-20 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl w-full mx-auto px-4 z-10"
      >
        <div className="glass-card rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 shadow-xl mb-6">
              <BookOpen className="w-8 h-8 text-primary-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Add a New Book</h2>
            <p className="mt-3 text-slate-400 font-medium">Contribute to the library collection</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 bg-red-900/30 border border-red-500/30 rounded-xl p-4 flex gap-3 items-start">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300 font-medium">{error}</p>
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 bg-green-900/30 border border-green-500/30 rounded-xl p-4 flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-300 font-medium">Book added successfully! Redirecting...</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <Heading className="w-4 h-4 text-primary-500" />
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder-slate-500"
                  placeholder="e.g. 1984"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-primary-500" />
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder-slate-500"
                  placeholder="e.g. George Orwell"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary-500" />
                Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all appearance-none"
              >
                <option value="" disabled className="text-slate-500">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-primary-500" />
                Cover Image URL <span className="text-slate-500 font-normal text-xs">(Optional)</span>
              </label>
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder-slate-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                Description
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder-slate-500 resize-none"
                placeholder="Write a brief synopsis..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-xl px-4 py-4 mt-4 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Adding Book...
                </>
              ) : (
                'Add Book to Library'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddBook;
