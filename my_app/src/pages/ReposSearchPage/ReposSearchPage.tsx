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
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";

import styles from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
  const { list, load, isLoading } = useReposContext();
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredRepos, setFilteredRepos] = useState<RepoItem[] | null>(null);
  const [page, setPage] = useState<number>(1);

  let filtered;

  useEffect(() => {
    load(page);
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
      return <Spin tip="Загрузка..." />;
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

  const getNextData: () => void = async () => {
    setPage(page + 1);
    await load(page + 1);
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
      <InfiniteScroll
        dataLength={list.length} //This is important field to render the next data
        next={getNextData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {renderRepos()}
      </InfiniteScroll>
    </div>
  );
};

export default memo(ReposSearchPage);
