<template>
  <template></template>
</template>

<script setup lang="ts">
import { PartialSome, useController } from 'zova';
import { ControllerEssentialLink, Props, Emits } from './controller.js';
import { RenderEssentialLink } from './render.jsx';
const props = withDefaults(
  defineProps<PartialSome<Props, keyof typeof ControllerEssentialLink.$propsDefault>>(),
  ControllerEssentialLink.$propsDefault,
);
const emit = defineEmits<Emits>();
useController(props, emit, ControllerEssentialLink, RenderEssentialLink);
</script>
