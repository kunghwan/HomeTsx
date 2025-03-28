export function pricfy(price: string | number, withDecimal?: boolean): string {
  const copy = price.toString();
  if (!copy) {
    return "숫자를 입력해 주세요";
  }

  const regax = /^[0-9]+$/;
  const split = copy.split(".");

  if (!regax.test(split[0])) {
    return "숫자가 아님";
  }

  const first = Number(split[0]).toLocaleString();

  if (!withDecimal) {
    return first;
  }

  return first + "" + split[1];
}
