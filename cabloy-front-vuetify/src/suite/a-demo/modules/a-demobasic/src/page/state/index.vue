<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherPageState } from './mother.js';
import { RenderPageState } from './render.jsx';
useMother(MotherPageState, RenderPageState);
</script>
