import ApiStore from '../../shared/store/ApiStore';
import {ApiResp, GetOrganizationReposListParams, IGitHubStore, RepoItem} from "./types";
import {HTTPMethod, RequestParams, StatusHTTP} from "../../shared/store/ApiStore/types";

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore("https://api.github.com"); // TODO: не забудьте передать baseUrl в конструктор

    // TODO: реализовать интерфейс IGitHubStore

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
        // TODO: Здесь сделайте вызов из this.apiStore и верните результат
        try {
            const requestParams: RequestParams<null> = {
            method: HTTPMethod.GET,
            endpoint: `/orgs/${params.organizationName}/repos`,
            headers: {"Content-Type": "application/json; charset=utf-8"}, // Объект с передаваемыми HTTP-заголовками
            data: null,
            }

            const apiStoreRes = await this.apiStore.request(requestParams);

            const repoItems = apiStoreRes.data.map((item: RepoItem) => {
                return {
                    id: item.id,
                    node_id: item.node_id,
                    name: item.name,
                    full_name: item.full_name,
                    owner: item.owner,
                    private: item.private,
                    html_url: item.html_url,
                    homepage: item.homepage,
                    size: item.size,
                    default_branch: item.default_branch,
                    topics: item.topics,
                    disabled: item.disabled,
                    visibility: item.visibility
                }
            })

            return {
                success: true,
                data: repoItems,
                status: StatusHTTP.success
            };
        } catch {
           return {
                success: false,
                status: StatusHTTP.error
            }
        }
        // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
    }
}