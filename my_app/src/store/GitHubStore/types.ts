import {ApiResponse, StatusHTTP} from "../../shared/store/ApiStore/types";

/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */
export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
}

export type GetOrganizationReposListParams = {
    organizationName: string
};

export type RepoItem = {
    id: number,
    node_id: string,
    name: string,
    full_name: string,
    owner: object,
    private: boolean,
    html_url: string,
    homepage: string,
    size: number,
    default_branch: string,
    topics: object,
    disabled: false,
    visibility: string,
};