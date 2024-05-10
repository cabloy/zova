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
      text: Github
      link: https://github.com/cabloy/cabloy-front

features:
  - title: No ref/reactive
    details: Because in most scenarios, there is no need to use ref and reactive
  - title: No ref.value
    details: Because defining reactive  variables in Cabloy-Front is more intuitive and no longer requires ref semantics
  - title: No pinia
    details: Because Cabloy-Front provides an ioc container, which can more flexibly define and use global objects
---
