<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageApp } from './controller.js';
import { RenderApp } from './render.jsx';
useControllerPage(ControllerPageApp, RenderApp);
</script>
