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
  - title: Stop worrying about using ref or reactive
    details: Because in most scenarios, there is no need to use ref and reactive
  - title: No longer write a large number of ref.value
    details: Because defining reactive  variables in Cabloy-Front is more intuitive and no longer requires ref semantics
  - title: No longer using pinia
    details: Because Cabloy-Front provides an ioc container, which can more flexibly define and use global objects
---
