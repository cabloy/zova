<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerLayoutDefault, Props, Emits } from './controller.js';
import { RenderLayoutDefault } from './render.jsx';
const props = withDefaults(defineProps<Props>(), ControllerLayoutDefault.$propsDefault);
const emit = defineEmits<Emits>();
useController(props, emit, ControllerLayoutDefault, RenderLayoutDefault);
</script>
