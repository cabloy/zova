<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherPageHome } from './mother.js';
import { RenderPageHome } from './render.jsx';
useMother(MotherPageHome, RenderPageHome);
</script>
