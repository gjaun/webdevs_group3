import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Home from "./pages/Home";
import MySurveys from "./pages/MySurveys";
import CreateSurveys from "./pages/CreateSurveys";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Run from "./pages/Run";

function MainRouter(props) {
  return (
    <>
      <Header />
      <Wrapper>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/mysurveys" element={<MySurveys />} />
          <Route exact path="/create" element={<CreateSurveys />} />
          <Route exact path="/edit/:id/:name" element={<Edit />} />
          <Route exact path="/add/:id/:name" element={<Add />} />
          <Route
            exact
            path="/update/:id/:name/:qid/:question"
            element={<Update />}
          />
          <Route exact path="/run/:id/:name" element={<Run />} />
        </Routes>
      </Wrapper>
      <Footer />
    </>
  );
}

export default MainRouter;
