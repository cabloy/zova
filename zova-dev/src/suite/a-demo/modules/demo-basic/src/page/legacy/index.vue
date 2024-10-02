<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageLegacy } from './controller.js';
import { RenderLegacy } from './render.jsx';
import { StyleLegacy } from './style.js';
useControllerPage(ControllerPageLegacy, RenderLegacy, StyleLegacy);
</script>
