export interface ThemeToken {
  dark?: boolean; // true/false/undefined
  color: {
    primary: string;
  };
  var: {
    borderColor: string;
  };
}
export const themeToken: ThemeToken = {
  color: {
    primary: '#00b96b',
  },
  var: {
    borderColor: '#AAAAAA',
  },
};
