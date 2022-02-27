import styles from "./ReposSearchPage.module.scss";

import { useEffect, useState, memo } from "react";
import React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoBranchesDrawer from "@components/RepoBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import useReposContext from "@context/useReposContext";
import { RepoItem } from "@store/GitHubStore/types";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

const ReposSearchPage: React.FC = () => {
  const { list, load, isLoading } = useReposContext();
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);

  const [filteredRepos, setFilteredRepos] = useState<RepoItem[] | null>(null);

  let filtered;

  useEffect(() => {
    load();
  }, []);

  const onClickHandler: () => void = () => {
    if (list) {
      filtered = list.filter((repo) => repo.name.includes(inputValue));
      setFilteredRepos(filtered);
    }
  };

  const onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setInputValue(e.target.value);
    if (list) {
      filtered = list.filter((repo) => repo.name.includes(e.target.value));
      setFilteredRepos(filtered);
    }
  };
  const renderRepos: () => JSX.Element | JSX.Element[] = () => {
    if (isLoading) {
      return < Spin tip="Загрузка..." />;
    }
    if (filteredRepos) {
      return filteredRepos.map((repo: RepoItem) => {
        return <RepoTile key={repo.id} RepoItem={repo} />;
      });
    } else {
      return list?.map((repo: RepoItem) => {
        return <RepoTile key={repo.id} RepoItem={repo} />;
      });
    }
  };

  return (
    <div className={styles.reposSearchPage}>
      <div className={styles.searchbar}>
        <Input
          disabled={false}
          value={inputValue}
          placeholder="Введите название организации"
          onChange={onChangeHandler}
        />
        <Button children={<SearchIcon />} onClick={onClickHandler} />
      </div>
      <div className={styles.reposList__gridWrapper}>{renderRepos()}</div>
      
    </div>
  );
};

export default memo(ReposSearchPage);
