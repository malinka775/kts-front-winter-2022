import { RepoItemApi } from "@store/models/gitHub";

import { ApiResponse, ErrorItem } from "../../shared/store/ApiStore/types";

/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoTile)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */
export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItemApi[], ErrorItem>>;
  createRepo(params: CreateRepoParams): Promise<ApiResponse<string, ErrorItem>>;
}

export type GetOrganizationReposListParams = {
  organizationName: string;
  page?: number;
  per_page?: number;
};

export type GetRepoBranchesListParams = {
  ownerName: string;
  repoName: string;
};

export type CreateRepoParams = {
  repoName: string;
  token: string;
};

export type Branch = {
  name: string;
};
