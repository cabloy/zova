---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Cabloy-Front'
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
      link: https://github.com/cabloy/cabloy-front

features:
  - title: No ref/reactive
    details: With the support of ioc container, defining reactive states no longer needs ref/reactive
  - title: No ref.value
    details: Without ref, naturally there is no need to write a lot of ref.value
  - title: Modularization
    details: In a large web business system, as the business grows and changes, it is also necessary to divide the system into relatively independent modules in order to avoid code bloating. This is why Cabloy-Front introduces modularization
---
