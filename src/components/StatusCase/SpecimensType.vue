<template>
  <div class="inspection-result">
    <div v-if="specimensType ==='blood'">
      {{ $t('label.blood') }}
    </div>
    <div v-else-if="specimensType ==='sputum'">
      {{ $t('label.sputum') }}
    </div>
    <div v-else-if="specimensType ==='swab_nasofaring'">
      {{ $t('label.swab_nasofaring') }}
    </div>
    <div v-else-if="specimensType ==='swab_orofaring'">
      {{ $t('label.swab_orofaring') }}
    </div>
    <div v-else-if="specimensType ==='swab_naso_orofaring'">
      {{ $t('label.swab_naso_orofaring') }}
    </div>
    <div v-else>
      -
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpecimensType',
  props: {
    specimensType: {
      type: String,
      default: ''
    }
  }
}
</script>
