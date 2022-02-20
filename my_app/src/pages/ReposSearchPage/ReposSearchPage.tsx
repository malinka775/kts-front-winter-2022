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
  const [repos, setRepos] = useState<RepoItem[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedRepo, setSelectedRepo] = useState<RepoItem>();
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const gitHubStore = new GitHubStore();

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

  const onClickHandler = () => {
    if (repos) {
      const filteredRepos = repos.filter((repo) =>
        repo.name.includes(inputValue)
      );
      setRepos(filteredRepos);
    }
  };

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const showBranches = (repo: RepoItem) => {
    setSelectedRepo(repo);
    setIsDrawerVisible(true);
  };

  const onCloseHandler = () => {
    setSelectedRepo(undefined);
    setIsDrawerVisible(false);
  };
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
      <div className="repos-list__grid-wrapper">
        {isLoading ? (
          <Spin tip="Загрузка..." />
        ) : repos ? (
          repos.map((repo: RepoItem) => {
            return (
              <RepoTile
                key={repo.id}
                RepoItem={repo}
                onClick={(e) => showBranches(repo)}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default memo(ReposSearchPage);
