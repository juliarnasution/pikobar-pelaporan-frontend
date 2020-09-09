<template>
  <div class="final-result">
    <div v-if="finalResult ==='0'">
      {{ $t('label.negatif') }}
    </div>
    <div v-else-if="finalResult ==='1'">
      {{ $t('label.recovery') }}
    </div>
    <div v-else-if="finalResult ==='2'">
      {{ $t('label.dead') }}
    </div>
    <div v-else-if="finalResult ==='3'">
      {{ $t('label.discarded') }}
    </div>
    <div v-else-if="finalResult ==='4'">
      {{ $t('label.still_sick') }}
    </div>
    <div v-else-if="finalResult ==='5'">
      {{ $t('label.still_quarantine') }}
    </div>
    <div v-else>
      -
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinalResult',
  props: {
    finalResult: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
 .final-result {
    padding: 0px 12px 12px 12px;
 }
</style>
