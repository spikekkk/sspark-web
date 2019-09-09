<template>
  <div class="register_form">
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      title="会员注册"
      width="400px"
      @close="cancleAddShow('dataForm')"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="dataForm"
        label-position="right"
        label-width="90px"
      >
        <div class="item_title">个人信息</div>
        <el-form-item
          label="姓名"
          prop="userName"
        >
          <el-input
            v-model="dataForm.userName"
            size="mini"
          />
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="tel"
        >
          <el-input
            v-model="dataForm.tel"
            type="text"
            size="mini"
          />
        </el-form-item>

        <el-form-item
          label="性别"
          prop="sex"
        >
          <el-radio-group v-model="dataForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <div>
          <div
            v-for="(child,index) in dataForm.childs"
            :key="index"
            class="childTables"
          >
            <div class="baby_middel_line" />
            <div class="baby_item_title">宝宝信息</div>
            <div
              class="baby_delete"
              @click="deleteChild(index)"
            >删除</div>
            <el-form-item
              ref="upload"
              :prop="'childs.' + index + '.photo'"
              label="宝宝照片"
            >
              <el-upload
                disabled
                class="avatar-uploader"
                action="xxx"
              > <i
                v-if="child.photo"
                class="el-icon-circle-close-outline hover_icon"
                @click="getMedia(index)"
              />
                <img
                  v-if="child.photo"
                  :src="child.photo"
                  class="avatar child_photo"
                  @click="getMedia(index)"
                >

                <i
                  v-else
                  slot="trigger"
                  class="el-icon-plus avatar-uploader-icon"
                  @click="getMedia(index)"
                />
              </el-upload>

            </el-form-item>

            <el-form-item
              :prop="'childs.' + index + '.name'"
              :rules="{
                required: true, message: '宝宝姓名不能为空', trigger: 'blur'
              }"
              label="宝宝姓名"
            >
              <el-input
                v-model="child.name"
                size="mini"
              />
            </el-form-item>

            <el-form-item
              :prop="'childs.' + index + '.sex'"
              :rules="{
                required: true, message: '请选择宝宝性别', trigger: 'blur'
              }"
              label="宝宝性别"
            >
              <el-radio-group v-model="child.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              :prop="'childs.' + index + '.birthday'"
              :rules="{
                required: true, message: '请选择宝宝生日', trigger: 'change'
              }"
              label="宝宝生日"
            >
              <el-date-picker
                v-model="child.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择宝宝生日"
                @blur="setBirthday(index,child)"
              />
            </el-form-item>
          </div>
        </div>
        <div class="add_child">
          <el-button
            icon="el-icon-plus"
            plain
            size="mini"
            @click="addChild"
          >添加宝宝</el-button>
        </div>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          plain
          @click="cancleAddShow('dataForm')"
        >取消</el-button>
        <el-button
          v-repeatdely="2000"
          type="primary"
          size="mini"
          @click="Register('dataForm')"
        >确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="cameraDialog"
      :modal-append-to-body="false"
      class="cameradialog"
      title="拍照"
      width="900px"
      height="600px"
      @close="cancleCamera"
    >
      <div>
        <video
          id="video"
          ref="videoBox"
          width="400px"
          height="400px"
          autoplay="autoplay"
        />
        <canvas
          id="canvas"
          ref="canvasBox"
          width="400px"
          height="400px"
        />

        <el-button
          v-repeatdely="2000"
          id="snap"
          type="primary"
          size="mini"
          @click="takePhoto"
        >拍照</el-button>
      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          plain
          @click="cancleCamera()"
        >取消</el-button>
        <el-button
          v-repeatdely="2000"
          type="primary"
          size="mini"
          @click="submitCamera()"
        >提交照片</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addCustomer } from '@/api/checkstand/connect'

import axios from 'axios'

export default {
  data() {
    return {
      canvasPhone: '',

      mediaStreamTrack: null,
      childIndex: '',
      dataForm: {
        userName: '', // 姓名
        tel: '', // 手机号
        sex: '', // 性别
        childs: [
          { photo: '',
            name: '',
            sex: '',
            birthday: ''
          }
        ]
      },
      rules: {
        userName: [
          {
            required: true,
            message: '请输入会员姓名',
            trigger: 'blur'
          }
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/,

            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ]
      },
      dialogVisible: false, // 弹窗显示
      cameraDialog: false,
      childs: []
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
      this.babylist = []
    },
    /* 取消*/
    cancleAddShow(formName) {
      this.dialogVisible = false
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })

      this.dataForm.childs = [
        {
          name: '',
          sex: '',
          photo: ''
        }
      ]
    },

    // 打开摄像头
    getMedia(index) {
      this.childIndex = index
      this.cameraDialog = true
      const constraints = {
        video: { width: 500, height: 500 },
        audio: false
      }
      // 获得video摄像头区域

      navigator.mediaDevices.getUserMedia(constraints).then(MediaStream => {
        this.mediaStreamTrack = MediaStream.getTracks()[0]
        this.$refs.videoBox.srcObject = MediaStream
        this.$refs.videoBox.play()
      })
    },
    takePhoto() {
      // 获得Canvas对象
      const video = document.getElementById('video')

      var ctx = this.$refs.canvasBox.getContext('2d')
      ctx.drawImage(video, 0, 0, 400, 400)

      var image = new Image()
      // eslint-disable-next-line
      image.src = canvas.toDataURL("image/jpeg", 1.0);

      this.canvasPhone = this.dataURLtoFile(image.src, 'ppap')
    },
    // 取消
    cancleCamera() {
      this.cameraDialog = false
      var cxt = this.$refs.canvasBox.getContext('2d')
      if (this.mediaStreamTrack) {
        this.mediaStreamTrack.stop()
      }

      cxt.clearRect(0, 0, 400, 400)
    },

    submitCamera() {
      if (!this.canvasPhone) {
        this.$message.error('请先拍照再上传！')
      } else {
        var formData = new FormData()
        formData.append('file', this.canvasPhone)
        const config = {
          headers: {
            'Content-Type':
              'multipart/form-data;boundary = ' + new Date().getTime()
          }
        }
        var that = this
        axios
          .post('https://imgsrc.ishanshan.com/gimg/upload', formData, config)
          .then(function(res) {
            if (res.status === 200) {
              that.dataForm.childs[that.childIndex].photo = res.data.url
              that.$nextTick(() => {
                that.cancleCamera()
              })
            }
          })
      }
    },

    // 将图片Base64 转成文件
    dataURLtoFile(dataurl, filename) {
      // eslint-disable-next-line
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },

    /* 新增孩子*/
    addChild() {
      const tempData = {
        name: '',
        sex: '',
        photo: '',
        birthday: ''
      }
      this.dataForm.childs.push(tempData)
    },
    /* 删除孩子*/
    deleteChild(index) {
      //  const index = this.userNav.childs.indexOf(row)
      this.dataForm.childs.splice(index, 1)
      // this.babylist.splice(index, 1)
    },

    setBirthday(index, val) {
      this.dataForm.childs.splice(index, val)
    },

    Register(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const tempData = Object.assign([], this.dataForm.childs)
          const params = {
            name: this.dataForm.userName,
            mobile: this.dataForm.tel,
            sex: this.dataForm.sex
          }

          if (tempData.length > 0 && tempData[0].name) {
            const key = 'childs'
            const value = JSON.stringify(tempData)
            params[key] = value
          }
          addCustomer(params).then(res => {
            if (res.errorCode === 9000) {
              this.dialogVisible = false
              this.$message.success(res.errorMessage)
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        } else {
          return false
        }
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.register_form /deep/ {
  .v-modal {
    opacity: 0.7;
  }
  .el-dialog {
    border-radius: 5px;
  }
  .el-dialog__header {
    padding: 11px 20px;
    border-radius: 5px 5px 0 0;
    background: #2d3d4c;
    text-align: start;
    .el-dialog__title {
      font-size: 16px;
      line-height: 14px;
      color: #fff;
    }
    .el-dialog__headerbtn {
      top: 16px;
      .el-dialog__close {
        color: #fff;
      }
    }
  }
  .el-dialog__body {
    padding: 20px 20px 30px !important;
    color: #606266;
    font-size: 14px;
    text-align: start;
    overflow: auto;
    max-height: 434px;
    .middel_line {
      width: 340px;
      border: #ddd solid 1px;
      margin: 20px 0 18px 10px;
    }
    .item_title {
      margin-bottom: 20px;
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 17px;
    }
    .baby_item_title {
      margin-bottom: 20px;
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 17px;
      display: inline-block;
    }

    .avatar-uploader .el-upload .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }

    .baby_delete {
      float: right;
      font-size: 12px;
      font-weight: 500;
      color: #5d9cec;
      cursor: pointer;
    }
    .baby_middel_line {
      width: 340px;
      border: 0.5px solid #ddd;
      margin: 20px 0 18px 10px;
    }
    .el-form-item {
      margin-bottom: 20px;
      .el-form-item__content,
      .el-form-item__label {
        line-height: 28px;
      }
      .el-form-item__error {
        padding-top: 2px;
      }
    }
    .el-form-item.is-success .el-input__inner {
      border-color: #dcdfe6;
    }
    .add_child {
      margin-top: 20px;
      .el-button--mini {
        border-color: #4887e6;
        color: #4887e6;
        border-radius: 5px;
      }
    }
  }
  .dialog-footer {
    .el-button--mini {
      border-radius: 5px;
    }
    .el-button--primary {
      border-color: #5d9cec;
      background: #5d9cec;
      padding: 7px 17px;
    }
    .el-button.is-plain {
      padding: 7px 17px;
    }
  }

  .cameradialog {
    .el-dialog__body {
      max-height: 490px;
    }

    .el-dialog {
      margin-top: 4vh !important;
    }
  }

  #canvas {
    padding-left: 48px;
  }
  .hover_icon {
    display: none;
    position: absolute;
    font-size: 30px;
    bottom: 0;
    right: 31%;
    color: #fff;
  }
}

.avatar:hover .hover_icon {
  color: red;
}
</style>

