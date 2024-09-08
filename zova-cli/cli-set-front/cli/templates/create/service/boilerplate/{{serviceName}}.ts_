import { ZovaApplication } from 'zova';

export interface ServiceTestEchoResult {
  message: string;
}

export default (app: ZovaApplication) => {
  return {
    echo: () => app.meta.$api.get<any, ServiceTestEchoResult>('/test/echo'),
  };
};
