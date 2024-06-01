<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerCard, Props, Emits } from './controller.js';
import { RenderCard } from './render.jsx';
const props = withDefaults(defineProps<Props>(), ControllerCard.$propsDefault);
const emit = defineEmits<Emits>();
useController(props, emit, ControllerCard, RenderCard);
</script>
