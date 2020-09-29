<template>
  <div class="inspection-type">
    <div v-if="inspectionType ==='pcr'">
      {{ $t('label.pcr') }}
    </div>
    <div v-else-if="inspectionType ==='rapid'">
      {{ $t('label.rapid') }}
    </div>
    <div v-else-if="inspectionType ==='radiologi'">
      {{ $t('label.radiologi') }}
    </div>
    <div v-else-if="inspectionType ==='ct_scan'">
      {{ $t('label.ct_scan') }}
    </div>
    <div v-else-if="inspectionType ==='tcm_sars_cov_2'">
      {{ $t('label.tcm_sars_cov_2') }}
    </div>
    <div v-else>
      -
    </div>
  </div>
</template>

<script>
export default {
  name: 'InspectionType',
  props: {
    inspectionType: {
      type: String,
      default: ''
    }
  }
}
</script>
