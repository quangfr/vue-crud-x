const template = /*html*/`
<div>
  <div class="tabs">
    <ul>
      <li class="tab is-active"><a>Predict</a></li>
      <li class="tab"><a>Yolo Result</a></li>
      <li class="tab"><a>CNN Result</a></li>
    </ul>
  </div>

  <!-- Predict Tab -->
  <div class="container" v-if="activeTab==='Predict'">
    <predict-infer></predict-infer>
  </div>

  <!-- YoloResult Tab -->
  <div class="container" v-else-if="activeTab==='Yolo Result'">
    <yolo-result></yolo-result>
  </div>
  <!-- CnnResult Tab -->
  <div class="container" v-else-if="activeTab==='CNN Result'">
    <cnn-result></cnn-result>
  </div>

</div>
`

import YoloResult from './YoloResult.js'
import CnnResult from './CnnResult.js'
import PredictInfer from './PredictInfer.js'

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
  components: {
    'predict-infer': PredictInfer,
    'yolo-result': YoloResult,
    'cnn-result': CnnResult
  },
  setup() {
    const activeTab = ref('Predict')

    const clickTab = (e) => {
      activeTab.value = e.target.textContent
      document.querySelectorAll('.tab').forEach((el) => {
        el.classList.remove('is-active')
      })
      e.target.parentNode.classList.add('is-active')
    }
    onMounted(async () => {
      document.querySelectorAll('.tab').forEach((el) => el.addEventListener('click', clickTab))
    })
    onUnmounted(() => {
      document.querySelectorAll('.tab').forEach((el) => el.removeEventListener('click', clickTab))
    })
    return {
      activeTab
    }
  }
}
