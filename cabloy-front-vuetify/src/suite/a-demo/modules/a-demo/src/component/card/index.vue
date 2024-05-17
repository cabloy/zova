<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherCard, Props, Emits } from './mother.js';
import { RenderCard } from './render.jsx';
const props = withDefaults(defineProps<Props>(), MotherCard.$propsDefault);
const emit = defineEmits<Emits>();
useMother(props, emit, MotherCard, RenderCard);
</script>
