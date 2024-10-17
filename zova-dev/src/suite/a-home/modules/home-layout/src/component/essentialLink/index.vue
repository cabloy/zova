<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerEssentialLink, Props, Emits } from './controller.js';
import { RenderEssentialLink } from './render.jsx';
const props = withDefaults(defineProps<Props>(), ControllerEssentialLink.$propsDefault);
const emit = defineEmits<Emits>();
useController(props, emit, ControllerEssentialLink, RenderEssentialLink);
</script>
