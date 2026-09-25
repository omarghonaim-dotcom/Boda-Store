import "./App.css";
import Navbar from "./components/Navbar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Home from "./pages/Home";
import CartContext from "./context/CartContext";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import About from "./pages/About";

export default function App() {
  return (
    <CartContext>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Navbar />

          {/* Main page content */}
          <main className="relative z-0 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/productdetails/:id"
                element={<ProductDetails />}
              />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </CartContext>
  );
}