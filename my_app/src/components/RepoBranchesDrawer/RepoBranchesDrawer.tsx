import { useState, useEffect, memo } from "react";

import { ApiResponse, ErrorItem } from "@shared/store/ApiStore/types";
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
  const [isErrorData, setIsErrorData] = useState<boolean>(false);
  const gitHubStore = new GitHubStore();
  let errorMessage;

  useEffect(() => {
    gitHubStore
      .getRepoBranchesList({
        ownerName: selectedRepo.owner.login,
        repoName: selectedRepo.name,
      })
      .then((result: ApiResponse<Branch[], ErrorItem>) => {
        if (result.status === 200) {
          setBranches(result.data as Branch[]);
        } else {
          setIsErrorData(true);
          console.error( (result.data as ErrorItem).message);
        }
        setIsLoading(false);
        
      });
  }, [selectedRepo]);

  return (
    <Drawer
      title={`Список веток в ${selectedRepo.name}:`}
      placement="left"
      onClose={onClose}
      visible={visible}
    >
      {isLoading && <Spin tip="Загрузка..." />}
      {isErrorData && <div>Не удается загрузить репозиторий</div>}
      {branches.map((branch: Branch) => {
        return <li key={branch.name}>{branch.name}</li>;
      })}
    </Drawer>
  );
};

export default memo(RepoBranchesDrawer);
