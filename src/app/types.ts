export type Nullable<T> = T | null;

export type Column = {
  key: string;
  title: string;
  sortable?: boolean;
};
//
// export type Sort = {
//     key: string
//     direction: 'asc' | 'desc'
// } | null

export type Sort = Nullable<{
  key: string;
  direction: "asc" | "desc";
}>;
