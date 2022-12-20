<template>
  <HealthBar :health="health" class="mt-6" />
  <p class="h2 mt-5">{{ feedback }}</p>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
import { useFeedbackStore } from '../stores/feedback';
import HealthBar from './HealthBar.vue';

  const feedbackStore = useFeedbackStore()
  const { health, feedback } = storeToRefs(feedbackStore)
</script>
