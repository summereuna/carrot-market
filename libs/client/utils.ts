/** 클래스네임 가져와서 합쳐주는 함수
 * [1, 2, 3].join("") => "123"
 * [1, 2, 3].join("/") => "1/2/3"
 */
export function cls(...classname: string[]) {
  return classname.join(" ");
}

/** 숫자 세 자리 씩 표시하는 함수
 */
export function threeDigitDivision(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
