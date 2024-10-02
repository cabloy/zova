<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageRouteQuery } from './controller.js';
import { RenderRouteQuery } from './render.jsx';
import { StyleRouteQuery } from './style.js';
useControllerPage(ControllerPageRouteQuery, RenderRouteQuery, StyleRouteQuery);
</script>
