import { useState, useEffect, memo } from "react";

import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { Branch } from "@store/GitHubStore/types";
import { Drawer, Spin } from "antd";

type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem;
  onClose: (e: any) => void;
  visible: boolean;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose,
  visible,
}) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const gitHubStore = new GitHubStore();

  useEffect(() => {
    gitHubStore
      .getRepoBranchesList({
        ownerName: selectedRepo.owner.login,
        repoName: selectedRepo.name,
      })
      .then((result: ApiResponse<Branch[], any>) => {
        setBranches(result.data);
        setIsLoading(false);
      });
  }, [selectedRepo]);

  return (
    <Drawer
      title="Список веток:"
      placement="left"
      onClose={onClose}
      visible={visible}
    >
      {isLoading ? (
        <Spin tip="Загрузка..." />
      ) : (
        branches.map((branch: Branch) => {
          return <li key={branch.name + Date.now()}>{branch.name}</li>;
        })
      )}
    </Drawer>
  );
};

export default memo(RepoBranchesDrawer);
