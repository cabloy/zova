<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageRouteParams } from './controller.js';
import { RenderRouteParams } from './render.jsx';
import { StyleRouteParams } from './style.js';
useControllerPage(ControllerPageRouteParams, RenderRouteParams, StyleRouteParams);
</script>
