import { useContext } from "react";
import ScrollReveal from "../components/ScrollReveal";
import { cartContext } from "../context/CartContext";
import { data } from "../data";
import { Link } from "react-router-dom";

export default function Products() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("Products must be used inside CartProvider");
  }

  const { dispatch } = context;
  return (
    <ScrollReveal>
      <div className="mt-10 flex justify-center items-center flex-col ">
        <h1 className="text-3xl">Products</h1>
        <p className="mt-2">All you want is here</p>
      </div>

      {/* cards */}

      <div className="bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 bg-gray-50 min-h-screen">
        {data.map((product) => (
          <div
            key={product.id}
            className="group lg:h-[600px] md:h-[420px] relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <Link to={`/productdetails/${product.id}`}>
              {/* Image Container */}
            <div className="aspect-square bg-gray-50 p-6 overflow-hidden">
              <img
                src={product.imgsrc}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {product.newPrice}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {product.oldPrice}
                </span>
              </div>

              
            </div>
            </Link>
            
            {/* Modern CTA Button */}
            <button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: product,
                });
              }}
              className="w-full py-2.5 text-xs font-semibold tracking-wide text-gray-900 bg-orange-400 rounded-xl hover:bg-gray-900 hover:text-white transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      </div>
    </ScrollReveal>
  );
}
