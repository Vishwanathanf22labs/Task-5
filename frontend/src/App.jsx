
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";






import { AuthProvider } from '../src/context/AuthContext';
import Header from '../src/components/Common/Header';
import Footer from '../src/components/Common/Footer';
import Home from '../src/pages/Home';
import Dashboard from '../src/pages/Dashboard';
import BlogList from '../src/components/Blog/BlogList';
import BlogPost from '../src/components/Blog/BlogPost';
import CreatePost from '../src/components/Blog/CreatPost';
import EditPost from '../src/components/Blog/EditPost';
import Login from '../src/components/Auth/Login';
import Register from '../src/components/Auth/Register';
import NotFound from '../src/pages/NotFound';
import ProtectedRoute1 from './services/ProtectedRoute1';
import ProtectedRoute2 from './services/ProtectedRoute2';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
         
          <Route path="/" element={<BlogList />} />
          <Route path="/posts/:id" element={<BlogPost />} />

         
          <Route element={<ProtectedRoute1 />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
          </Route>

        
          <Route element={<ProtectedRoute2 />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
