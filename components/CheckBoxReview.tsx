import { ReviewWithUser, ReviewsResponse } from "./Reviews";

export default function CheckBoxReview({ reviews }: ReviewsResponse) {
  function convertReviews(reviewsArrayData: ReviewWithUser[]) {
    //받은 리뷰 하나의 배열로 변환해 넣기
    const reviewsArray = reviewsArrayData.map(
      (review) => review.reviewCheckBoxes
    );

    //문자열을 배열로 변환해 합치기
    const flatReviewsArray = reviewsArray?.flatMap((review) =>
      JSON.parse(review)
    );

    //각 요소 개수 세기
    const countReviews = flatReviewsArray?.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(countReviews);
  }

  return (
    <>
      {reviews &&
        convertReviews(reviews).map(([key, value]) => (
          <div key={key}>
            <div className="flex flex-col">
              <div className="px-4 py-3 flex items-start">
                <div className="flex items-center justify-center space-x-1 text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                  <span>{value as number}</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 bg-gray-200 py-2 px-3 rounded-b-xl rounded-r-xl">
                  {key}
                </span>
              </div>
            </div>
          </div>
        ))}
      {reviews?.length === 0 && (
        <div className="px-4 py-3 flex items-start">
          <span className="text-sm font-medium text-gray-700">
            받은 매너 평가가 없습니다.
          </span>
        </div>
      )}
    </>
  );
}
