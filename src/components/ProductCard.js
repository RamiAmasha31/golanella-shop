export default function ProductCard({ item, language }) {
  return (
    <div className="relative cursor-pointer rounded-2xl shadow-lg w-full max-w-xs overflow-hidden hover:scale-105 transition-transform">
      {/* Image */}
      <img
        src={item.image}
        alt={language === "en" ? item.name.en : item.name.he}
        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        loading="lazy"
      />

      {/* Text overlay - same style as category card */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-white text-xl font-bold text-center rounded-b-2xl">
        {language === "en" ? item.name.en : item.name.he}
      </div>
    </div>
  );
}
