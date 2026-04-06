import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import AddBook from './pages/AddBook';
import MyCollection from './pages/MyCollection';
import ManageBooks from './pages/ManageBooks';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-book" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
          <Route path="/my-collection" element={<ProtectedRoute><MyCollection /></ProtectedRoute>} />
          <Route path="/manage" element={<ProtectedRoute><ManageBooks /></ProtectedRoute>} />
          {/* Example of protected route if needed later */}
          {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
