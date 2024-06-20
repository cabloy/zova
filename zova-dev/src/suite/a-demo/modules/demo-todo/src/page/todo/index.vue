<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageTodo } from './controller.js';
import { RenderTodo } from './render.jsx';
import { StyleTodo } from './style.js';
useControllerPage(ControllerPageTodo, RenderTodo, StyleTodo);
</script>
