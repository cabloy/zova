<script setup>
import { useCounter } from '@/composables/counter';
const { count, increment, decrement } = useCounter();
</script>
<template>
  <div>
    <div>{{ `count: ${count}` }}</div>
    <button class="btn btn-primary" @click="increment">Increment</button>
    <button class="btn btn-secondary" @click="decrement">Decrement</button>
  </div>
</template>
