import React from "react";
import { Header } from "@/presentation/components/organisms/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
  </>
);
