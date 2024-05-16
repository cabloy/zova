<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherPageErrorNotFound } from './mother.js';
import { RenderPageErrorNotFound } from './render.jsx';
useMother(MotherPageErrorNotFound, RenderPageErrorNotFound);
</script>
