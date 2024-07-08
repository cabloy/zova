<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageRouteQuery2 } from './controller.js';
import { RenderRouteQuery2 } from './render.jsx';
import { StyleRouteQuery2 } from './style.js';
useControllerPage(ControllerPageRouteQuery2, RenderRouteQuery2, StyleRouteQuery2);
</script>
