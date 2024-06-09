<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageState } from './controller.js';
import { RenderState } from './render.jsx';
useControllerPage(ControllerPageState, RenderState);
</script>
