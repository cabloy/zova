---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Zova'
  text: '一款支持IOC容器的Vue3框架'
  tagline: 能够帮助开发者构建快速、可靠的应用
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
  - title: Vue+React+Angular
    details: 结合Vue/React/Angular的优点，规避他们的缺点，让我们的开发体验更加优雅，减轻心智负担
  - title: UI库
    details: 可以搭配任何 UI 库使用，并且内置了几款 UI 库的项目模版，便于开箱即用，包括：antdv、element-plus、quasar和vuetify
  - title: SSR
    details: 内置开箱即用的SSR解决方案，同时支持B端和C端应用
  - title: 响应式系统
    details: 有了IOC容器的加持，定义响应式状态不再需要 ref/reactive。因为不用 ref，自然也就不用再写大量的 ref.value
  - title: CSS-in-JS
    details: 内置CSS-in-JS的能力，让样式的开发更加灵活、便捷，同时提供了开箱即用的主题切换能力
  - title: 统一数据源
    details: 采用统一的Model机制封装统一数据源，包括Cookie、Localstorage和TanStack Query管理的服务端数据
  - title: IOC容器
    details: Zova提供的IOC容器概念更加清晰，功能更加强大，是应对大型业务系统开发的利器
  - title: 模块化体系
    details: 在一个大型的 Web 业务系统当中，随着业务的增长和变更，为了避免代码失控，有必要将系统拆分为一个个相对独立的模块，这就是 Zova 采用模块化体系的缘由。在 Zova 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Chunk，告别 Vite 配置的烦恼，同时可以有效避免构建产物的碎片化。特别是在大型业务系统中，这种优势尤其明显
---
