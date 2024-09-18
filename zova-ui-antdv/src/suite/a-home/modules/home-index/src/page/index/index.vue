<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageIndex } from './controller.js';
import { RenderIndex } from './render.jsx';
import { StyleIndex } from './style.js';
useControllerPage(ControllerPageIndex, RenderIndex, StyleIndex);
</script>
