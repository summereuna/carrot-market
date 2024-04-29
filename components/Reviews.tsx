import { cls } from "@/libs/client/utils";
import { Review, User } from "@prisma/client";
import Image from "next/image";

export interface ReviewWithUser extends Review {
  createdBy: User;
}

export interface ReviewsResponse {
  reviews?: ReviewWithUser[];
}

export default function Reviews({ reviews }: ReviewsResponse) {
  return (
    <>
      {reviews &&
        reviews.map((review) => (
          <div key={review.id} className="py-3 px-4">
            <div className="flex items-center space-x-4">
              {review.createdBy.avatar ? (
                <Image
                  src={review.createdBy.avatar}
                  alt="avatar-preview"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full bg-slate-300 object-cover"
                  priority
                />
              ) : (
                <div className="w-10 h-10 bg-slate-300 rounded-full" />
              )}
              <div>
                <h4 className="text-sm font-bold text-gray-800">
                  {review.createdBy.name}
                </h4>
                {/*리뷰 별 갯수*/}
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={cls(
                        "h-5 w-5",
                        review.score >= star
                          ? "text-yellow-400"
                          : "text-gray-400"
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 text-gray-600 text-sm">
              <p>{review.review}</p>
            </div>
          </div>
        ))}
      {reviews?.length === 0 && (
        <div className="px-4 py-3 flex items-start">
          <span className="text-sm font-medium text-gray-700">
            받은 거래 후기가 없습니다.
          </span>
        </div>
      )}
    </>
  );
}
