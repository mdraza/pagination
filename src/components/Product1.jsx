import { useState } from "react";
import ProductCard1 from "./ProductCard1";
import Pagination from "./Pagination";
import { PAGE_SIZE, API_URL } from "../constants";
import { useFetch } from "../hooks/useFetch";

const Product1 = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, error, refetch } = useFetch(API_URL);

  const totalProducts = data?.products?.length || 0;
  const noOfPages =
    totalProducts > 0 ? Math.ceil(totalProducts / PAGE_SIZE) : 0;

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="main">
      <button onClick={refetch}>Refresh</button>
      <div className="product-container">
        {totalProducts > 0 ? (
          data?.products
            ?.slice(start, end)
            .map((product) => (
              <ProductCard1 key={product.id} product={product} />
            ))
        ) : (
          <p>No Products</p>
        )}
      </div>

      {noOfPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          noOfPages={noOfPages}
        />
      )}
    </div>
  );
};

export default Product1;
