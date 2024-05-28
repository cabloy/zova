<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from '@cabloy/front';
import { ControllerPageState } from './controller.js';
import { RenderPageState } from './render.jsx';
useControllerPage(ControllerPageState, RenderPageState);
</script>
