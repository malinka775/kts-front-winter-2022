// Здесь необходимо продемонстрировать создание и использование GitHubStore

import { ApiResponse, ErrorItem } from "../shared/store/ApiStore/types";
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
  .then((result: ApiResponse<RepoItem[], ErrorItem>) => {
    return result; // в консоли появится список репозиториев в ktsstudio
  });

gitHubStore
  .createRepo({
    repoName: NEW_REPO_NAME,
    token: TOKEN,
  })
  .then((result: ApiResponse<string, ErrorItem>) => {
    return result;
  });
