---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Cabloy-Front'
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
      link: https://github.com/cabloy/cabloy-front

features:
  - title: 不用ref/reactive
    details: 因为在大多数场景下，不需要使用ref和reactive
  - title: 不用ref.value
    details: 因为在Cabloy-Front中定义响应式变量更加直观，不再需要ref语义
  - title: 不用pinia
    details: 因为Cabloy-Front提供了IOC容器，可以更加灵活的定义和使用全局对象
---
