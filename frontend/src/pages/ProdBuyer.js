import ProductCard from "../components/ProductCard";

const BuyerProducts = () => {
  // Fetch all products (no farmer-only actions)
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} isFarmer={false} />
      ))}
    </div>
  );
};

export default BuyerProducts;