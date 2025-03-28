import { Link } from "react-router-dom";
import { pricfy } from "../utils/pricfy";

const ProductItem = ({ desc, imgs, name, price, quan, id }: ProductProps) => {
  return (
    <div className="border rounded flex gap-y-2.5">
      <li key={id} className="">
        <img src={imgs[0]} className="object-cover rounded aspect-square" />
        <div className="p-2 flex flex-col gap-y-2.5 ">
          <Link className="hover:text-sky-300" to={`/product/${id}/`}>
            <p className="text-xl font-bold">{name}</p>
            <p>{desc}</p>
          </Link>
          <p>₩ {pricfy(price)}</p>
          <p>{quan}개 남았습니다</p>
          <button className="rounded-3xl p-2 ">장바구니에 담기</button>
        </div>
      </li>
    </div>
  );
};

export default ProductItem;
