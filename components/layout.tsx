interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
}: LayoutProps) {
  return (
    <div>
      {/*네비게이션 바*/}
      <div className="fixed top-0 flex items-center justify-center bg-white w-full text-lg font-medium text-gray-800 py-3 border-b">
        {title ? <span>{title}</span> : null}
      </div>
      {/*컨텐츠*/}
      <div className="py-10">{children}</div>
      {/*하단 탭*/}
      {hasTabBar ? <nav></nav> : null}
    </div>
  );
}
