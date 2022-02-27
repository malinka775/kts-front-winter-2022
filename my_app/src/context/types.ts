import { RepoItem } from "@store/GitHubStore/types";
export type ReposContextProps = {
  list: RepoItem[] | null;
  isLoading: boolean;
  load: () => void;
}