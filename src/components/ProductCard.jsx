const ProductCard = ({ product }) => {
  return (
    <div className="product">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
    </div>
  );
};

export default ProductCard;
