<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageLocale } from './controller.js';
import { RenderLocale } from './render.jsx';
useControllerPage(ControllerPageLocale, RenderLocale);
</script>
