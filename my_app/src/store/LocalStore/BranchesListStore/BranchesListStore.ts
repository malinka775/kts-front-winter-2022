import { ApiResponse, ErrorItem } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { Branch } from "@store/GitHubStore/types";
import { action, makeObservable, observable } from "mobx";

import { ILocalStore } from "../types";

export type PrivateFields = "_ownerName" | "_repoName" | "_load";

export default class BranchesListStore implements ILocalStore {
  private readonly _gitHubStore = new GitHubStore();
  private _list: Branch[] = [];
  private _ownerName: string = "";
  private _repoName: string = "";
  private _isLoading: boolean = true;
  private _isError: boolean = false;

  private _load(): void {
    this._gitHubStore.getRepoBranchesList({
      ownerName: this._ownerName,
      repoName: this._repoName,
    })
    .then((result: ApiResponse<Branch[], ErrorItem>) => {
      if (result.status === 200) {
        this._list = result.data as Branch[];
      } else {
        this._isError = true;
        //eslint-disable-next-line no-console
        console.error((result.data as ErrorItem).message);
      }
      this._isLoading = false;
    });;
  }

  get list(): Branch[] {
    return this._list;
  }

  get isLoading(): boolean {
    return this.isLoading;
  }

  load(): void {
    this._load();
  }

  destroy(): void {
    this._list = [];
    this._ownerName = "";
    this._repoName = "";
  }
  constructor(ownerName: string, repoName: string) {
    this._ownerName = ownerName;
    this._repoName = repoName;
    makeObservable<BranchesListStore, PrivateFields>(this, {
      _ownerName: observable,
      _repoName: observable,
      _load: action,
    });
  }
}
