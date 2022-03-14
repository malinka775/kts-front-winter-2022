import { ErrorItem } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore";
import { IGitHubStore } from "@store/GitHubStore/types";
import {
  normalizeRepoItem,
  RepoItemApi,
  RepoItemModel,
} from "@store/models/gitHub";
import { Meta } from "@utils/meta";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

import { ILocalStore } from "../types";

type PrivateFields =
  | "_gitHubStore"
  | "_list"
  | "_page"
  | "_hasMore"
  | "_meta"
  | "_load"
  | "_organizationName";

export default class ReposListStore implements ILocalStore {
  private readonly _gitHubStore = new GitHubStore();
  private _list: RepoItemModel[] = [];
  private _meta: Meta = Meta.initial;
  private _hasMore: boolean = true;
  private _page: number = 1;
  private _organizationName: string = "";
  private async _load(page: number): Promise<void> {
    this._meta = Meta.loading;
    if (this._gitHubStore) {
      const res = await this._gitHubStore.getOrganizationReposList({
        organizationName: this._organizationName,
        page: this._page,
        per_page: 7,
      });

      runInAction(() => {
        if ((res.data as RepoItemApi[]).length === 0) {
          this._hasMore = false;
        } else {
          this._list = [
            ...this._list,
            ...(res.data as RepoItemApi[]).map(normalizeRepoItem),
          ];
        }
        this._meta = Meta.success;
        return;
      });
    }
  }
  constructor() {
    makeObservable<ReposListStore, PrivateFields>(this, {
      _organizationName: observable,
      organizationName: computed,
      _list: observable.ref,
      list: computed,
      _page: observable,
      page: computed,
      _meta: observable,
      meta: computed,
      _hasMore: observable,
      hasMore: computed,
      _load: action,
      getMore: action,
      setOrganizationName: action,
      _gitHubStore: observable,
    });
  }

  get list(): RepoItemModel[] {
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

  get meta(): Meta {
    return this._meta;
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
    this._meta = Meta.initial;
    this._hasMore = true;
    this._organizationName = "";
  }
}
