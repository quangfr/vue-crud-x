const template = /*html*/`

<div class="container">
  <vcxwc-loading-overlay v-if="loading"></vcxwc-loading-overlay>
  <div class="box">
    <h1>CNN Result</h1>
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
        <th v-for="hdrCol of results.head"><abbr :title="hdrCol">{{ hdrCol }}</abbr></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row of results.data">
        <td v-for="col of row">{{ col }}</td>
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
    const loading = ref(false)
    const selectedResult = ref('')
    const results = reactive({
      folders: [],
      head: [],
      data: []
    })

    const refreshList = async (e) => {
      if (loading.value) return
      loading.value = true
      try {
        const rv = await get('http://kuldldsccappo01.kul.apac.dell.com:8080/api/emerson/cnn/list')
        results.folders = [ ...rv.data.folders ]
        console.log(rv.data)
      } catch (e) {
        console.log(e.toString())
      }
      loading.value = false
    }

    const loadData = async () => {
      if (loading.value || !selectedResult) return
      loading.value = true
      try {
        const rv = await get('http://kuldldsccappo01.kul.apac.dell.com:8080/api/emerson/cnn/result/' + selectedResult.value)
        const [ head, ...data ] = rv.data.csv
        // console.log(rv.data)
        results.head = head
        results.data = data
        console.log(results)
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
      loadData
    }
  }
}
