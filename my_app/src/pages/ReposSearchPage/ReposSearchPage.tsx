import { useEffect, useState, memo, useCallback } from "react";
import React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import useReposContext from "@context/useReposContext";
import { RepoItem } from "@store/GitHubStore/types";
import { Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./ReposSearchPage.module.scss";

const ReposSearchPage: React.FC = () => {
  const { list, load, isLoading, hasMore } = useReposContext();
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredRepos, setFilteredRepos] = useState<RepoItem[] | null>(null);
  const [page, setPage] = useState<number>(1);
  let filtered: null | RepoItem[];

  useEffect(() => {
    load(page);
  }, [page]);

  useEffect(() => {
    if (inputValue !== "") {
      if (list) {
        filtered = list.filter((repo) => repo.name.includes(inputValue));
      }
    } else {
      filtered = null;
    }
    setFilteredRepos(filtered);
  }, [inputValue]);

  const onClickHandler: () => void = useCallback(() => {
    if (inputValue !== "") {
      if (list) {
        filtered = list.filter((repo) => repo.name.includes(inputValue));
      }
    } else {
      filtered = null;
    }
    setFilteredRepos(filtered);
  }, [inputValue]);

  const onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setInputValue(e.target.value);
  };

  const getNextData: () => void = () => {
    setPage(page + 1);
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
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {isLoading && <Spin tip="Загрузка..." />}
        {filteredRepos
          ? filteredRepos.map((repo: RepoItem) => {
              return <RepoTile key={repo.id} RepoItem={repo} />;
            })
          : list?.map((repo: RepoItem) => {
              return <RepoTile key={repo.id} RepoItem={repo} />;
            })}
      </InfiniteScroll>
    </div>
  );
};

export default memo(ReposSearchPage);
