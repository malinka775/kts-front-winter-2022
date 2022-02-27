import { useState, useEffect, memo } from "react";

import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";
import { Branch } from "@store/GitHubStore/types";
import { Drawer, Spin } from "antd";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export type RepoBranchesDrawerProps = {
  visible?: boolean;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  visible = true,
}) => {
  interface RepoBranchesDrawerParams {
    [repoName: string]: string;
  }

  type LocationState = {
    selectedRepo: RepoItem;
  };

  const params = useParams<RepoBranchesDrawerParams>();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const gitHubStore = new GitHubStore();
  const location = useLocation();
  const navigation = useNavigate();
  const { selectedRepo } = location.state as LocationState;

  useEffect(() => {
    if (params.name) {
      gitHubStore
        .getRepoBranchesList({
          ownerName: selectedRepo.owner.login,
          repoName: params.name,
        })
        .then((result: ApiResponse<Branch[], any>) => {
          setBranches(result.data);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <Drawer
      title={`Список веток в ${params.name}:`}
      placement="left"
      onClose={(e) => navigation(-1)}
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
