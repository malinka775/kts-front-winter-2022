import { ApiResponse, ErrorItem } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { Branch } from "@store/GitHubStore/types";
import { Meta } from "@utils/meta";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { addReactionToTrack } from "mobx-react-lite/dist/utils/reactionCleanupTracking";

import { ILocalStore } from "../types";

export type PrivateFields =
  | "_ownerName"
  | "_repoName"
  | "_load"
  | "_list"
  | "_meta";

export default class BranchesListStore implements ILocalStore {
  private readonly _gitHubStore = new GitHubStore();
  private _list: Branch[] = [];
  private _ownerName: string = "";
  private _repoName: string = "";
  private _meta: Meta = Meta.initial;

  private async _load(): Promise<void> {
    this._meta = Meta.loading;
    const res = await this._gitHubStore.getRepoBranchesList({
      ownerName: this._ownerName,
      repoName: this._repoName,
    });

    runInAction(() => {
      if (res.status === 200) {
        this._meta = Meta.success;
        this._list = res.data as Branch[];
        return;
      }
      this._meta = Meta.error;
    });
  }

  get list(): Branch[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
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
    this._meta = Meta.initial;
    this._ownerName = "";
    this._repoName = "";
  }
  constructor() {
    makeObservable<BranchesListStore, PrivateFields>(this, {
      _ownerName: observable,
      _repoName: observable,
      _list: observable.ref,
      _meta: observable,
      _load: action,
      destroy: action,
      list: computed,
      meta: computed,
      setOwnerName: action,
      setRepoName: action,
    });
  }
}
