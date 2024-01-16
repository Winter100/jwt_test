import "./globals.css";
import styles from "./layout.module.css";
import MainNavBar from "./_components/nav/mainNavBar";

export const metadata = {
  title: "연습용",
  description: "연습용 프로젝트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <nav>
          <MainNavBar />
        </nav>
        <main className={`${styles.container}`}>{children}</main>
      </body>
    </html>
  );
}
