<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerLayoutEmpty, Props, Emits } from './controller.js';
import { RenderLayoutEmpty } from './render.jsx';
const props = withDefaults(defineProps<Props>(), ControllerLayoutEmpty.$propsDefault);
const emit = defineEmits<Emits>();
useController(props, emit, ControllerLayoutEmpty, RenderLayoutEmpty);
</script>
