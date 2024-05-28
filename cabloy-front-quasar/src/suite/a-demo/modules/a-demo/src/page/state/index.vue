<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMotherPage } from '@cabloy/front';
import { MotherPageState } from './controller.js';
import { RenderPageState } from './render.jsx';
useMotherPage(MotherPageState, RenderPageState);
</script>
