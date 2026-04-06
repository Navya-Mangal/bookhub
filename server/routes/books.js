import express from 'express';
import Book from '../models/Book.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get books by category
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const books = await Book.find({ category: new RegExp(`^${category}$`, 'i') });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new book
router.post('/', auth, async (req, res) => {
  try {
    const { title, author, category, description, coverImage } = req.body;
    
    if (!title || !author || !category || !description) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newBook = new Book({
      title,
      author,
      category,
      description,
      coverImage: coverImage || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600",
      addedBy: req.user
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get books added by the logged-in user
router.get('/user/collection', auth, async (req, res) => {
  try {
    const books = await Book.find({ addedBy: req.user }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update a book
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    if (book.addedBy && book.addedBy.toString() !== req.user) {
      return res.status(403).json({ message: 'Not authorized to update this book' });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a book
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    
    if (book.addedBy && book.addedBy.toString() !== req.user) {
      return res.status(403).json({ message: 'Not authorized to delete this book' });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Seed books (for demo/development)
router.post('/seed', async (req, res) => {
  try {
    const dummyBooks = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        description: "A novel about the American dream and the roaring twenties.",
        coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600"
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "Non-Fiction",
        description: "A brief history of humankind.",
        coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600"
      },
      {
        title: "Dune",
        author: "Frank Herbert",
        category: "Science Fiction",
        description: "A masterwork of science fiction set on the desert planet Arrakis.",
        coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600"
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        description: "An easy and proven way to build good habits and break bad ones.",
        coverImage: "https://images.unsplash.com/photo-1589998059171-989d887df446?auto=format&fit=crop&q=80&w=600"
      },
      {
        title: "1984",
        author: "George Orwell",
        category: "Fiction",
        description: "A dystopian social science fiction novel and cautionary tale.",
        coverImage: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=600"
      },
      {
        title: "The Martian",
        author: "Andy Weir",
        category: "Science Fiction",
        description: "An astronaut is stranded on Mars and must find a way to survive.",
        coverImage: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=600"
      }
    ];

    await Book.deleteMany({});
    const createdBooks = await Book.insertMany(dummyBooks);
    
    res.status(201).json({ message: "Database seeded successfully", count: createdBooks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
