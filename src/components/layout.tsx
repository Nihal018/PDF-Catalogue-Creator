// components/Layout.tsx
import Header from "./Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-8">{children}</main>
      <footer className="bg-blue-500 text-white p-4 text-center">
        <p>© 2024 PDF Catalogue Creator</p>
      </footer>
    </div>
  );
};

export default Layout;
