<template>
  <div>
    <div class="upload_files_box">
      <div class="upload_input">
        <el-input
          v-model="fileName"
          disabled
          placeholder="请上传文件"
        />
      </div>
      <el-upload
        :show-file-list="false"
        :before-upload="beforeUpload"
        :http-request="uploadFile"
        action="#"
      >
        <el-button type="primary">选择文件</el-button>
      </el-upload>

    </div>

    <div class="upload_tip">
      您可以下载<a @click="download">数据模板</a>来准备数据后上传，也可以上传添加自己的文件
    </div>
  </div>
</template>

<script>
import { exportFile } from '@/utils/exportFile'
import { mapState, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
import { downloadTemplate } from '@/api/importFile'
export default {

  props: {
    isMember: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      fileName: ''
    }
  },
  computed: {
    ...mapState('importStep', ['batchNumber'])
  },

  methods: {
    ...mapActions('importStep',
      { takeNumber: 'takeBatchNumbers', queryImportCount: 'inTimeImportCounts' }
    ),
    ...mapMutations('importStep', ['SHOW_LOADING', 'HIDE_LOADING', 'FILE_URL']),
    beforeUpload(file) {
      const isText = file.type === 'application/vnd.ms-excel'
      const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      return (isText | isTextComputer)
    },
    // 上传文件
    uploadFile(item) {
      const fileObj = item.file
      const form = new FormData()
      // 文件对象
      form.append('file', fileObj)
      form.append('tid', 1)
      form.append('oid', 1)
      const config = {
        headers: {
          'Content-Type':
            'multipart/form-data;boundary = ' + new Date().getTime()
        }
      }
      var that = this
      axios
        .post('https://img.ishanshan.com/gimg/user/upload', form, config)
        .then(function(res) {
          if (res.status === 200) {
            that.FILE_URL(res.data.url)
            that.HIDE_LOADING()
            that.fileName = item.file.name
          }
        })
    },

    /** 下载 */
    download() {
      const data = {}
      this.isMember !== '会员导入' ? data.importType = 2 : data.importType = 1
      downloadTemplate(data).then(res => {
        exportFile(res, '', this.isMember + '模板')
      })
    },
    reset() {
      this.fileName = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.upload_files_box {
  display: flex;
  justify-content: center;
  margin: 30px 0 10px;
  .upload_input {
    width: 200px;
    margin-right: 10px;
  }
}
.upload_tip {
  font-size: 12px;
  text-align: center;
  margin-bottom: 14px;
  a {
    color: #46b6ee;
  }
}
</style>
