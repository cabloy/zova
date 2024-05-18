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
    details: Class instances support reactive by default, so the state in the instance does not need to be declared reactive through ref/reactive. Additionally, usage of raw data and partially reactive is still supported
  - title: No ref.value
    details: Without ref, naturally there is no need to write a lot of ref.value
  - title: No pinia
    details: Global state objects can be created directly based on the global IOC container
---
