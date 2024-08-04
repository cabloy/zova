<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageItem } from './controller.js';
import { RenderItem } from './render.jsx';
import { StyleItem } from './style.js';
useControllerPage(ControllerPageItem, RenderItem, StyleItem);
</script>
