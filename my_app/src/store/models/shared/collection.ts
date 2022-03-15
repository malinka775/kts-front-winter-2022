export type CollectionModel<K extends string | number, T> = {
  order: K[];
  entities: Record<K, T>;
};

export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});
