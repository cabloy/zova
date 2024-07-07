export interface ServiceMenuEntity {
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: { name?: string } | string;
  folder?: boolean;
  separator?: boolean;
  children?: ServiceMenuEntity[];
}
