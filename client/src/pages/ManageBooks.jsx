import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Edit2, Trash2, BookOpen, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Edit Modal State
  const [editingBook, setEditingBook] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/books/user/collection', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book? This action cannot be undone.')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(books.filter(b => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete book');
    }
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setEditFormData(book);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5001/api/books/${editingBook._id}`, editFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(books.map(b => b._id === editingBook._id ? res.data : b));
      setEditingBook(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update book');
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 shadow-xl mb-4">
            <Settings className="w-8 h-8 text-primary-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Manage Your Library</h1>
          <p className="mt-2 text-slate-400">Update or remove books you have contributed</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-12 h-12 text-primary-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center p-8 glass-card border-red-500/20 text-red-400 rounded-2xl">{error}</div>
        ) : books.length === 0 ? (
          <div className="text-center py-20 px-4 glass-card rounded-3xl text-slate-400">You haven't added any books to manage.</div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-card rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/50 text-xs uppercase text-slate-300">
                  <tr>
                    <th className="px-6 py-4 font-bold border-b border-slate-700/50">Book</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-700/50">Category</th>
                    <th className="px-6 py-4 font-bold border-b border-slate-700/50 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book._id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover rounded-md shadow-md" />
                          <div>
                            <div className="font-bold text-white text-base mb-0.5">{book.title}</div>
                            <div className="text-slate-400 text-xs">by {book.author}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-semibold text-primary-400 border border-slate-700">
                          {book.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => openEditModal(book)}
                            className="p-2 text-slate-400 hover:text-primary-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Edit Book"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(book._id)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Delete Book"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Edit Modal Overlay */}
      <AnimatePresence>
        {editingBook && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Edit Book</h2>
              <form onSubmit={handleEditSubmit} className="space-y-4 text-slate-300">
                <div>
                  <label className="block text-sm font-bold mb-1">Title</label>
                  <input type="text" name="title" value={editFormData.title} onChange={handleEditChange} required className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Author</label>
                  <input type="text" name="author" value={editFormData.author} onChange={handleEditChange} required className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Category</label>
                  <input type="text" name="category" value={editFormData.category} onChange={handleEditChange} required className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Cover Image</label>
                  <input type="url" name="coverImage" value={editFormData.coverImage} onChange={handleEditChange} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Description</label>
                  <textarea name="description" value={editFormData.description} onChange={handleEditChange} required rows="3" className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 resize-none"></textarea>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setEditingBook(null)} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors">Cancel</button>
                  <button type="submit" disabled={editLoading} className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center">
                    {editLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageBooks;
