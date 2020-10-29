const template = /*html*/`

<div class="container">
  <vcxwc-loading-overlay v-if="loading"></vcxwc-loading-overlay>
  <sl-dialog :label="imageName" class="dialog-overview" :open="!!imageName" @sl-hide="imageName = ''">
    <img v-if="imageName" :src="'/emerson-results/yolo/' + selectedResult + '/' + imageName">
    <sl-button slot="footer" type="primary" @click="imageName = ''">Close</sl-button>
  </sl-dialog>
  <div class="box">
    <h1>Yolo Result</h1>
    <div class="field is-grouped">

      <div v-if="results.folders.length" class="control">
        <label class="label">Results List</label>
        <div class="select">
          <select v-model="selectedResult">
            <option v-for="result of results.folders">{{ result }}</option>
          </select>
        </div>
      </div>

      <div class="control" style="align-self:flex-end;">
        <button class="button is-link" @click.stop.prevent="refreshList">Refresh List</button>
      </div>
      <div class="control" style="align-self:flex-end;">
        <button class="button is-success" @click.stop.prevent="loadData" :disabled="!selectedResult">Load Data</button>
      </div>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th><abbr title="Name">File Name</abbr></th>
        <th><abbr title="Data">File Data</abbr></th>
        <th><abbr title="Img">Image</abbr></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file of results.files">
        <td>{{ file.image }}</td>
        <td v-html="file.txt"></td>
        <td>
          <a @click.stop.prevent="imageName = file.image"><img width="200" :src="'/emerson-results/yolo/' + selectedResult + '/' + file.image"></a>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`
import { post, get } from '../../lib/esm/http.js'
const { onMounted, onUnmounted, ref, reactive } = Vue

export default {
  template,
  setup() {
    const imageName = ref('')
    const loading = ref(false)
    const selectedResult = ref('')
    const results = reactive({
      folders: [],
      files: []
    })

    const refreshList = async (e) => {
      if (loading.value) return
      loading.value = true
      try {
        const rv = await get('http://kuldldsccappo01.kul.apac.dell.com:8080/api/emerson/yolo/list')
        results.folders = [ ...rv.data.folders ]
        console.log(rv.data)
      } catch (err) {
        console.log(e.toString())
      }
      loading.value = false
    }

    const loadData = async () => {
      if (loading.value || !selectedResult) return
      loading.value = true
      try {
        const rv = await get('http://kuldldsccappo01.kul.apac.dell.com:8080/api/emerson/yolo/result/' + selectedResult.value)
        results.files = [ ...rv.data.files ]
        console.log(rv.data)
      } catch (e) {
        console.log(e.toString())
      }
      loading.value = false
    }

    return {
      loading,
      selectedResult,
      results,
      refreshList,
      loadData,
      imageName
    }
  }
}
