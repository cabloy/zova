<template>
  <template></template>
</template>

<script setup lang="ts">
import { PartialSome, useController } from 'zova';
import { ControllerLayoutDefault, Props, Emits } from './controller.js';
import { RenderLayoutDefault } from './render.jsx';
const props = withDefaults(
  defineProps<PartialSome<Props, keyof typeof ControllerLayoutDefault.$propsDefault>>(),
  ControllerLayoutDefault.$propsDefault,
);
const emit = defineEmits<Emits>();
useController(props, emit, ControllerLayoutDefault, RenderLayoutDefault);
</script>
