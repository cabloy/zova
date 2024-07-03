<template>
  <template></template>
</template>

<script setup lang="ts">
import { useController } from 'zova';
import { ControllerRouterViewTabs, Props, Emits } from './controller.js';
import { RenderRouterViewTabs } from './render.jsx';
import { StyleRouterViewTabs } from './style.js';
const props = withDefaults(defineProps<Props>(), ControllerRouterViewTabs.$propsDefault);
const emit = defineEmits<Emits>();
useController(props, emit, ControllerRouterViewTabs, RenderRouterViewTabs, StyleRouterViewTabs);
</script>
