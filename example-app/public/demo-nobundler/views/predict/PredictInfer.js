const template = /*html*/`
<vcxwc-loading-overlay v-if="loading"></vcxwc-loading-overlay>
<div class="box">
  <h1>Predict / Infer</h1>
  <div class="field is-grouped is-grouped-multiline">
    <div class="control">
      <label class="label">Job Name</label>
      <input class="input" type="text" v-model="form.jobName">
    </div>
    <div class="control">
      <label class="label">Select CNN Model</label>
      <div class="select">
        <select v-model="form.cnnModelList">
          <option v-for="model of cnnModels">{{ model }}</option>
        </select>
      </div>
    </div>
    <div class="control">
      <label class="label">Select yolov5 Model</label>
      <div class="select">
        <select v-model="form.yolov5Model">
          <option v-for="model of yolov5Models">{{ model }}</option>
        </select>
      </div>
    </div>
    <div class="control">
      <label class="label">Yolov5 Conf Threshold</label>
      <input class="input" type="number" v-model="form.yolov5ConfThreshold">
    </div>
    <div class="control">
      <label class="label">Image Input By</label>
      <label class="radio"><input type="radio" name="img-input-type" value="upload" v-model="form.imgInputOption" checked> Upload</label>
      <label class="radio"><input type="radio" name="img-input-type" value="imgPath" v-model="form.imgInputOption"> Server Path</label>
    </div>
  </div>
</div>

<div class="box">
  <div v-if="form.imgInputOption==='upload'" class="field">
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
        <input class="input" type="text" v-model="form.imgPath">
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
`
import { post, get } from '../../lib/esm/http.js'

const { onMounted, onUnmounted, ref, reactive } = Vue

export default {
  template,
  setup() {
    const loading = ref(false)

    const uploadRadio = ref('imgPath')
    const form = reactive({
      jobName: '',
      cnnModelList: 'fnb_multiclass_lenet5',
      yolov5Model: '', // 'fnb_yolov5',
      yolov5ConfThreshold: 0.4,
      imgInputOption: 'imgPath',
      imgPath: '/dscco_nfs/shiny-server/public/Emerson/www/Data/FlangeAndBolt/TrainingSet/316_CS_Bolt'
    })

    const yolov5Models = [
      '_20201014_1315',
      'cosmetic_20201008',
      'cosmetic_yolov5',
      'fnb_yolov5',
      'fnb_yolov5_dup',
      'test_20201013_0724',
      'test_20201014_1514',
      'test_20201014_1528',
      'wiretag_20201008',
      'yolov5l_wiretag'
    ]

    const cnnModels = [
      'fnb_multiclass_lenet5',
      'fnb_multiclass_cnn3',
      'fnb_multiclass_lanet5',
      'gh_test_201009_0008',
      'gh_test_201009_0016',
      'gh_test_201009_0022',
      'gh_test_201014_1214',
      'gh_test_201016_1018',
      'gh_test_201016_1019',
      'gh_test_201016_1020',
      'gh_test_201016_1021',
      'sg_test_201008_1139',
      'wiretag_cnn2_full',
      'wiretag_cnn2_full',
      'wiretag_lenet5_full',
    ]

    const submit = async (e) => {
      if (loading.value) return
      loading.value = true
      console.log('submit', form)
      try {
        const rv = await post('http://kuldldsccappo01.kul.apac.dell.com:8080/api/emerson', {
          jobName: form.jobName,
          cnnModelList: form.cnnModelList,
          yolov5Model: form.yolov5Model,
          yolov5ConfThreshold: form.yolov5ConfThreshold,
          imgPath: '/dscco_nfs/shiny-server/public/Emerson/www/Data/FlangeAndBolt/TrainingSet/316_CS_Bolt'
        })
        console.log(rv)
      } catch (err) {
        // alert('Error', err.toString())
      }
      loading.value = false
    }

    const changeImgInputType = (e) => {
      uploadRadio.value = e.target.value
    }
    onMounted(async () => {
      document.querySelectorAll('input[name="img-input-type"]').forEach((el) => el.addEventListener('change', changeImgInputType))
    })
    onUnmounted(() => {
      document.querySelectorAll('input[name="img-input-type"]').forEach((el) => el.removeEventListener('change', changeImgInputType))
    })
    return {
      loading,
      submit,
      form,
      uploadRadio,
      yolov5Models,
      cnnModels
    }
  }
}
