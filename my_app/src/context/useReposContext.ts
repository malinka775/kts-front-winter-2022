import { useEffect, useState } from "react";

import GitHubStore from "@store/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

import { ORGANIZATION_NAME } from "../App";

const useReposContext = (organizationName: string = ORGANIZATION_NAME) => {
  const [list, setList] = useState<RepoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const load = (page: number) => {
    new GitHubStore()
      .getOrganizationReposList({
        organizationName: organizationName,
        page: page,
        per_page: 7,
      })
      .then((result) => {
        setList((prev) => {
          return [...prev, ...result.data];
        });
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