import { ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../context/CartContext";
import CartSidebar from "../pages/Cart";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Products", "Services", "About"];
  const [isCartOpen, setIsCartOpen] = useState(false);

  const context = useContext(cartContext);
  if (!context) {
    throw new Error("Navbar must be used inside CartProvider");
  }

  const totalItems = context.state.cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      <style>
        {`
                      @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                      *{
                          font-family: "Geist", sans-serif;
                      }
                  `}
      </style>
      <nav className="bg-white px-6 md:px-12 lg:px-24 xl:px-40 py-4 flex items-center justify-between relative">
        {/* logo */}
        <div className="logo text-orange-400 font-bold text-2xl">
          <Link to={"/"}>
            <h2>Boda Store</h2>
          </Link>
        </div>

        <div className="hidden m-auto md:flex sticky items-center bg-zinc-50 border border-zinc-200 rounded-full px-1 py-1 gap-2">
          {navItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${item === "Products" ? "bg-white border border-zinc-200 font-medium text-zinc-800 hover:text-zinc-600" : "text-zinc-500 hover:text-zinc-400"}`}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {/* cart trigger */}
          <button
            onClick={() => {
              setMenuOpen(false);
              setIsCartOpen(true);
            }}
            aria-label={`Open cart, ${totalItems} items`}
            className="relative cursor-pointer rounded-full border-0 bg-transparent p-2 text-zinc-800 transition-colors hover:bg-zinc-100"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-400 px-1 text-[11px] font-bold text-gray-900">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1"
          >
            <span
              className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-zinc-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-zinc-200 flex flex-col p-5 gap-1 md:hidden z-50">
            {navItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className={`px-4 py-2.5 rounded-lg text-sm ${item === "Products" ? "bg-zinc-50 font-medium text-zinc-800" : "text-zinc-500 hover:bg-zinc-50"}`}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      ></CartSidebar>
    </>
  );
}
