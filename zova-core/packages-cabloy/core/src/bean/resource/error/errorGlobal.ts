declare global {
  export interface Error {
    code?: number | string | undefined;
    status?: number | string | undefined;
  }
}
export {};
