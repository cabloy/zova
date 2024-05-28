<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from '@cabloy/front';
import { ControllerPageHome } from './controller.js';
import { RenderPageHome } from './render.jsx';
useControllerPage(ControllerPageHome, RenderPageHome);
</script>
