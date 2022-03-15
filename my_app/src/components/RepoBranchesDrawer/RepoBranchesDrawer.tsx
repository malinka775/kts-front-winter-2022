import { useEffect } from "react";

import { Branch } from "@store/GitHubStore/types";
import BranchesListStore from "@store/LocalStore/BranchesListStore";
import { useLocalStore } from "@store/LocalStore/useLocalStore";
import { Meta } from "@utils/meta";
import { Drawer, Spin } from "antd";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";

export type RepoBranchesDrawerProps = {
  visible?: boolean;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  visible = true,
}) => {
  interface RepoBranchesDrawerParams {
    [organizationName: string]: string;
    repoName: string;
  }
  const params = useParams<RepoBranchesDrawerParams>();
  const branchesListStore = useLocalStore(() => new BranchesListStore());
  const navigation = useNavigate();

  useEffect(() => {
    branchesListStore.setOwnerName(params.organizationName as string);
    branchesListStore.setRepoName(params.repoName as string);
    branchesListStore.load();
  }, [params, branchesListStore]);
  return (
    <Drawer
      title={`Список веток в ${params.repoName}:`}
      placement="left"
      onClose={(e) => navigation(-1)}
      visible={visible}
    >
      {branchesListStore.meta === Meta.loading && <Spin tip="Загрузка..." />}
      {branchesListStore.meta === Meta.error && (
        <div>Не удается загрузить репозиторий</div>
      )}
      {branchesListStore.list.map((branch: Branch) => {
        return <li key={branch.name}>{branch.name}</li>;
      })}
    </Drawer>
  );
};

export default observer(RepoBranchesDrawer);
