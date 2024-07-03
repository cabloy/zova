<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageHome } from './controller.js';
import { RenderHome } from './render.jsx';
useControllerPage(ControllerPageHome, RenderHome);
defineOptions({ name: 'Home2' });
</script>
