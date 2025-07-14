import { useEffect, useRef, useState } from "react";
import ProductCard from "./components/ProductCard";
import LanguageSelector from "./MainComponents/LanguageSelector";
import CarouselWithLogo from "./MainComponents/CarouselWithLogo";
import { ArrowLeft, ArrowDown, Home } from "lucide-react";
import { getDisplayName } from "./MainComponents/utils";
import { Instagram, Phone, MapPin } from "lucide-react"; // Add this to your imports

const CATEGORIES = [
  {
    key: "desserts",
    label: { he: "קינוחים", en: "Desserts" },
    image: "/images/desserts.jpg",
  },
  {
    key: "crepe",
    label: { he: "קרפ", en: "Crepe" },
    image: "/images/crepe.jpg",
  },
  {
    key: "pancake",
    label: { he: "פנקייק", en: "Pancake" },
    image: "/images/pancake.jpg",
  },
  {
    key: "fashafesh",
    label: { he: "פשפיש", en: "Fashafesh" },
    image: "/images/fashafesh.jpg",
  },
  {
    key: "hotDrinks",
    label: { he: "שתיה חמה", en: "Hot Drinks" },
    image: "/images/hotdrinks.jpg",
  },
  {
    key: "coldDrinks",
    label: { he: "שתיה קרה", en: "Cold Drinks" },
    image: "/images/coldDrinks.jpg",
  },
];

function App() {
  const [products, setProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [language, setLanguage] = useState("en");
  const [hasScrolledToCategories, setHasScrolledToCategories] = useState(false);

  const rtl = language === "he";

  const categoriesRef = useRef(null);
  const topRef = useRef(null);
  const stickyHeaderRef = useRef(null);

  const [stickyHeight, setStickyHeight] = useState(0);

  // Fetch products once on mount
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  // Intersection Observer for showing/hiding mobile Home button
  useEffect(() => {
    if (!topRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasScrolledToCategories(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(topRef.current);
    return () => observer.disconnect();
  }, []);

  // Update sticky header height on mount and resize
  useEffect(() => {
    function updateHeight() {
      if (stickyHeaderRef.current) {
        // Add 10px extra padding for spacing below sticky header
        setStickyHeight(stickyHeaderRef.current.offsetHeight * 2);
      }
    }

    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  if (!Object.keys(products).length) {
    return (
      <div className="text-center mt-10 text-xl text-white">Loading...</div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-black text-white flex flex-col items-center ${
        rtl ? "rtl text-right" : "text-left"
      }`}
    >
      {/* FULL SCREEN CAROUSEL */}
      {selectedCategory === null && (
        <section
          ref={topRef}
          className="relative w-full h-screen flex flex-col items-center justify-center"
        >
          <div className="absolute top-0 right-0 p-4 z-50">
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </div>

          <CarouselWithLogo key={language} language={language} />

          {/* Scroll Down Arrow */}
          <button
            onClick={() => {
              if (categoriesRef.current) {
                const y =
                  categoriesRef.current.getBoundingClientRect().top +
                  window.scrollY;
                window.scrollTo({ top: y, behavior: "smooth" });
                setHasScrolledToCategories(true);
              }
            }}
            className="absolute bottom-4 z-50 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200 transition animate-bounce"
          >
            <ArrowDown size={28} />
          </button>
        </section>
      )}
      {/* STICKY HEADER */}
      <div
        ref={stickyHeaderRef}
        className="sticky top-0 z-50 flex justify-center py-4 shadow-md border-b border-gray-700 w-full max-w-6xl mx-auto bg-black mb-6"
      >
        <img
          src="/images/white-logo.png"
          alt="Logo"
          className="h-40 md:h-56 object-contain drop-shadow-xl"
        />
      </div>
      {/* 
        FIX: Remove spacer div as we'll use padding on the categories section instead.
        {/* {selectedCategory === null && <div style={{ height: stickyHeight }} />} */}

      {/* CATEGORY SELECTOR */}
      <section
        ref={categoriesRef}
        className="w-full bg-black "
        // FIX: Add dynamic paddingTop equal to sticky header height to avoid content hidden under sticky header
      >
        {selectedCategory === null ? (
          <div
            style={{ paddingTop: stickyHeight }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-6 mx-auto justify-items-center  "
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className="relative cursor-pointer rounded-2xl shadow-lg w-full max-w-xs overflow-hidden hover:scale-105 transition-transform"
              >
                <img
                  src={cat.image}
                  alt={cat.label[language]}
                  className="w-full h-40 object-cover"
                />
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-white text-xl font-bold text-center rounded-b-2xl">
                  {cat.label[language]}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="w-full max-w-6xl px-6 mx-auto "
            style={{ paddingTop: stickyHeight }}
          >
            <button
              onClick={() => {
                setSelectedCategory(null);
                setTimeout(() => {
                  if (categoriesRef.current) {
                    categoriesRef.current.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }, 50);
              }}
              className="mb-6 flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-300"
            >
              <ArrowLeft />
              {rtl ? "חזרה" : "Back"}
            </button>

            {selectedCategory && (
              <h1 className="text-3xl font-bold text-center text-white mb-6">
                {getDisplayName(selectedCategory, language)}
              </h1>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {products[selectedCategory]?.map((item, idx) => (
                <ProductCard key={idx} item={item} language={language} />
              ))}
            </div>
          </div>
        )}
      </section>
      {/* MOBILE HOME BUTTON */}
      {hasScrolledToCategories && (
        <button
          onClick={() => {
            setSelectedCategory(null);
            setHasScrolledToCategories(false);
            setTimeout(() => {
              if (topRef.current) {
                topRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }, 50);
          }}
          className="fixed bottom-4 left-4 z-50 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 transition sm:hidden"
        >
          <Home size={24} />
        </button>
      )}
      <footer className="w-full bg-black border-t border-gray-800 mt-16 py-6 text-center text-sm text-gray-400">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p dir="ltr" className="text-center w-full">
            © {new Date().getFullYear()}{" "}
            <a
              href="https://rami-amasha.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-gray-300 transition"
            >
              Rami Amasha
            </a>
            . All rights reserved.
          </p>
        </div>

        {/* Contact & Social Section */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-6 text-white text-base">
          {/* Instagram */}
          <a
            href="https://instagram.com/YOUR_INSTAGRAM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-pink-500 transition"
          >
            <Instagram size={20} />
            Instagram
          </a>

          {/* Phone */}
          <a
            dir="ltr"
            href="tel:+972501234567"
            className="flex items-center gap-2 hover:text-green-400 transition"
          >
            <Phone size={20} />
            +972-50-123-4567
          </a>

          {/* Waze */}
          <a
            href="https://waze.com/ul?ll=32.123456,35.123456&navigate=yes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <MapPin size={20} />
            Waze Location
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
