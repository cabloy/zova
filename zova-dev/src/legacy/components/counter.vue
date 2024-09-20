<script setup>
import { useCounter } from '../composables/counter.js';
const { count, increment, decrement } = useCounter();
</script>
<template>
  <div>
    <div>{{ count }}</div>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>
