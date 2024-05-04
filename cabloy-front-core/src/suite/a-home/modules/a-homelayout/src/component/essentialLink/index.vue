<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front-core';
import { MotherEssentialLink, Props, Emits } from './mother.js';
const props = withDefaults(defineProps<Props>(), MotherEssentialLink.$propsDefault);
const emit = defineEmits<Emits>();
useMother(MotherEssentialLink, props, emit);
</script>
