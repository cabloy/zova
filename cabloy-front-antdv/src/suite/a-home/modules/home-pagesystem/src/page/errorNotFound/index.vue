<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMotherPage } from '@cabloy/front';
import { MotherPageErrorNotFound } from './controller.js';
import { RenderPageErrorNotFound } from './render.jsx';
useMotherPage(MotherPageErrorNotFound, RenderPageErrorNotFound);
</script>
