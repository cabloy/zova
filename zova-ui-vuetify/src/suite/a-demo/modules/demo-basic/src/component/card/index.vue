<template>
  <template></template>
</template>

<script setup lang="ts">
import { PartialSome, useController } from 'zova';
import { ControllerCard, Props, Emits } from './controller.js';
import { RenderCard } from './render.jsx';
const props = withDefaults(
  defineProps<PartialSome<Props, keyof typeof ControllerCard.$propsDefault>>(),
  ControllerCard.$propsDefault,
);
const emit = defineEmits<Emits>();
useController(props, emit, ControllerCard, RenderCard);
</script>
