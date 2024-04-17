import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="m-8">{children}</div>;
};

export default Layout;
