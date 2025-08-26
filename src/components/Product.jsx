import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PAGE_SIZE = 10;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          "https://dummyjson.com/products?limit=500"
        );

        if (!response.ok)
          throw new Error(`Error: ${response.status} ${response.statusText}`);

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  console.log(start, end);

  const handlePagination = (n) => {
    setCurrentPage(n);
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;
  return (
    <div className="main">
      <div className="pagination-container">
        {[...Array(totalPages).keys()].map((n) => (
          <span
            key={n}
            className={`pagination ${n == currentPage ? "activePage" : ""}`}
            onClick={() => handlePagination(n)}
          >
            {n}
          </span>
        ))}
      </div>
      <div className="product-container">
        {products.slice(start, end).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Product;
