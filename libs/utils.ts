/** 클래스네임 가져와서 합쳐주는 함수
 * [1, 2, 3].join("") => "123"
 * [1, 2, 3].join("/") => "1/2/3"
 */
export function cls(...classname: string[]) {
  return classname.join(" ");
}
