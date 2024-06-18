<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageLogin } from './controller.js';
import { RenderLogin } from './render.jsx';
import { StyleLogin } from './style.js';
useControllerPage(ControllerPageLogin, RenderLogin, StyleLogin);
</script>
