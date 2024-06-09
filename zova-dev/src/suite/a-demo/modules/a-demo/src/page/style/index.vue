<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageStyle } from './controller.js';
import { RenderStyle } from './render.jsx';
useControllerPage(ControllerPageStyle, RenderStyle);
</script>
