<template>
  <div class="answer-list">
    <div v-if="answer === 1">
      {{ $t('label.yes') }}
    </div>
    <div v-else-if="answer === 2">
      {{ $t('label.not') }}
    </div>
    <div v-else-if="answer === 3">
      {{ $t('label.dont_know') }}
    </div>
    <div v-else>
      -
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnswerList',
  props: {
    answer: {
      type: Number,
      default: 2
    }
  }
}
</script>
<style scoped>
 .answer-list {
    padding: 0px 12px 12px 12px;
 }
</style>
