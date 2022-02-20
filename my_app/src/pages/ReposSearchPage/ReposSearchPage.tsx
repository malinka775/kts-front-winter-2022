import "./ReposSearchPage.css";

import { useEffect, useState, memo } from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { Spin } from "antd";

const ReposSearchPage: React.FC = () => {
  const [repos, setRepos] = useState<RepoItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);

  const [filteredRepos, setFilteredRepos] = useState<RepoItem[] | null>(null);
  const gitHubStore = new GitHubStore();
  let filtered;
  useEffect(() => {
    gitHubStore
      .getOrganizationReposList({
        organizationName: "ktsstudio",
      })
      .then((result: ApiResponse<RepoItem[], any>) => {
        setRepos(result.data);
        setIsLoading(false);
      });
  }, []);

  const onClickHandler: () => void = () => {
    if (repos) {
      filtered = repos.filter((repo) => repo.name.includes(inputValue));
      setFilteredRepos(filtered);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (repos) {
      filtered = repos.filter((repo) => repo.name.includes(e.target.value));
      setFilteredRepos(filtered);
    }
  };

  const showBranches = (e: React.MouseEvent, repo: RepoItem) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      return;
    } else {
      setSelectedRepo(repo);
      setIsDrawerVisible(true);
    }
  };

  const onCloseHandler = () => {
    setSelectedRepo(null);
    setIsDrawerVisible(false);
  };

  function renderRepos() {
    if (isLoading) {
      return <Spin tip="Загрузка..." />;
    }
    if (filteredRepos) {
      return filteredRepos.map((repo: RepoItem) => {
        return (
          <RepoTile
            key={repo.id}
            RepoItem={repo}
            onClick={(e) => showBranches(e, repo)}
          />
        );
      });
    } else {
      return repos?.map((repo: RepoItem) => {
        return (
          <RepoTile
            key={repo.id}
            RepoItem={repo}
            onClick={(e) => showBranches(e, repo)}
          />
        );
      });
    }
  }

  return (
    <div className="repos-search-page">
      {selectedRepo ? (
        <RepoBranchesDrawer
          selectedRepo={selectedRepo}
          onClose={onCloseHandler}
          visible={isDrawerVisible}
        />
      ) : (
        <></>
      )}
      <div className="searchbar">
        <Input
          disabled={false}
          value={inputValue}
          placeholder="Введите название организации"
          onChange={onChangeHandler}
        />
        <Button children={<SearchIcon />} onClick={onClickHandler} />
      </div>
      <div className="repos-list__grid-wrapper">{renderRepos()}</div>
    </div>
  );
};

export default memo(ReposSearchPage);
