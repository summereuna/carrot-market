export default async function fileUploader(file: File, presetName: string) {
  //환경변수는 브라우저에 표시되지 않으므로 node환경에서만 사용 가능
  //따라서 지금은 브라우저에 변수 노출시켜야 하기 때문에 NEXT_PUBLIC_ 붙여야 함
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", `${presetName}`);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`이미지 업로드에 실패했습니다: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const imageUrl = data.url;
    return imageUrl;
  } catch (error) {
    console.error("이미지 업로드에 실패했습니다", error);
  }
}
