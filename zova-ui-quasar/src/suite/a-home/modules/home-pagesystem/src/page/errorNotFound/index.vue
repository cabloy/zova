<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageErrorNotFound } from './controller.js';
import { RenderPageErrorNotFound } from './render.jsx';
useControllerPage(ControllerPageErrorNotFound, RenderPageErrorNotFound);
</script>
