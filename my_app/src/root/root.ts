// Здесь необходимо продемонстрировать создание и использование GitHubStore

import { ApiResponse } from "../shared/store/ApiStore/types";
import GitHubStore from "../store/GitHubStore/GitHubStore";
import { RepoItem } from "../store/GitHubStore/types";

const gitHubStore = new GitHubStore();
//for GET
const EXAMPLE_ORGANIZATION = "ktsstudio";
//for POST (creating a new repo)
const NEW_REPO_NAME = "new_name";
const TOKEN = "some_token"; //<--here should be a personal token

gitHubStore
  .getOrganizationReposList({
    organizationName: EXAMPLE_ORGANIZATION,
  })
  .then((result: ApiResponse<RepoItem[], any>) => {
    return result; // в консоли появится список репозиториев в ktsstudio
  });

gitHubStore
  .createRepo({
    repoName: NEW_REPO_NAME,
    token: TOKEN,
  })
  .then((result: ApiResponse<string, any>) => {
    return result;
  });

// В ДЗ 1 Не требуется визуально в разметке отображать результат запроса к сети. Достаточно вывести в console.log
