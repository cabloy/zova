<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageErrorNotFound } from './controller.js';
import { RenderErrorNotFound } from './render.jsx';
useControllerPage(ControllerPageErrorNotFound, RenderErrorNotFound);
</script>
