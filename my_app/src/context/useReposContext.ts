import { useEffect, useState } from "react";

import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

import { ORGANIZATION_NAME } from "../App";

const useReposContext = (organizationName: string = ORGANIZATION_NAME) => {
  const [list, setList] = useState<RepoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const load = () => {
    new GitHubStore()
      .getOrganizationReposList({
        organizationName: organizationName,
      })
      .then((result) => {
        setList(result.data);
        setIsLoading(false);
      });
  };

  return {
    list,
    load,
    isLoading,
  };
};

export default useReposContext;
