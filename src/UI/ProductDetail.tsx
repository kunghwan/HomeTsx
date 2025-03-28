import { useParams } from "react-router-dom";
import { products } from "../imgSave/Rimg"; // 상품 목록 데이터
import { pricfy } from "../utils/pricfy";

const ProductDetail = () => {
  const { pid } = useParams<{ pid: string }>();

  const product = products.find((product) => product.id === pid);

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const { name, desc, price, imgs, quan } = product;

  return (
    <div className="p-4">
      <div className="border rounded p-4">
        <img
          src={imgs[0]}
          alt={name}
          className="object-cover rounded aspect-square w-full"
        />
        <h1 className="text-2xl font-bold">{name}</h1>
        <p>{desc}</p>
        <p>₩ {pricfy(price)}</p>
        <p>{quan}개 남았습니다</p>
      </div>
    </div>
  );
};

export default ProductDetail;
