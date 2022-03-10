import ReposListStore from "@store/LocalStore/ReposListStore";

const useReposContext = (organizationName: string) => {
  const reposListStore = new ReposListStore(organizationName);
  return reposListStore;
};

export default useReposContext;
