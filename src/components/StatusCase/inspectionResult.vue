<template>
  <div class="inspection-result">
    <div v-if="inspectionResult ==='reactif'">
      {{ $t('label.reaktif') }}
    </div>
    <div v-else-if="inspectionResult ==='non_reactif'">
      {{ $t('label.non_reaktif') }}
    </div>
    <div v-else-if="inspectionResult ==='positif'">
      {{ $t('label.positif') }}
    </div>
    <div v-else-if="inspectionResult ==='negatif'">
      {{ $t('label.negatif') }}
    </div>
    <div v-else-if="inspectionResult ==='inkonklusif'">
      {{ $t('label.inkonklusif') }}
    </div>
    <div v-else-if="inspectionResult ==='invalid'">
      {{ $t('label.invalid') }}
    </div>
    <div v-else-if="inspectionResult ==='on_progress'">
      {{ $t('label.in_process') }}
    </div>
    <div v-else>
      -
    </div>
  </div>
</template>

<script>
export default {
  name: 'InspectionResult',
  props: {
    inspectionResult: {
      type: String,
      default: ''
    }
  }
}
</script>
