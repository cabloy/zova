---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Zova'
  text: 'A vue3 framework with ioc'
  tagline: Can be used with any UI library
  actions:
    - theme: brand
      text: Get Started
      link: /guide/start/introduction
    - theme: alt
      text: Why Vue3+IOC?
      link: /guide/start/why
    - theme: alt
      text: Github
      link: https://github.com/cabloy/zova

features:
  - title: No ref/reactive, No ref.value
    details: With the support of ioc container, defining reactive states no longer needs ref/reactive. Without ref, naturally there is no need to write a lot of ref.value
  - title: Type programming without type
    details: Zova adopts a strategy that combines dependency injection and dependency lookup, significantly reducing the use of decorator functions. Prioritizing the use of dependency lookup can achieve a development experience of "Type programming without type", which means that we can enjoy the many benefits of type programming without the need to annotate types, thus keeping our code concise and elegant, significantly improving development efficiency, and ensuring code quality
  - title: Modularization
    details: In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating. This is why Zova introduces modularization. In Zova, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk when building, bidding farewell to the hassle of Vite configuration and effectively avoiding the fragmentation of bundles. Especially in large business systems, this advantage is particularly evident
---
