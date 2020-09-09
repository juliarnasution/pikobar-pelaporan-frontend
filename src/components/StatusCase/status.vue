<template>
  <div class="Status">
    <v-chip
      v-if="status === 'ODP'"
      class="ma-2"
      color="rgb(82, 143, 196)"
      outlined
    >
      {{ status }}
    </v-chip>
    <v-chip
      v-else-if="status === 'POSITIF'"
      class="ma-2"
      color="#EB5757"
      outlined
    >
      {{ status }}
    </v-chip>
    <v-chip
      v-else-if="status === 'PDP'"
      class="ma-2"
      color="rgb(255, 206, 79)"
      outlined
    >
      {{ status }}
    </v-chip>
    <v-btn
      v-else-if="status === 'CLOSECONTACT'"
      class="white--text btn-status"
      color="#27AE60"
    >
      {{ $t('route.tight_contact') }}
    </v-btn>
    <v-btn
      v-else-if="status === 'SUSPECT'"
      class="white--text btn-status"
      color="#F2994A"
    >
      {{ $t('label.suspect') }}
    </v-btn>
    <v-btn
      v-else-if="status === 'PROBABLE'"
      class="white--text btn-status"
      color="#2D9CDB"
    >
      {{ $t('label.probable') }}
    </v-btn>
    <v-btn
      v-else-if="status === 'CONFIRMATION'"
      class="white--text btn-status"
      color="#EB5757"
    >
      {{ $t('label.confirmation') }}
    </v-btn>
    <v-chip
      v-else-if="status === 'DISCARDED'"
      class="ma-2"
      color="rgb(172, 96, 11)"
      outlined
    >
      {{ $t('label.discarded') }}
    </v-chip>
    <v-chip
      v-else
      class="ma-2"
      color="rgba(0, 0, 0, 0.87)"
      outlined
    >
      {{ status }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'Status',
  props: {
    status: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
  .btn-status {
    font-size: 0.7rem !important;
    min-width: 90px !important;
    height: 30px !important;
    width: 100px;
  }
</style>
