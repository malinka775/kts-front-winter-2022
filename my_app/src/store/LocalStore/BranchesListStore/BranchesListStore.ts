import { ApiResponse, ErrorItem } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { Branch } from "@store/GitHubStore/types";
import { action, computed, makeObservable, observable } from "mobx";

import { ILocalStore } from "../types";

export type PrivateFields =
  | "_ownerName"
  | "_repoName"
  | "_load"
  | "_list"
  | "_isLoading"
  | "_isError";

export default class BranchesListStore implements ILocalStore {
  private readonly _gitHubStore = new GitHubStore();
  private _list: Branch[] = [];
  private _ownerName: string = "";
  private _repoName: string = "";
  private _isLoading: boolean = false;
  private _isError: boolean = false;

  private _load(): void {
    this._isLoading = true;
    this._gitHubStore
      .getRepoBranchesList({
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
      });
  }

  get list(): Branch[] {
    return this._list;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
  get isError(): boolean {
    return this._isError;
  }
  load(): void {
    this._load();
  }

  setOwnerName(name: string) {
    this._ownerName = name;
  }

  setRepoName(name: string) {
    this._repoName = name;
  }

  destroy(): void {
    this._list = [];
    this._ownerName = "";
    this._repoName = "";
  }
  constructor() {
    makeObservable<BranchesListStore, PrivateFields>(this, {
      _ownerName: observable,
      _repoName: observable,
      _list: observable,
      _isError: observable,
      _isLoading: observable,
      _load: action,
      list: computed,
      isLoading: computed,
      isError: computed,
      setOwnerName: action,
      setRepoName: action,
    });
  }
}
