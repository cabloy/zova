---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Zova'
  text: '一款支持IOC容器的Vue3框架'
  tagline: 可以搭配任何UI库使用
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/start/introduction
    - theme: alt
      text: 为什么需要Vue3+IOC?
      link: /zh/guide/start/why
    - theme: alt
      text: Github
      link: https://github.com/cabloy/zova

features:
  - title: 不用ref/reactive
    details: 有了IOC容器的加持，定义响应式状态不再需要 ref/reactive
  - title: 不用ref.value
    details: 因为不用 ref，自然也就不用再写大量的 ref.value
  - title: 模块化体系
    details: 在一个大型的 Web 业务系统当中，随着业务的增长和变更，为了避免代码失控，有必要将系统拆分为一个个相对独立的模块，这就是 Zova 采用模块化体系的缘由。因此，在 Zova 中，实际的业务代码开发都是在模块中进行
---
