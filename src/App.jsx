import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import AddBlog from "./pages/AddBlog";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/blogpage/:blogid" element={<BlogPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <h1>Footer</h1>
    </>
  );
}

export default App;
