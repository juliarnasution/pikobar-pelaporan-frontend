<template>
  <v-row
    v-show="false"
  >
    <v-col>
      <v-skeleton-loader
        :loading="loading"
        type="article"
      >
        <v-card
          class="mx-auto"
          outlined
        >
          <v-list-item two-line style="background-color: #eb5757">
            <v-list-item-content>
              <v-list-item-title style="color: #FFFFFF;">{{ $t('label.total_case_confirmed').toUpperCase() }}</v-list-item-title>
              <v-list-item-title class="headline mb-1 font-weight-bold" style="color: #FFFFFF;">{{ totalConfirmation }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col>
      <v-skeleton-loader
        :loading="loading"
        type="article"
      >
        <v-card
          class="mx-auto"
          style="border: 2px solid #F2C94C;"
          outlined
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{ $t('label.total_probable').toUpperCase() }}</v-list-item-title>
              <v-list-item-title class="headline mb-1 font-weight-bold">{{ totalProbable }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col>
      <v-skeleton-loader
        :loading="loading"
        type="article"
      >
        <v-card
          class="mx-auto"
          style="border: 2px solid #27AE60;"
          outlined
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('label.total_suspect').toUpperCase() }}
              </v-list-item-title>
              <v-list-item-title class="headline mb-1 font-weight-bold">{{ totalSuspect }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-skeleton-loader>
    </v-col>
    <v-col>
      <v-skeleton-loader
        :loading="loading"
        style="border: 2px solid #2D9CDB;"
        type="article"
      >
        <v-card
          class="mx-auto"
          outlined
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('label.total_close_contact').toUpperCase() }}
              </v-list-item-title>
              <v-list-item-title class="headline mb-1 font-weight-bold">{{ totalCloseCase }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'CaseCard'
}
</script>
