import { products } from "../imgSave/Rimg";
import ProductItem from "./ProductItem";

const Product = () => {
  return (
    <div>
      <ul>
        {products.map((product) => {
          return <ProductItem {...product} key={product.id} />;
        })}
      </ul>
    </div>
  );
};

export default Product;
