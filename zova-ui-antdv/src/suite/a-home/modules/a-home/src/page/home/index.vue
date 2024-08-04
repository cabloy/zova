<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageHome } from './controller.js';
import { RenderHome } from './render.jsx';
import { StyleHome } from './style.js';
useControllerPage(ControllerPageHome, RenderHome, StyleHome);
</script>
