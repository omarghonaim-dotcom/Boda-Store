import { data } from "../data";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { useContext } from "react";
import { cartContext } from "../context/CartContext";

const categories = [...new Set(data.map((p) => p.category))];

export default function CategorySections() {
    const context = useContext(cartContext);
    if (!context) {
      throw new Error("Products must be used inside CartProvider");
    }
  
    const { dispatch } = context;
  return (
    <ScrollReveal>
      <div className="bg-gray-50 min-h-screen py-10">
        {categories.map((category) => {
          const products = data.filter((p) => p.category === category);
          return (
            <section key={category} className="px-4 mb-20">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 capitalize border-b border-gray-200 pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <div>
                      <Link
                      key={product.id}
                      to={`/productdetails/${product.id}`}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="aspect-square bg-gray-50 p-6 overflow-hidden">
                        <img
                          src={product.imgsrc}
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
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
                     <div >
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
                    </div>
                    
                    
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </ScrollReveal>
  );
}
