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
      text: Github
      link: https://github.com/cabloy/cabloy-front

features:
  - title: 不再纠结使用ref还是reactive
    details: 因为在大多数场景下，不需要使用ref和reactive
  - title: 不再书写大量ref.value
    details: 因为在Cabloy-Front中定义响应式变量更加直观，不再需要ref语义
  - title: 不再使用pinia状态管理
    details: 因为Cabloy-Front提供了IOC容器，可以更加灵活的定义和使用全局对象
---
