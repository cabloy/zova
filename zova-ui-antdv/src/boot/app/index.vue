<template>
  <template></template>
</template>

<script setup lang="ts">
import { useControllerPage } from 'zova';
import { ControllerPageApp } from '../../../.zova/app/controller.js';
import { RenderApp } from '../../../.zova/app/render.jsx';
useControllerPage(ControllerPageApp, RenderApp);
</script>
