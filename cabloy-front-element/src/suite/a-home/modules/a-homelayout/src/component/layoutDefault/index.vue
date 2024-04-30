<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front-core';
import { MotherLayoutDefault, Props, Emits } from './mother.js';
const props = withDefaults(defineProps<Props>(), MotherLayoutDefault.$propsDefault);
const emit = defineEmits<Emits>();
useMother(MotherLayoutDefault, props, emit);
</script>
