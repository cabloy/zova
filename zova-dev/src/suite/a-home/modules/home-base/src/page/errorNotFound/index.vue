<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageErrorNotFound } from './controller.js';
import { RenderErrorNotFound } from './render.jsx';
import { StyleErrorNotFound } from './style.js';
useControllerPage(ControllerPageErrorNotFound, RenderErrorNotFound, StyleErrorNotFound);
</script>
