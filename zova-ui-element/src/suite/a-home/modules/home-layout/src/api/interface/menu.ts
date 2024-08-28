export interface ServiceMenuEntity {
  key: string;
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: string;
  folder?: boolean;
  separator?: boolean;
  children?: ServiceMenuEntity[];
}
