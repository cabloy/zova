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
    details: Class 实例默认支持响应式，所以实例中的状态不需要再通过ref/reactive声明响应式。此外，仍然支持原始数据和部分响应式的用法
  - title: 不用ref.value
    details: 不用 ref，自然也就不用再写大量的 ref.value
  - title: 不用pinia
    details: 可以直接基于全局 IOC 容器创建全局状态对象
---
