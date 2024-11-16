import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import Header from './components/Header';
import Home from './pages/Home';
import MySurveys from './pages/MySurveys';
import CreateSurveys from './pages/CreateSurveys';
import Footer from './components/Footer';

function MainRouter(props) {
  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/mysurveys" element={<MySurveys />} />
        <Route exact path="/create" element={<CreateSurveys />} />
      </Routes>
      <Footer />
    </Wrapper>
  );
}

export default MainRouter;
