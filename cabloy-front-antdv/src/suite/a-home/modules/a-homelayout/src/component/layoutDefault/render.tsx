import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherLayoutDefault } from './mother.js';
import { ConfigProvider, Layout, LayoutHeader, LayoutSider } from 'ant-design-vue';

export interface RenderLayoutDefault extends MotherLayoutDefault { }

@Local()
export class RenderLayoutDefault extends BeanRenderBase {
  render() {
    return <ConfigProvider>
      <Layout>
        <LayoutHeader></LayoutHeader>
        <Layout>
          <LayoutSider></LayoutSider>
          <Layout>
            <router-view />
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  }
}
