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
    <div className=" ">
      <img
        src={imgs[0]}
        alt={name}
        className="object-cover rounded aspect-square w-full"
      />
      <div className="p-4 flex flex-col gap-y-1">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p>{desc}</p>
        <p>₩ {pricfy(price)}</p>
        <p>{quan}개 남았습니다</p>

        <button className="rounded-3xl p-2 text-sm  w-30">
          장바구니에 담기
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
