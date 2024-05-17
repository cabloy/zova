<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMotherPage } from '@cabloy/front';
import { MotherPageState } from './mother.js';
import { RenderPageState } from './render.jsx';
useMotherPage(MotherPageState, RenderPageState);
</script>
