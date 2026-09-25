import { Link } from "react-router-dom";
import Carousel from "./Carousel";
export default function Shots() {
  return (
    <>
<Link to={"/products"}>
        {/* view all button */}

        <button className="flex items-center justify-center m-auto mt-10 gap-2 px-6 py-3 border border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          <span className="text-gray-700 text-base font-medium" dir="rtl">
            عرض الكل
          </span>
        </button>
      </Link>
      <div className="mt-20">
        <Carousel
          baseWidth={800}
          autoplay={true}
          autoplayDelay={2000}
          pauseOnHover={true}
          loop={true}
          round={false}
        />
      </div>
    </>
  );
}
