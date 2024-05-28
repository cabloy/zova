<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherLayoutDefault, Props, Emits } from './mother.js';
import { RenderLayoutDefault } from './render.jsx';
const props = withDefaults(defineProps<Props>(), MotherLayoutDefault.$propsDefault);
const emit = defineEmits<Emits>();
useMother(props, emit, MotherLayoutDefault, RenderLayoutDefault);
</script>
