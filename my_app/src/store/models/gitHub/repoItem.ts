export type RepoItemApi = {
  id: number;
  name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
  };
  stargazers_count: number;
  updated_at: string;
  html_url: string;
};

export type RepoItemModel = {
  id: number;
  name: string;
  owner: {
    firstLetter: string;
    login: string;
    id: number;
    avatarUrl: string;
  };
  stargazersCount: number;
  updatedAt: string;
  htmlUrl: string;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => {
  try {
    return {
      id: from.id,
      name: from.name,
      owner: {
        firstLetter: getFirstLetter(from.owner.login),
        login: from.owner.login,
        id: from.owner.id,
        avatarUrl: from.owner.avatar_url,
      },
      stargazersCount: from.stargazers_count,
      updatedAt: getFormatedDate(from.updated_at),
      htmlUrl: from.html_url,
    }
  } catch (error) {
    console.error(error)
    return {} as RepoItemModel;
  } };

const getFormatedDate: (dateStr: string) => string = (dateStr) => {
  const date: Date = new Date(dateStr);
  const days = date.getDate();
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
  };
  return `${days} ${date.toLocaleString("en-US", options)}`;
};

const getFirstLetter: (login: string) => string = (login) => {
  return login[0].toUpperCase();
};
