<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageLocale } from './controller.js';
import { RenderPageLocale } from './render.jsx';
useControllerPage(ControllerPageLocale, RenderPageLocale);
</script>
