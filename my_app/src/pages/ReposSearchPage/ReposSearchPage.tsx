import { useEffect, useState, useCallback, useContext } from "react";
import React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import { RepoItem } from "@store/GitHubStore/types";
import { Spin } from "antd";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";

import { AppReposContext } from "../../App";
import styles from "./ReposSearchPage.module.scss";
interface ReposListStoreParams {
  [organizationName: string]: string;
}
const ReposSearchPage: React.FC = () => {
  const ktsReposListStore = useContext(AppReposContext);
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams<ReposListStoreParams>();
  console.log("rendered");
  useEffect(() => {
    if (params.organizationName) {
      ktsReposListStore?.setOrganizationName(params.organizationName as string);
      ktsReposListStore?.load(ktsReposListStore.page);
    }
  }, [ktsReposListStore?.page, params]);

  const onClickHandler: () => void = useCallback(() => {
    ktsReposListStore?.setOrganizationName(inputValue);
    navigate(`/repos/${ktsReposListStore?.organizationName}`);
    setInputValue("");
  }, [inputValue]);

  const onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setInputValue(e.target.value);
  };

  const getNextData: () => void = () => {
    if (ktsReposListStore) {
      ktsReposListStore.getMore();
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
        <Button onClick={onClickHandler}>
          <SearchIcon />
        </Button>
      </div>
      <InfiniteScroll
        dataLength={ktsReposListStore ? ktsReposListStore.list.length : 0} //This is important field to render the next data
        next={getNextData}
        hasMore={ktsReposListStore ? ktsReposListStore.hasMore : false}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {ktsReposListStore?.isLoading && <Spin tip="Загрузка..." />}
        {ktsReposListStore?.list?.map((repo: RepoItem) => {
          return <RepoTile key={repo.id} RepoItem={repo} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default observer(ReposSearchPage);
