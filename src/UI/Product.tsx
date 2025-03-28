import { products } from "../imgSave/Rimg";
import ProductItem from "./ProductItem";

const Product = () => {
  return (
    <div className=" p-4 ">
      <ul className="grid-cols-2 grid gap-x-2.5 gap-y-2 lg:grid-cols-4 sm:grid-cols-3">
        {products.map((product) => {
          return <ProductItem {...product} key={product.id} />;
        })}
      </ul>
    </div>
  );
};

export default Product;
