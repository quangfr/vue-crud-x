const template = /*html*/`
<div>
  <h1>Predict / Infer</h1>
  <div class="tabs">
    <ul>
      <li class="tab is-active"><a>Image View</a></li>
      <li class="tab"><a>Table View</a></li>
    </ul>
  </div>

  <!-- Image View Tab -->
  <div class="container" v-if="activeTab==='Image View'">
    <div class="box">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <label class="label">Job Name</label>
          <input class="input" type="text" v-model="form.jobName">
        </div>

        <div class="control">
          <label class="label">Select CNN Model</label>
          <div class="select">
            <select>
              <option>CNN Model 1</option>
              <option>CNN Model 2</option>
            </select>
          </div>
        </div>

        <div class="control">
          <label class="label">Select yolov5 Model</label>
          <div class="select">
            <select>
              <option>yolov5 Model 1</option>
              <option>yolov5 Model 2</option>
            </select>
          </div>
        </div>

        <div class="control">
          <label class="label">Yolov5 Conf Threshold</label>
          <input class="input" type="number" v-model="form.yolov5ConfThreshold">
        </div>

        <div class="control">
          <label class="label">Image Input By</label>
          <label class="radio"><input type="radio" name="img-input-type" value="upload" checked> Upload</label>
          <label class="radio"><input type="radio" name="img-input-type" value="serverPath"> Server Path</label>
        </div>
      </div>
    </div>

    <div class="box">
      <div v-if="uploadRadio==='upload'" class="field">
        <label class="label">Choose files(s)</label>
        <div id="upload-file" class="file has-name is-fullwidth">
          <label class="file-label">
            <input class="file-input" type="file" name="work-images" multiple>
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Browse…
              </span>
            </span>
            <span class="file-name">
              Screen Shot 2017-07-29 at 15.54.25.png
            </span>
          </label>
        </div>
      </div>
      <div v-else>
        <label class="label">Set server path</label>
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
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click.stop.prevent="submit">Predict</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">Clear</button>
      </div>
    </div>
  </div>

  <!-- Table View Tab -->
  <div class="container" v-else-if="activeTab==='Table View'">
    <h1>Table View</h1>
  </div>
</div>
`

const { onMounted, onUnmounted, ref, reactive } = Vue

// const fileInput = document.querySelector('#file-js-example input[type=file]');
// fileInput.onchange = () => {
//   if (fileInput.files.length > 0) {
//     const fileName = document.querySelector('#file-js-example .file-name');
//     fileName.textContent = fileInput.files[0].name;
//   }
// }

export default {
  template,
  setup() {
    const activeTab = ref('Image View')
    const uploadRadio = ref('upload')
    const form = reactive({
      jobName: '',
      cnnModel: '',
      yolov5Model: '',
      yolov5ConfThreshold: 0,
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
    const changeImgInputType = (e) => {
      uploadRadio.value = e.target.value
    }
    onMounted(async () => {
      console.log('Dashboard mounted!')
      document.querySelectorAll('input[name="img-input-type"]').forEach((el) => el.addEventListener('change', changeImgInputType))
      document.querySelectorAll('.tab').forEach((el) => el.addEventListener('click', clickTab))
    })
    onUnmounted(() => {
      document.querySelectorAll('input[name="img-input-type"]').forEach((el) => el.removeEventListener('change', changeImgInputType))
      document.querySelectorAll('.tab').forEach((el) => el.removeEventListener('click', clickTab))
    })
    return {
      submit,
      form,
      activeTab,
      uploadRadio
    }
  }
}
