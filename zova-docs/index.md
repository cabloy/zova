---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Zova'
  text: 'A vue3 framework with ioc'
  tagline: Empowers developers to build fast, reliable applications
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
  - title: Vue+React+Angular
    details: Combine the advantages of Vue/React/Angular and avoid their shortcomings to make our development experience more elegant and reduce the mental burden
  - title: UI libraries
    details: Zova can be used with any UI library and comes with built-in project templates for several UI libraries, making it easy to use out of the box, including antdv, element-plus, quasar and vuetify
  - title: SSR
    details: Built-in out-of-the-box SSR solution, supporting both front-end applications and admin management systems
  - title: Reactivity
    details: With the support of ioc container, defining reactive states no longer needs ref/reactive. Without ref, naturally there is no need to write a lot of ref.value
  - title: CSS-in-JS
    details: Built-in CSS-in-JS capability making style development more flexible and convenient, while providing out-of-the-box theme switching capabilities
  - title: Unified Data Source
    details: Encapsulating unified data sources through model mechanism, including Cookie, Localstorage and server-side data managed by TanStack Query
  - title: IOC Container
    details: The IOC container provided by Zova has a clearer concept and more powerful functions, which is a powerful tool for the development of large-scale business systems
  - title: Modularization
    details: In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating. This is why Zova introduces modularization. In Zova, a module is a natural bundle boundary, and automatically bundled into an independent asynchronous chunk when building, bidding farewell to the hassle of Vite configuration and effectively avoiding the fragmentation of bundles. Especially in large business systems, this advantage is particularly evident
---
