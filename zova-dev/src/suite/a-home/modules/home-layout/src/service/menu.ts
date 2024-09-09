import { ZovaApplication } from 'zova';

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

export default (app: ZovaApplication) => {
  return {
    select: () => app.meta.$api.get<any, ServiceMenuEntity[]>('/home/layout/menu/select'),
  };
};
