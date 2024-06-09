<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageStyle } from './controller.js';
import { RenderPageStyle } from './render.jsx';
useControllerPage(ControllerPageStyle, RenderPageStyle);
</script>
