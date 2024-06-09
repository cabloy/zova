<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageComponent } from './controller.js';
import { RenderComponent } from './render.jsx';
useControllerPage(ControllerPageComponent, RenderComponent);
</script>
