<template>
  <v-dialog v-model="show" max-width="70%" :persistent="isLoading">
    <v-card>
      <v-card-title>
        {{ $t('label.import_case_report_data') }}
        <v-spacer />
        <v-icon @click="show = false">mdi-close</v-icon>
      </v-card-title>
      <v-divider />
      <v-card flat tile class="pa-5 mx-2">
        <v-card-text class="pa-0 mb-4 headline font-weight-medium">
          {{ $t('label.import_you_must_use_an_existing_excel_template') }}
          <a
            class="headline font-weight-medium"
            :href="importTemplateExcel"
            target="_blank"
          >{{ $t('label.download_excel_template_here') }}</a>
        </v-card-text>
        <div v-cloak @drop.prevent="onDrop" @dragover.prevent @click="openFile">
          <v-card height="100px" outlined class="d-flex align-center justify-center pa-3 import-container">
            <v-row v-if="selectedFile" align="center" justify="space-between">
              <v-col class="h3">{{ selectedFile.name }}</v-col>
              <v-col cols="3">
                <div>
                  <div class="d-flex h3">
                    <div v-if="progressCount" :class="errorType ? 'error--text':'success--text'">
                      {{ progressCount }}% {{ isLoading ? $t('label.import_loading'):`${ errorType ? $t('label.failed_import'):$t('label.success_import') }` }}
                    </div>
                    <div v-else>
                      ({{ selectedFile.size / 1000 }} {{ $t('label.kilobyte') }})
                    </div>
                    <v-btn icon :disabled="isLoading" @click="selectedFile = null">
                      <v-icon class="pb-1">mdi-close</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row v-else class="full-height" align="center" justify="center">
              <v-icon large class="mr-2" color="#27ae60">mdi-attachment</v-icon>
              <h2 class="import-container-text">{{ $t('label.drop_file_here') }}</h2>
            </v-row>
          </v-card>
          <input
            ref="uploader"
            class="d-none"
            type="file"
            accept=".xlsx"
            :disabled="isLoading"
            @input="onFileChanged"
          >
        </div>
        <v-row justify="end" class="mr-0 mt-4">
          <v-btn
            large
            color="success"
            :loading="isLoading"
            :disabled="selectedFile !== null ? false:true"
            @click="onImport"
          >
            {{ $t('label.import') }}
          </v-btn>
        </v-row>
      </v-card>
      <v-tabs
        v-model="tab"
        background-color="white"
      >
        <v-tab>{{ $t('label.usage_guide') }}</v-tab>
        <v-tab>{{ $t('label.terms_and_conditions') }}</v-tab>
        <v-tab>{{ $t('label.import_results') }} {{ errorList.length > 0 ? errorList.length:'' }}</v-tab>
        <v-tab-item>
          <v-card flat tile>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.usage_guide_import_1') }}</v-card-text>
            <v-card-text
              class="pa-0 px-10 py-2 font-weight-bold"
            >{{ $t('label.usage_guide_import_2') }}</v-card-text>
            <v-card-text
              class="pa-0 px-10 py-2 font-weight-bold"
            >{{ $t('label.usage_guide_import_3') }}</v-card-text>
            <v-card-text
              class="pa-0 px-10 py-2 font-weight-bold"
            >{{ $t('label.usage_guide_import_4') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.usage_guide_import_5') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.usage_guide_import_6') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.usage_guide_import_7') }}</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat tile>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.terms_and_conditions_import_1') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.terms_and_conditions_import_2') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.terms_and_conditions_import_3') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.terms_and_conditions_import_4') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.terms_and_conditions_import_5') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.terms_and_conditions_import_6') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.terms_and_conditions_import_7') }}</v-card-text>
            <v-card-text
              class="pa-0 px-4 py-2 font-weight-bold"
            >{{ $t('label.terms_and_conditions_import_8') }}</v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat tile>
            <div v-if="errorType === 'row' && !isLoading">
              <v-row
                v-for="row in errorList"
                :key="row.rowNumber"
                class="my-2 mx-1 pa-3 error-message"
              >
                <span class="font-weight-bold">{{ $t('label.data_in_row') }} {{ row.rowNumber }}</span>
                <span
                  v-for="(item, index) in row.data"
                  :key="item.columnName"
                >
                  <span class="ml-1">{{ item.description }}</span><span v-if="(index + 1) < row.data.length">,</span>
                </span>
              </v-row>
            </div>
            <div v-else-if="errorType === 'message' && !isLoading">
              <v-row class="my-2 mx-1 pa-3 error-message">{{ errorList }}</v-row>
            </div>
            <div v-else-if="successMessage" class="d-flex align-center pa-4 ma-5 import-container">
              <v-alert
                dense
                text
                type="success"
              >
                {{ successMessage }}
              </v-alert>
            </div>
            <v-card v-else height="100px" outlined class="d-flex align-center justify-center pa-4 ma-5 import-container">
              {{ $t('label.import_data_not_yet') }}
            </v-card>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-dialog>
</template>
<script>
import i18n from '@/lang'
export default {
  name: 'ImportForm',
  props: {
    showImportForm: {
      type: Boolean,
      default: false
    },
    refreshPage: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      tab: null,
      selectedFile: null,
      show: this.showImportForm,
      importTemplateExcel: process.env.VUE_APP_IMPORT_TEMPLATE,
      successMessage: null,
      errorMessage: null,
      failedDialog: false,
      isLoading: false,
      errorList: [],
      progressCount: null,
      errorType: null
    }
  },
  watch: {
    showImportForm(value) {
      this.show = value
      if (value) {
        this.selectedFile = null
        this.errorList = []
        this.errorType = null
      }
    },
    show(value) {
      this.$emit('update:show', value)
      if (!value) {
        this.selectedFile = null
        this.errorList = []
        this.errorType = null
      }
    },
    selectedFile(value) {
      if (value === null) {
        this.$refs.uploader.value = null
        this.errorList = []
        this.errorType = null
        this.progressCount = null
        this.successMessage = null
      }
    }
  },
  methods: {
    openFile() {
      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      const droppedFiles = e.target.files
      if (!droppedFiles) return
      this.selectedFile = droppedFiles[0]
    },
    onDrop(e) {
      const droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return
      if (
        droppedFiles[0].type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        this.selectedFile = droppedFiles[0]
      } else {
        this.errorMessage = i18n.t('errors.field_only_accepts_xlsx')
        this.failedDialog = true
        this.$emit('update:failed', this.failedDialog)
        this.$emit('update:message', this.errorMessage)
      }
    },
    onProgress(value) {
      this.progressCount = value
    },
    async onImport() {
      this.isLoading = true
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      const data = {
        formData,
        onProgress: this.onProgress
      }
      const response = await this.$store.dispatch('reports/importExcel', data)
      if (!response) {
        this.isLoading = false
        return
      }
      if (response.status === 200 || response.status === 201) {
        this.errorType = null
        this.tab = 2
        this.successMessage = `Berhasil mengimpor ${response.data.inserted} data laporan kasus`
        this.refreshPage()
      } else if (response.data.errors[0].rowNumber) {
        this.errorList = response.data.errors
        this.tab = 2
        this.errorType = 'row'
      } else {
        this.errorList = response.data.errors
        this.errorType = 'message'
      }
      this.isLoading = false
    }
  }
}
</script>
<style>
.active-class {
  background-color: #27ae60;
  color: white !important;
}
.import-container {
  background-color: #fafafa !important;
  cursor: pointer;
}
.full-height {
  height: 100% !important;
}
.import-container-text {
  color: #646464 !important;
}
.error-message {
  background-color: #fad8d8;
  border-radius: 10px;
  color: #eb3535;
}
</style>
