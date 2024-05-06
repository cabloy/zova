<template>
  <template></template>
</template>

<script setup lang="ts">
import { useMother } from '@cabloy/front';
import { MotherCard, Props, Emits } from './mother.js';
const props = withDefaults(defineProps<Props>(), MotherCard.$propsDefault);
const emit = defineEmits<Emits>();
useMother(MotherCard, props, emit);
</script>
