import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { cartContext } from "../context/CartContext";
import { data } from "../data";
import LoadingSkeleton from "../components/LoadingSkeleton";



export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const context = useContext(cartContext);
  const [selectedSize, setSelectedSize] = useState("30X40");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (!context) {
    throw new Error("ProductDetails must be used inside CartProvider");
  }

  const { dispatch } = context;
  const product = data.find((p) => p.id === Number(id));
  const relatedProducts = product
    ? data.filter((p) => p.category === product.category && p.id !== product.id)
    : [];

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/products" className="text-orange-500 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discount = Math.round(
    ((product.oldPrice - product.newPrice) / product.oldPrice) * 100
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="w-full max-w-md">
              <div className="bg-gray-100 rounded-3xl p-6 overflow-hidden">
                <img
                  src={product.imgsrc}
                  alt={product.name}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="px-4 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price Section */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {product.newPrice} ج.م
              </span>
              <span className="text-lg text-gray-400 line-through">
                {product.oldPrice} ج.م
              </span>
              <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm font-semibold">
                -{discount}%
              </span>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">size: {selectedSize}</p>
              <div className="flex gap-3">
                {["30X40"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-full border-2 transition-all duration-200 font-medium ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-3xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-yellow-300/60 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                    <span className="block text-2xl font-bold">00</span>
                    <span className="text-xs">أيام</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">:</span>
                  <div className="bg-yellow-300/60 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                    <span className="block text-2xl font-bold">09</span>
                    <span className="text-xs">ساعات</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">:</span>
                  <div className="bg-yellow-300/60 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                    <span className="block text-2xl font-bold">59</span>
                    <span className="text-xs">دقائق</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">:</span>
                  <div className="bg-yellow-300/60 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                    <span className="block text-2xl font-bold">40</span>
                    <span className="text-xs">ثواني</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white font-bold text-lg">
                  <span>ينتهي العرض في</span>
                  
                </div>
              </div>
            </div>

            {/* Viewers Count */}
            <div className="text-center mb-6">
              <p className="text-gray-700">
                يشاهد هذا المنتج الآن{" "}
                <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold">
                  349
                </span>{" "}
                عميل
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: product,
                  });
                }}
                className="flex-1 py-4 bg-orange-400 text-gray-900 font-bold rounded-full hover:bg-orange-500 transition-colors duration-200"
              >
                اضغط هنا للشراء
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            منتجات ذات صلة
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/productdetails/${item.id}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="aspect-square bg-gray-50 p-4 overflow-hidden">
                  <img
                    src={item.imgsrc}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      {item.newPrice} ج.م
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {item.oldPrice} ج.م
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
