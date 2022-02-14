import ApiStore from '../../shared/store/ApiStore';
import {CreateRepoParams, GetOrganizationReposListParams, IGitHubStore, RepoItem} from "./types";
import {ApiResponse, HTTPMethod} from "../../shared/store/ApiStore/types";

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore("https://api.github.com");


    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>> {
        return this.apiStore.request({
                method: HTTPMethod.GET,
                endpoint: `/orgs/${params.organizationName}/repos`,
                headers: {}, // Объект с передаваемыми HTTP-заголовками
                data: {},
            }
        )
    }



    async createRepo(params: CreateRepoParams): Promise<ApiResponse<string, any>> {
        return this.apiStore.request({
            method: HTTPMethod.POST,
            endpoint: `/user/repos`,
            headers: {
                Authorization: "token " + params.token,
                accept: "application/vnd.github.v3+json",
            },
            data: { name: params.repoName },
        });

    }

}