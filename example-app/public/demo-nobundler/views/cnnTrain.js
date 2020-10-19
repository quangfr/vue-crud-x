const template = /*html*/`
<div>
  <h1>CNN Training</h1>
  <div class="tabs">
    <ul>
      <li class="tab is-active"><a>CNN Job Submission</a></li>
    </ul>
  </div>

  <!-- CNN Job Submission Tab -->
  <div class="container" v-if="activeTab==='CNN Job Submission'">
    <p>Model Parameters</p>
    <p>Target train size will allow the algorithm to augment the train dataset</p>
    <div class="box">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <label class="label">Epochs</label>
          <input class="input" type="text" v-model="form.epochs">
        </div>
        <div class="control">
          <label class="label">Image Resize</label>
          <input class="input" type="number" v-model="form.imageResize">
        </div>
        <div class="control">
          <label class="label">Select CNN Architecture</label>
          <div class="select">
            <select v-model="form.cnnArchitecture">
              <option>cnn1</option>
              <option>cnn2</option>
              <option>cnn3</option>
              <option>lenet5</option>
              <option>vgg</option>
            </select>
          </div>
        </div>
        <div class="control">
          <label class="label">Greyscale</label>
          <label class="checkbox">
            <input type="checkbox"> 
          </label>
        </div>
        <div class="control">
          <label class="label">Test Ratio</label>
          <input type="range" min="0" max="11" v-model="form.testRatio">
        </div>
        <div class="control">
          <label class="label">Batch Size</label>
          <input class="input" type="number" v-model="form.batchSize">
        </div>
        <div class="control">
          <label class="label">Target Train Size</label>
          <input class="input" type="number" v-model="form.targetTrainSize">
        </div>
        
        <div class="control">
          <label class="label">Classification Type</label>
          <label class="radio"><input type="radio" name="img-class" value="multiclass" checked> Multi-class</label>
          <label class="radio"><input type="radio" name="img-class" value="multilabel"> Multi-label</label>
        </div>
      </div>
    </div>

    <label class="label">Give the path (in the server) to where folders of the images are stored</label>
    <div class="field has-addons">
      <div class="control">
        <a class="button is-info">
          Server Path…
        </a>
      </div>
      <div class="control is-expanded">
        <input class="input" type="text" v-model="form.serverPath">
      </div>
    </div>

    <div class="box">
      <div class="field is-grouped">
        <div class="control">
          <label class="label">Give a name to your job</label>
          <input class="input" type="text" v-model="form.jobName">
        </div>
        <div class="control" style="align-self:flex-end;">
          <button class="button is-link" @click.stop.prevent="submit">Run Job On TBD Images</button>
        </div>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-light">Refresh</button>
      </div>
    </div>

  </div>

</div>
`

const { onMounted, onUnmounted, ref, reactive } = Vue

export default {
  template,
  setup() {
    const activeTab = ref('CNN Job Submission')
    const imgClassRadio = ref('multiclass')
    const form = reactive({
      epochs: '',
      imageResize: '',
      cnnArchitecture: 'cnn1',
      testRatio: 0,
      batchSize: '',
      targetTrainSize: '',
      jobName: '',
      imgInputOption: '',
      serverPath: ''
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
    const changeImgClass = (e) => {
      imgClassRadio.value = e.target.value
    }
    onMounted(async () => {
      console.log('Dashboard mounted!')
      document.querySelectorAll('input[name="img-class"]').forEach((el) => el.addEventListener('change', changeImgClass))
      document.querySelectorAll('.tab').forEach((el) => el.addEventListener('click', clickTab))
    })
    onUnmounted(() => {
      document.querySelectorAll('input[name="img-class"]').forEach((el) => el.removeEventListener('change', changeImgClass))
      document.querySelectorAll('.tab').forEach((el) => el.removeEventListener('click', clickTab))
    })
    return {
      submit,
      form,
      activeTab,
      imgClassRadio
    }
  }
}
