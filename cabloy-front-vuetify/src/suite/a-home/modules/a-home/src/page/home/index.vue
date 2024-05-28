<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMotherPage } from '@cabloy/front';
import { MotherPageHome } from './controller.js';
import { RenderPageHome } from './render.jsx';
useMotherPage(MotherPageHome, RenderPageHome);
</script>
