import { ILocalStore } from "@store/LocalStore/types";
import { RepoItemApi } from "@store/models/gitHub";

import ApiStore from "../../shared/store/ApiStore";
import {
  ApiResponse,
  ErrorItem,
  HTTPMethod,
} from "../../shared/store/ApiStore/types";
import {
  CreateRepoParams,
  GetOrganizationReposListParams,
  GetRepoBranchesListParams,
  IGitHubStore,
  Branch,
} from "./types";

export default class GitHubStore implements IGitHubStore, ILocalStore {
  private readonly _apiStore = new ApiStore("https://api.github.com");

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItemApi[], ErrorItem>> {
    return this._apiStore.request({
      method: HTTPMethod.GET,
      endpoint: `/orgs/${params.organizationName}/repos`,
      headers: {}, // Объект с передаваемыми HTTP-заголовками
      data: {
        page: params.page,
        per_page: params.per_page,
      },
    });
  }

  async getRepoBranchesList(
    params: GetRepoBranchesListParams
  ): Promise<ApiResponse<Branch[], ErrorItem>> {
    return this._apiStore.request({
      method: HTTPMethod.GET,
      endpoint: `/repos/${params.ownerName}/${params.repoName}/branches`,
      headers: {}, // Объект с передаваемыми HTTP-заголовками
      data: {},
    });
  }

  async createRepo(
    params: CreateRepoParams
  ): Promise<ApiResponse<string, ErrorItem>> {
    return this._apiStore.request({
      method: HTTPMethod.POST,
      endpoint: `/user/repos`,
      headers: {
        Authorization: "token " + params.token,
        accept: "application/vnd.github.v3+json",
      },
      data: { name: params.repoName },
    });
  }
  destroy() {}
}
