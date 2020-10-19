const template = /*html*/`
<div>
  <h1>yolov5 Training</h1>
  <div class="tabs">
    <ul>
      <li class="tab is-active"><a>Yolo Job Submission</a></li>
    </ul>
  </div>

  <!-- Yolo Job Submission Tab -->
  <div class="container" v-if="activeTab==='Yolo Job Submission'">
    <p>This cannot be run on KUL server</p>
    <div class="box">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <label class="label">Give a name to your job</label>
          <input class="input" type="text" v-model="form.jobName">
        </div>
        <div class="control">
          <label class="label">Epochs</label>
          <input class="input" type="text" v-model="form.epochs">
        </div>
        <div class="control">
          <label class="label">Batch Size</label>
          <input class="input" type="number" v-model="form.batchSize">
        </div>
        <div class="control">
          <label class="label">Test Ratio</label>
          <input type="range" min="0" max="11" v-model="form.testRatio">
        </div>
        <div class="control">
          <label class="label">Adam</label>
          <label class="checkbox">
            <input type="checkbox"> 
          </label>
        </div>
      </div>
    </div>

    <label class="label">Path to image and label</label>
    <div class="field has-addons">
      <div class="control">
        <a class="button is-info">
          Path…
        </a>
      </div>
      <div class="control is-expanded">
        <input class="input" type="text" v-model="form.imgPath">
      </div>
    </div>

    <label class="label">Labels (comma seperated) Eg. a,b,c</label>
    <div class="field">
      <div class="control is-expanded">
        <input class="input" type="text" v-model="form.labels">
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click.stop.prevent="submit">Run Yolov5</button>
      </div>
      <div class="control">
        <button class="button" >Refresh Job List</button>
      </div>
    </div>

  </div>

</div>
`

const { onMounted, onUnmounted, ref, reactive } = Vue

export default {
  template,
  setup() {
    const activeTab = ref('Yolo Job Submission')
    const form = reactive({
      epochs: '',
      imageResize: '',
      cnnArchitecture: 'cnn1',
      testRatio: 0,
      batchSize: '',
      targetTrainSize: '',
      jobName: '',
      labels: '',
      imgPath: ''
    })

    const submit = (e) => {
      console.log('submit', form)
    }
    const clickTab = (e) => {
      activeTab.value = e.target.textContent
      document.querySelectorAll('.tab').forEach((el) => {
        el.classList.remove('is-active')
      })
      e.target.parentNode.classList.add('is-active')
    }
    onMounted(async () => {
      console.log('Dashboard mounted!')
      document.querySelectorAll('.tab').forEach((el) => el.addEventListener('click', clickTab))
    })
    onUnmounted(() => {
      document.querySelectorAll('.tab').forEach((el) => el.removeEventListener('click', clickTab))
    })
    return {
      submit,
      form,
      activeTab
    }
  }
}
