import ReposListStore from "@store/LocalStore/ReposListStore";

const useReposContext = () => {
  const reposListStore = new ReposListStore();
  return reposListStore;
};

export default useReposContext;
