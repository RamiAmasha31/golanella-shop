import ProductCard from "./ProductCard";

export default function ProductGrid({ products, language }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
      {products.map((item, idx) => (
        <ProductCard key={idx} item={item} language={language} />
      ))}
    </div>
  );
}
