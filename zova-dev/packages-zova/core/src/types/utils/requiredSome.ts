export type RequiredSome<T, K extends keyof T> = T & Required<Pick<T, K>>;
