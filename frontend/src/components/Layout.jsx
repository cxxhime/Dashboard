import { Outlet } from "react-router-dom";
import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Mascotte from './Mascotte';

const Layout = () => {
  return (
    <main>
      <header>
        <Header />
      </header>
      <section>
        <Outlet />
      </section>
      <footer>
        <Footer />
      </footer>
      <Mascotte /> 
    </main>
  );
};

export default Layout;