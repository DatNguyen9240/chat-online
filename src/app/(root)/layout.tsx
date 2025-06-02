import React from "react";
import SidebarWrapper from "@/components/common/sidebar/SidebarWrapper";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default Layout;
