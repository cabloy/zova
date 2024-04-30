<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front-core';
import { MotherLayoutEmpty, Props, Emits } from './mother.js';
const props = withDefaults(defineProps<Props>(), MotherLayoutEmpty.$propsDefault);
const emit = defineEmits<Emits>();
useMother(MotherLayoutEmpty, props, emit);
</script>
