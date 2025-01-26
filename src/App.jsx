import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import NotFound from "./components/NotFound";
import AddBook from "./components/AddBook";
import Navbar from "./components/Navbar";
import ReadBook from "./components/ReadBook";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Navbar />
      <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/add-book/:id" element={<AddBook />} />
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/read-book" element={<ReadBook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  );
}

export default App;
