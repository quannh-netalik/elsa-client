import "./utils/socket";

import { lazy, ReactNode, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppProvider from "./context/AppContext/App.context";
import UserType from "./components/UserType";
import PrivateRoute from "./components/PrivateRoute";

const QuizSession = lazy(() => import("./components/QuizSession"));

const App = (): ReactNode => {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Suspense fallback={<div>loading...</div>}>
            <Routes>
              <Route path="/" element={<UserType />} />
              <Route
                path="/quiz"
                element={
                  <PrivateRoute>
                    <QuizSession />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
};

export default App;
