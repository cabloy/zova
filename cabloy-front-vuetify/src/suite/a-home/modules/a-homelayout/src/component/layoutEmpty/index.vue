<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherLayoutEmpty, Props, Emits } from './mother.js';
import { RenderLayoutEmpty } from './render.jsx';
const props = withDefaults(defineProps<Props>(), MotherLayoutEmpty.$propsDefault);
const emit = defineEmits<Emits>();
useMother(props, emit, MotherLayoutEmpty, RenderLayoutEmpty);
</script>
