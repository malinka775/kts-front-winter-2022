import { useState, useEffect, memo } from "react";

import { ApiResponse, ErrorItem } from "@shared/store/ApiStore/types";
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
  const [isErrorData, setIsErrorData] = useState<boolean>(false);
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
        .then((result: ApiResponse<Branch[], ErrorItem>) => {
          if (result.status === 200) {
            setBranches(result.data as Branch[]);
          } else {
            setIsErrorData(true);
            //eslint-disable-next-line no-console
            console.error((result.data as ErrorItem).message);
          }
          setIsLoading(false);
        });
    }
  }, [selectedRepo]);

  return (
    <Drawer
      title={`Список веток в ${params.name}:`}
      placement="left"
      onClose={(e) => navigation(-1)}
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
