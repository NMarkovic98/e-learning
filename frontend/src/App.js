import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useFetch from "./lib/useFetch";

function App({ routes }) {
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const { isLoading, isError, data } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}:${
      process.env.REACT_APP_BACKEND_PORT
    }/getUser/${3}`
  );
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error happened</h1>;
  }
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.component} />
      ))}
    </Routes>
  );
}

export default App;
