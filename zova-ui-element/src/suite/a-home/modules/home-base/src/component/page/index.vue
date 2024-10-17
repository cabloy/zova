<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerPage, Props, Emits } from './controller.js';
import { RenderPage } from './render.jsx';
import { StylePage } from './style.js';
const props = withDefaults(defineProps<Props>(), ControllerPage.$propsDefault);
const emit = defineEmits<Emits>();
useController(props, emit, ControllerPage, RenderPage, StylePage);
</script>
