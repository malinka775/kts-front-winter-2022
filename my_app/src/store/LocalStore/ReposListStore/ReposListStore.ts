import { ErrorItem } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { IGitHubStore, RepoItem } from "@store/GitHubStore/types";
import { makeObservable, observable, action, computed } from "mobx";

import { ILocalStore } from "../types";

type PrivateFields =
  | "_list"
  | "_page"
  | "_hasMore"
  | "_isLoading"
  | "_load"
  | "_organizationName";

export default class ReposListStore implements ILocalStore {
  private readonly _gitHubStore = new GitHubStore();
  private _list: RepoItem[] = [];
  private _isLoading: boolean = false;
  private _hasMore: boolean = true;
  private _page: number = 1;
  private _organizationName: string = "";
  private _load(page: number): void {
    this._isLoading = true;

    if (this._gitHubStore) {
      this._gitHubStore
        .getOrganizationReposList({
          organizationName: this._organizationName,
          page: this._page,
          per_page: 7,
        })
        .then((result) => {
          if ((result.data as RepoItem[]).length === 0) {
            this._hasMore = false;
          } else {
            this._list = [...this._list, ...(result.data as RepoItem[])];
          }
          this._isLoading = false;
        })
        .catch((error) => {
          console.error((error.data as ErrorItem).message);
        });
    }
  }
  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _organizationName: observable,
      organizationName: computed,
      _list: observable,
      list: computed,
      _page: observable,
      page: computed,
      _isLoading: observable,
      isLoading: computed,
      _hasMore: observable,
      hasMore: computed,
      _load: action,
      getMore: action,
      setOrganizationName: action,
    });
  }

  get list(): RepoItem[] {
    return this._list;
  }

  get page(): number {
    return this._page;
  }

  set page(page: number) {
    this._page = page;
  }

  get organizationName(): string {
    return this._organizationName;
  }
  setOrganizationName(name: string) {
    this._organizationName = name;
  }

  get hasMore(): boolean {
    return this._hasMore;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  load(page: number): void {
    this._load(page);
  }

  getMore(): void {
    this._page = this._page + 1;
  }

  destroy(): void {
    this._list = [];
    this._page = 1;
    this._isLoading = true;
    this._hasMore = true;
    this._organizationName = "";
  }
}
