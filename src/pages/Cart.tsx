import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../context/CartContext";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("CartSidebar must be used inside CartProvider");
  }

  const { state, dispatch } = context;
  const { cart } = state;

  // close on Escape and freeze the page behind the sidebar while it is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.newPrice * item.quantity,
    0,
  );

  const savings = cart.reduce(
    (total, item) => total + (item.oldPrice - item.newPrice) * item.quantity,
    0,
  );

  return (
    <>
      {/* Backdrop — click anywhere outside to close */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* Sliding panel — stays mounted so it animates both in and out */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        inert={!isOpen}
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-zinc-900">Your Cart</h2>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart"
            className="cursor-pointer rounded-full p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
            <ShoppingCart className="h-10 w-10 text-zinc-300" />
            <p className="text-sm font-medium text-zinc-900">
              Your cart is empty
            </p>
            <p className="text-sm text-zinc-500">
              Add something you like and it will show up here.
            </p>
            <Link
              to="/products"
              onClick={onClose}
              className="mt-2 rounded-xl bg-orange-400 px-5 py-2.5 text-xs font-semibold tracking-wide text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex-1 divide-y divide-zinc-100 overflow-y-auto px-5">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 py-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50">
                  <img
                    src={item.imgsrc}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium text-zinc-900">
                        {item.name}
                      </h3>
                      <div className="mt-0.5 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-zinc-900">
                          ${item.newPrice}
                        </span>
                        <span className="text-xs text-zinc-400 line-through">
                          ${item.oldPrice}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item.id,
                        })
                      }
                      aria-label={`Remove ${item.name} from cart`}
                      className="cursor-pointer rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity stepper — dropping to 0 removes the item */}
                    <div className="flex items-center gap-1 rounded-full border border-zinc-200 p-0.5">
                      <button
                        onClick={() =>
                          dispatch({
                            type: "DECREASE_QUANTITY",
                            payload: item.id,
                          })
                        }
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="cursor-pointer rounded-full p-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>

                      <span className="min-w-6 text-center text-sm font-medium text-zinc-900">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch({
                            type: "INCREASE_QUANTITY",
                            payload: item.id,
                          })
                        }
                        aria-label={`Increase quantity of ${item.name}`}
                        className="cursor-pointer rounded-full p-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-zinc-900">
                      ${item.newPrice * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-200 px-5 py-4">
            {savings > 0 && (
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-zinc-500">You save</span>
                <span className="font-medium text-green-600">-${savings}</span>
              </div>
            )}

            <div className="flex items-baseline justify-between">
              <span className="text-sm text-zinc-500">Subtotal</span>
              <span className="text-lg font-bold text-zinc-900">
                ${subtotal}
              </span>
            </div>

            <button className="mt-4 w-full cursor-pointer rounded-xl bg-orange-400 py-3 text-xs font-semibold tracking-wide text-gray-900 transition-colors hover:bg-gray-900 hover:text-white">
              <a href="https://wa.me/201069647553?text=Hi!%20I%20saw%20your%20link%20%E2%80%94%20I'd%20like%20to%20know%20more.">
                Checkout
              </a>
            </button>

            <button
              onClick={onClose}
              className="mt-2 w-full cursor-pointer py-2 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
