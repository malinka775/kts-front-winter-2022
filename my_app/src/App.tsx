import { createContext } from "react";

import "antd/dist/antd.css";
import "./App.css";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ReposContextProps } from "./context/types";
import useReposContext from "./context/useReposContext";
import ReposSearchPage from "./pages/ReposSearchPage";

export const ORGANIZATION_NAME = "ktsstudio";

const AppReposContext = createContext<ReposContextProps>({
  list: null,
  isLoading: true,
  load: () => {},
});

function App() {
  const { list, load, isLoading } = useReposContext(ORGANIZATION_NAME);
  return (
    <AppReposContext.Provider value={{ list, load, isLoading }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/repos" element={<ReposSearchPage />} />
            <Route path="/repos/:name" element={<RepoBranchesDrawer />} />
            <Route path="*" element={<ReposSearchPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppReposContext.Provider>
  );
}

export default App;
