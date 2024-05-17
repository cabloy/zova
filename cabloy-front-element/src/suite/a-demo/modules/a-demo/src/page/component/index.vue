<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMotherPage } from '@cabloy/front';
import { MotherPageComponent } from './mother.js';
import { RenderPageComponent } from './render.jsx';
useMotherPage(MotherPageComponent, RenderPageComponent);
</script>
