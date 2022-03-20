import { createContext } from "react";

import "antd/dist/antd.css";
import "./App.css";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import ReposListStore from "@store/LocalStore/ReposListStore";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import useReposContext from "./context/useReposContext";
import ReposSearchPage from "./pages/ReposSearchPage";

export const ORGANIZATION_NAME = "ktsstudio";

export const AppReposContext = createContext<ReposListStore | null>(null);

function App() {
  const ktsReposListStore = useReposContext();
  return (
    <AppReposContext.Provider value={ktsReposListStore}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/repos" element={<ReposSearchPage />} />
            <Route
              path="/repos/:organizationName/:repoName"
              element={<RepoBranchesDrawer />}
            />
            <Route
              path="/repos/:organizationName"
              element={<ReposSearchPage />}
            />

            <Route path="*" element={<ReposSearchPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppReposContext.Provider>
  );
}

export default App;
