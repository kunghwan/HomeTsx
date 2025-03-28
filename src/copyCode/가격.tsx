export default function pricfy(
  price: number | string, // price: 숫자(number) 또는 문자열(string) 타입을 받을 수 있습니다. (변환하려는 금액)
  withDecimal: boolean = false // withDecimal: 소수점 부분을 포함할지 여부를 결정하는 선택적인 boolean 값입니다. 기본값은 false입니다.
): string {
  // 이 함수는 문자열(string)을 반환합니다.

  // 1. price를 문자열로 변환
  const copy = price.toString(); // price를 문자열로 변환합니다. (price가 number일 경우 string으로 변환)

  // 2. price가 비어있을 경우 처리
  if (!copy) {
    // 만약 price가 비어있으면 (null, undefined, 빈 문자열 등)
    return "아무것도 입력되지 않았습니다."; // 비어있다면 "아무것도 입력되지 않았습니다."라는 메시지를 반환합니다.
  }

  // 3. price가 숫자인지 검증
  const regex = /^[0-9]+$/; // 숫자만 포함된 문자열을 검증하기 위한 정규 표현식입니다.
  const split = copy.split("."); // price를 "." 기준으로 나눕니다. 예: "1234.56" -> ["1234", "56"]

  // 4. 숫자 확인 (정규 표현식을 사용하여 첫 번째 부분이 숫자인지 확인)
  if (!regex.test(split[0])) {
    // 만약 split[0] (정수 부분)이 숫자가 아니라면
    return "숫자가 아닙니다."; // "숫자가 아닙니다."라는 메시지를 반환합니다.
  }

  // 5. 정수 부분 포맷팅 (천 단위 구분 기호 추가)
  const first = Number(split[0]).toLocaleString(); // 정수 부분을 천 단위로 구분하여 문자열로 변환합니다. 예: 1234 -> "1,234"

  // 6. 소수점 처리 여부에 따른 반환 값
  if (!withDecimal) {
    // 만약 withDecimal이 false일 경우 (소수점 포함을 원하지 않으면)
    return first; // 정수 부분만 반환합니다. 예: "1,234"
  }

  // 7. 소수점 부분이 있을 경우 소수점 이하도 처리
  return first + "." + split[1]; // 소수점 이하 부분을 추가하여 반환합니다. 예: "1,234.56"
}
