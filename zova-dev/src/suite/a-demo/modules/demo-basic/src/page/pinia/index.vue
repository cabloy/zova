<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPagePinia } from './controller.js';
import { RenderPinia } from './render.jsx';
import { StylePinia } from './style.js';
useControllerPage(ControllerPagePinia, RenderPinia, StylePinia);
</script>
