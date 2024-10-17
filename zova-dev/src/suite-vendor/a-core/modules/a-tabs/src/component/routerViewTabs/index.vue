<template>
  <template></template>
</template>

<script setup lang="ts">
import { PartialSome, useController } from 'zova';
import { ControllerRouterViewTabs, Props, Emits } from './controller.js';
import { RenderRouterViewTabs } from './render.jsx';
import { StyleRouterViewTabs } from './style.js';
const props = withDefaults(
  defineProps<PartialSome<Props, keyof typeof ControllerRouterViewTabs.$propsDefault>>(),
  ControllerRouterViewTabs.$propsDefault,
);
const emit = defineEmits<Emits>();
useController(props, emit, ControllerRouterViewTabs, RenderRouterViewTabs, StyleRouterViewTabs);
</script>
