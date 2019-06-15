import React from 'react';
import Header from '../components/Header';
import Home from '../pages/Home';
import Footer from '../components/Footer';

const Layout = props => (
  <div className="Layout">
    <Header />
    {props.children}
    <Footer />
  </div>
);

export default Layout;