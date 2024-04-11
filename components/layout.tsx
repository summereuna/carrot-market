import Link from "next/link";
import { cls } from "../libs/client/utils";
import { useRouter } from "next/router";
import useUser from "@/libs/client/useUser";
import { useEffect, useState } from "react";
import EditDeleteModal from "./EditDeleteModal";
import DeleteModal from "./DeleteModal";
import useDelete from "@/libs/client/useDelete";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  canGoHome?: boolean;
  hasTabBar?: boolean;
  isMe?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  canGoHome,
  hasTabBar,
  isMe,
  children,
}: LayoutProps) {
  const router = useRouter();
  const onBackClick = () => {
    router.back();
  };
  const onGoHomeClick = () => {
    router.push(`/`);
  };

  //에딧모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEditModalHandler = () => {
    setIsModalOpen(true);
  };
  const closeEditModalHandler = () => {
    setIsModalOpen(false);
  };

  const editHandler = () => {
    router.push(
      `${router.pathname.replace("/[id]", "")}/edit/${router.query.id}`
    );
  };

  //딜리트모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModalHandler = () => {
    closeEditModalHandler();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false);
  };

  interface DeleteDataResult {
    ok: boolean;
  }

  const [removeData, { data }] = useDelete<DeleteDataResult>(
    `/api${router.asPath}`
  );
  const deleteHandler = () => {
    removeData({});
    closeDeleteModalHandler();
  };

  useEffect(() => {
    if (data?.ok) {
      //상품 업로드 끝나면 상품 상세 페이지로 이동
      router.pathname.includes("products")
        ? router.replace("/", undefined, {
            shallow: true,
          })
        : router.replace(`${router.pathname.replace("/[id]", "")}`, undefined, {
            shallow: true,
          });
    }
  }, [data, router]);

  return (
    <div>
      {/*네비게이션 바
      모바일 사이즈로 일단 작업하기 위해 max-w-xl 줘서 fixed된 바 크기 조정*/}
      <div className="fixed max-w-xl top-0 flex items-center px-5 bg-white w-full text-lg font-medium text-gray-800 py-3 border-b justify-center h-12 z-20">
        {isModalOpen && (
          <EditDeleteModal
            onClose={closeEditModalHandler}
            onEdit={editHandler}
            onDelete={openDeleteModalHandler}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            onClose={closeDeleteModalHandler}
            onDelete={deleteHandler}
          />
        )}
        {canGoBack ? (
          <button
            aria-label="Go To Back Button"
            onClick={onBackClick}
            className="absolute left-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        ) : null}
        {canGoHome ? (
          <button
            aria-label="Go To Home Button"
            onClick={onGoHomeClick}
            className="absolute left-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        ) : null}
        {title ? (
          <span className={cls(canGoBack ? "mx-auto" : "", "")}>{title}</span>
        ) : null}
        {router.query.id && isMe ? (
          <>
            <button
              aria-label="post edit or delete button"
              onClick={openEditModalHandler}
              className="absolute right-2 flex justify-center cursor-pointer w-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </button>
          </>
        ) : null}
      </div>

      {/*컨텐츠*/}
      <div className={cls("pt-12", hasTabBar ? "pb-20" : "")}>{children}</div>

      {/*하단 탭*/}
      {/*모바일 사이즈로 일단 작업하기 위해 max-w-xl 줘서 fixed된 바 크기 조정*/}
      {hasTabBar ? (
        <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 py-3 flex justify-between text-xs z-20">
          <Link href="/">
            <div
              className={cls(
                "flex flex-col items-center space-y-2",
                router.pathname === "/"
                  ? "text-orange-500"
                  : "hover:text-gray-400 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span>홈</span>
            </div>
          </Link>
          <Link href="/posts">
            <div
              className={cls(
                "flex flex-col items-center space-y-2",
                router.pathname === "/posts"
                  ? "text-orange-500"
                  : "hover:text-gray-400 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
              <span>동네생활</span>
            </div>
          </Link>
          <Link href="/chats">
            <div
              className={cls(
                "flex flex-col items-center space-y-2",
                router.pathname === "/chats"
                  ? "text-orange-500"
                  : "hover:text-gray-400 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
              <span>채팅</span>
            </div>
          </Link>
          <Link href="/streams">
            <div
              className={cls(
                "flex flex-col items-center space-y-2",
                router.pathname === "/streams"
                  ? "text-orange-500"
                  : "hover:text-gray-400 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  d="M15.5 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              <span>라이브 스트리밍</span>
            </div>
          </Link>
          <Link href="/profile">
            <div
              className={cls(
                "flex flex-col items-center space-y-2",
                router.pathname === "/profile"
                  ? "text-orange-500"
                  : "hover:text-gray-400 transition-colors"
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <span>나의 당근</span>
            </div>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
