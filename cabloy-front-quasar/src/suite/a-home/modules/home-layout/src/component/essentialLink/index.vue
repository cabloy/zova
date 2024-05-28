<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherEssentialLink, Props, Emits } from './mother.js';
import { RenderEssentialLink } from './render.jsx';
const props = withDefaults(defineProps<Props>(), MotherEssentialLink.$propsDefault);
const emit = defineEmits<Emits>();
useMother(props, emit, MotherEssentialLink, RenderEssentialLink);
</script>
