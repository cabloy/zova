<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherPageComponent } from './mother.js';
import { RenderPageComponent } from './render.jsx';
useMother(MotherPageComponent, RenderPageComponent);
</script>
