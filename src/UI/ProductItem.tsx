const ProductItem = ({ desc, imgs, name, price, quan, id }: ProductProps) => {
  return (
    <div>
      <li key={id}>
        <img src={imgs[0]} />
        <p>{name}</p>
        <p>{desc}</p>
        <p>{price}</p>
        <p>{quan}</p>
      </li>
    </div>
  );
};

export default ProductItem;
