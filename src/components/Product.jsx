import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Pagination1 from "./Pagination1";
import { API_URL, PAGE_SIZE } from "../constants";

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

        const response = await fetch(API_URL);

        if (!response.ok)
          throw new Error(`Error: ${response.status} ${response.statusText}`);

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const totalProducts = products?.length || 0;
  const totalPages =
    totalProducts > 0 ? Math.ceil(totalProducts / PAGE_SIZE) : 0;

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  console.log(start, end);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <p>{error}</p>;
  return (
    <div className="main">
      {totalPages > 10 && (
        <Pagination1
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
      <div className="product-container">
        {totalProducts > 0 ? (
          products
            ?.slice(start, end)
            ?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <h2>No Products</h2>
        )}
      </div>
    </div>
  );
};

export default Product;
