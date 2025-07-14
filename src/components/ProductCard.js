export default function ProductCard({ item, language }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden max-w-xs cursor-pointer transform hover:scale-105  transition-transform duration-300 border ">
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        <img
          src={item.image}
          alt={language === "en" ? item.name.en : item.name.he}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay to help text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none rounded-t-xl" />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-white drop-shadow-md truncate">
          {language === "en" ? item.name.en : item.name.he}
        </h3>
      </div>
    </div>
  );
}
