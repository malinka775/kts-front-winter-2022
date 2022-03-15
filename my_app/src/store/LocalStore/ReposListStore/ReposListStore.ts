import GitHubStore from "@store/GitHubStore";
import { normalizeRepoItem, RepoItemModel } from "@store/models/gitHub";
import {
  CollectionModel,
  getInitialCollectionModel,
} from "@store/models/shared/collection";
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
  private _list: CollectionModel<number, RepoItemModel> =
    getInitialCollectionModel();
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
        if (!res.success) {
          this._meta = Meta.error;
        } else {
          try {
            let list = getInitialCollectionModel();
            if (res.data.length === 0) {
              this._hasMore = false;
            } else {
              for (const item of res.data) {
                if (!this._list.order.includes(item.id))
                  list.order.push(item.id);
                list.entities[item.id] = normalizeRepoItem(item);
              }

              this._list.order = [...this._list.order, ...list.order];
              this._list.entities = {
                ...this._list.entities,
                ...list.entities,
              };
            }
            this._meta = Meta.success;
            return;
          } catch (error) {
            this._meta = Meta.error;
          }
        }
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
    return this._list.order.map((id) => this._list.entities[id]);
  }

  get page(): number {
    return this._page;
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

  load(): void {
    this._load(this._page);
  }

  getMore(): void {
    this._page = this._page + 1;
  }

  destroy(): void {
    this._list = getInitialCollectionModel();
    this._page = 1;
    this._meta = Meta.initial;
    this._hasMore = true;
    this._organizationName = "";
  }
}
