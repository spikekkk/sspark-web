<template>
  <div class="edit_box">
    <div class="edit_game_left">
      <img :src="gameDetail.showImg">
    </div>
    <div class="edit_game_right">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        class="demo-ruleForm"
      >
        <div class="block_title">
          <span class="icon_title" /><span>基础设置 </span>
        </div>
        <el-form-item
          label="游戏名称"
          prop="gameName"
        >
          <el-input v-model="ruleForm.gameName" />
        </el-form-item>

        <el-form-item
          label="开始时间"
          prop="startTime"
        >
          <el-date-picker
            :disabled="activeName === 'second'"
            v-model="ruleForm.startTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item
          label="结束时间"
          prop="endTime"
        >
          <el-date-picker
            v-model="ruleForm.endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item
          label="背景音乐"
          prop="musicUrl"
        >
          <el-button
            v-if="fileList.length !== 0"
            size="small"
            type="primary"
            @click="resetMusic"
          >恢复默认音乐</el-button>
          <el-upload
            :on-change="handleChange"
            :file-list="fileList"
            :limit="1"
            :on-remove="handleMusicRemove"
            :before-upload="beforeMusicUpload"
            :before-remove="beforeRemove"
            :on-success="handleMusicSuccess"
            action="https://img.ishanshan.com/gimg/user/upload"
          >
            <el-button
              v-if="fileList.length === 0"
              size="small"
              type="primary"
            >点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >
              游戏主页的背景音乐, 文件大小≤2M
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="businessTel"
        >
          <el-input
            v-model="ruleForm.businessTel"
            placeholder="请准确填写机构联系电话, 方便用户联系"
          />
        </el-form-item>
        <div class="block_title">
          <span class="icon_title" /><span> 说明配置</span>
        </div>
        <el-form-item
          label="游戏规则"
          prop="gameRule"
        >
          <el-input
            v-model="ruleForm.gameRule"
            rows="5"
            type="textarea"
          />
          <span class="form_tips">请输入游戏规则1-500字</span>
        </el-form-item>

        <el-form-item
          label="机构介绍"
          prop="orgIntro"
        >
          <el-input
            v-model="ruleForm.orgIntro"
            rows="5"
            type="textarea"
          />
        </el-form-item>

        <el-form-item
          label="机构图片"
          prop="orgImg"
        >
          <el-upload
            :show-file-list="false"
            :on-success="handleOrgImgSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="https://imgsrc.ishanshan.com/gimg/upload"
          >
            <img
              v-if="ruleForm.orgImg"
              :src="ruleForm.orgImg"
              class="avatar"
            >
            <i
              v-else
              slot="trigger"
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>

        <div class="block_title">
          <span class="icon_title" /><span> 奖品设置 </span>
          <span style="margin-left:53px">
            <el-button
              v-if="gameDetail.gameCode !== 'bargain'"
              :disabled="activeName === 'second'"
              type="primary"
              @click="addTab(editableTabsValue)"
            >添加奖品</el-button>
          </span>
        </div>

        <el-tabs
          v-if="gameDetail.gameCode !== 'bargain'"
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="(item, index) in ruleForm.gameAward"
            :key="index"
            :label="'奖品' + addAwardNum(index)"
            :name="'' + index"
          >
            <el-form-item
              :prop="'gameAward.' + index + '.status'"
              label="奖品类型"
            >
              <el-select
                :disabled="activeName === 'second'"
                v-model="item.status"
                placeholder="请选择奖品类型"
                @change="getSelect(item.status)"
              >
                <el-option
                  label="实物"
                  value="1"
                />
                <el-option
                  label="谢谢惠顾"
                  value="0"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="item.status == 1"
              :prop="'gameAward.' + index + '.awardTitle'"
              :rules="{
                required: true,
                message: '请输入奖品名称',
                trigger: 'blur'
              }"
              label="奖品名称"
            >
              <el-input
                :disabled="activeName === 'second'"
                v-model="item.awardTitle"
                type="textarea"
              />
            </el-form-item>
            <el-form-item
              v-if="item.status == 1"
              :prop="'gameAward.' + index + '.awardIntro'"
              label="奖品简介"
            >
              <el-input
                v-model="item.awardIntro"
                type="textarea"
              />
            </el-form-item>
            <el-form-item
              v-if="item.status == 1"
              :prop="'gameAward.' + index + '.awardImg'"
              label="奖品图片"
            >
              <el-upload
                :show-file-list="false"
                :on-success="handleAwardSuccess"
                :before-upload="beforeAvatarUpload"
                class="avatar-uploader"
                action="https://imgsrc.ishanshan.com/gimg/upload"
              >
                <img
                  v-if="item.awardImg"
                  :src="item.awardImg"
                  class="avatar"
                  @click="getIndex(index)"
                >
                <i
                  v-else
                  slot="trigger"
                  class="el-icon-plus avatar-uploader-icon"
                  @click="getIndex(index)"
                />
              </el-upload>
            </el-form-item>
            <el-form-item
              v-if="item.status == 1"
              :rules="{
                required: true,
                message: '请输入中奖概率',
                trigger: 'blur'
              }"
              :prop="'gameAward.' + index + '.winRate'"
              label="中将概率"
            >
              <el-input
                v-model="item.winRate"
                placeholder="请输入中将概率"
              >
                <template slot="append">%</template>
              </el-input>
              <span class="form_tips">如中奖率为3，则每100次抽奖有3次中奖。所有奖品的中奖概率之和须在1-100之间</span>
            </el-form-item>

            <el-form-item
              v-if="item.status == 1"
              :prop="'gameAward.' + index + '.awardNum'"
              :rules="{
                required: true,
                message: '请输入奖品数量',
                trigger: 'blur'
              }"
              label="奖品数量"
            >
              <el-input
                v-model="item.awardNum"
                placeholder="请输入奖品数量"
              />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <!-- 砍价----奖项 -->
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="奖品名称"
          prop="awardTitle"
        >
          <el-input
            v-model="ruleForm.awardTitle"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="奖品简介"
          prop="awardIntro"
        >
          <el-input
            v-model="ruleForm.awardIntro"
            type="textarea"
          />
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="奖品图片"
          prop="awardImg"
        >
          <el-upload
            :show-file-list="false"
            :on-success="handleBargainSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="https://imgsrc.ishanshan.com/gimg/upload"
          >
            <img
              v-if="ruleForm.awardImg"
              :src="ruleForm.awardImg"
              class="avatar"
            >
            <i
              v-else
              slot="trigger"
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="奖品数量"
          prop="awardNum"
        >
          <el-input
            v-model="ruleForm.awardNum"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="原价"
          prop="basePrice"
        >
          <el-input
            :disabled="activeName === 'second'"
            v-model="ruleForm.basePrice"
            type="number"
            placeholder="请输入原价"
          />
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="底价"
          prop="realPrice"
        >
          <el-input
            :disabled="activeName === 'second'"
            v-model="ruleForm.realPrice"
            placeholder="请输入底价"
          />
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="砍价次数"
          prop="cutNum"
        >
          <el-input
            :disabled="activeName === 'second'"
            v-model="ruleForm.cutNum"
            placeholder="请输入砍价次数"
          />
          <span class="form_tips">从原价到底价一共要砍价的次数</span>
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="开启支付"
          prop="cutNum"
        >
          <el-radio-group
            v-model="ruleForm.payStatus"
            :disabled="activeName === 'second'"
          >
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <div
          v-if="gameDetail.gameCode !== 'bargain'"
          class="block_title"
        >
          <span class="icon_title" /> <span>派奖设置 </span>
        </div>
        <el-form-item
          v-if="gameDetail.gameCode !== 'bargain'"
          label="每人总抽奖次数"
          prop="raffleAllNum"
        >
          <el-input v-model="ruleForm.raffleAllNum" />
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode !== 'bargain'"
          label="每人每日抽奖次数"
          prop="raffleDayNum"
        >
          <el-input v-model.number="ruleForm.raffleDayNum" />
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode !== 'bargain'"
          label="每人中奖次数"
          prop="winUserNum"
        >
          <el-input v-model="ruleForm.winUserNum" />
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode !== 'bargain'"
          label="分享增加抽奖次数"
          prop="shareAddNum"
        >
          <el-radio-group v-model="ruleForm.shareAddNum">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          v-if="gameDetail.gameCode !== 'bargain'"
          prop="maxShareNum"
        >
          <el-input v-model="ruleForm.maxShareNum">
            <template slot="prepend">每天最多获得</template>
            <template slot="append">次</template>
          </el-input>
        </el-form-item>
        <div class="block_title">
          <span class="icon_title" /><span>表单配置 </span>
        </div>
        <el-form-item
          label="收集信息"
          prop="type"
        >
          <el-checkbox-group
            v-model="ruleForm.type"
            :disabled="activeName === 'second'"
            @change="handleFormCheck"
          >
            <el-checkbox label="babyName"> 姓名</el-checkbox>
            <el-checkbox label="babyBirthday">生日</el-checkbox>
            <el-checkbox label="tel">联系方式</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="block_title">
          <span class="icon_title" /> <span>分享配置 </span>
        </div>
        <el-form-item
          label="标题"
          prop="wxTitle"
        >
          <el-input
            v-model="ruleForm.wxTitle"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            :show-file-list="false"
            :on-success="handleShareSuccess"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="https://imgsrc.ishanshan.com/gimg/upload"
          >
            <img
              v-if="ruleForm.wxIcon"
              :src="ruleForm.wxIcon"
              class="avatar"
            >
            <i
              v-else
              slot="trigger"
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
        <el-form-item
          label="简介"
          prop="wxCon"
        >
          <el-input
            v-model="ruleForm.wxCon"
            rows="3"
            type="textarea"
            placeholder="请输入分享后的内容介绍，1~80字"
          />
          <span class="form_tips">请输入分享后的内容介绍，1~80字</span>
        </el-form-item>
        <div
          v-if="gameDetail.gameCode === 'bargain'"
          class="block_title"
        >
          <span class="icon_title" /> <span>防刷配置 </span>
        </div>
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="开启防刷"
          prop="status"
        >
          <el-radio-group
            v-model="ruleForm.status"
            :disabled="activeName === 'second'"
          >
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="防刷设置单位"
          prop="timeUnity"
        >
          <el-radio-group
            v-model="ruleForm.timeUnity"
            :disabled="ruleForm.status === '0' || activeName === 'second'"
          >
            <el-radio label="2">每天</el-radio>
            <el-radio label="3">每小时</el-radio>
            <el-radio label="5">每分钟</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="gameDetail.gameCode === 'bargain'"
          label="防刷设置次数"
          prop="num"
        >
          <el-input
            :disabled="ruleForm.status === '0' || activeName === 'second'"
            v-model="ruleForm.num"
            placeholder="请输入防刷次数"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { mapState, mapMutations } from 'vuex'
import { addGameInfo, addBargainGameInfo, bargainUpdateGameInfo, raffleUpdateGameInfo, queryFormConfig } from '@/api/sub/marketActivity'
export default {
  data() {
    var raffleDayNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('每人每日抽奖次数不能为空'))
      }
      setTimeout(() => {
        if (parseInt(value) > parseInt(this.ruleForm.raffleAllNum)) {
          callback(new Error('每人每日抽奖次数须小于或等于每人总抽奖次数'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      saveAwardImgIndex: '',
      editableTabsValue: '0',
      tabIndex: 0,
      shelves: false,
      ruleForm: {
        payStatus: '1',
        cutNum: 30, // 砍价次数
        basePrice: '3600', // 原价
        realPrice: '1', // 低价
        status: '1', // 防刷状态开启----0:关闭，1：开启
        num: '80', // 防刷次数
        timeUnity: '2', // 防刷单位
        gameName: '美吉姆派对大放送', // 游戏名称
        startTime: '', // 开始时间
        endTime: '',
        musicUrl: 'https://img.ishanshan.com/upload/1507964121304.mp3', // 音乐地址
        musicName: '默认音乐', // 音乐名称
        businessTel: '', // 联系方式
        raffleAllNum: 10, // 每人总抽奖数
        raffleDayNum: 3, // 每人每日抽奖次数
        winUserNum: 1, // 每人中将次数
        maxShareNum: 1, // 每天最多获得次数
        shareAddNum: '1', // 分享增加抽奖次数
        // 奖品图片
        gameAward: [{
          awardImg: '//img.ishanshan.com/gimg/img/1b0be232f08ad05c12ebb25e1b4f7662',
          winRate: 1, // 中奖概率
          awardTitle: '3600元超值早教大礼包', // 奖品名称
          awardIntro: '内含价值998的体验课2节 +2000元现金抵用券+上海迪斯尼门票2张！',
          awardNum: 500, // 奖品数量
          status: '1'// 奖品类型---1实物
        }],

        awardImg: '//img.ishanshan.com/gimg/img/1b0be232f08ad05c12ebb25e1b4f7662',
        winRate: 1, // 中奖概率
        awardTitle: '3600元超值早教大礼包', // 奖品名称
        awardIntro: '内含价值998的体验课2节 +2000元现金抵用券+上海迪斯尼门票2张！',
        awardNum: 500, // 奖品数量
        // awardLevel: '0', // 奖品类型---0实物

        id: '0',
        type: ['babyName', 'babyBirthday', 'tel'], // 收集信息
        wxTitle: '美吉姆圣诞大派送，多重好礼任你抽！', // 微信分享标题
        wxIcon: 'https://img.ishanshan.com/gimg/img/e345797943fc3fd3881c9f41ec40dd7f', // 分享图片
        // 分享内容
        wxCon: '美吉姆国际儿童教育中心致力于全面提升儿童整体素质,为0-6岁儿童提供最具想象力,创造力和科学的一站式儿童早期教育课程和服务',
        gameRule: '1、点击转盘中间的“开始抽奖”按钮进行抽奖2、转盘将会以逆时针方向迅速进行转动，当转盘停下后展示的结果即为抽奖结果3、中奖后需要进行验证才能领取奖品，中奖的奖品可在“我的奖品”中进行查看4、本活动仅限【美吉姆】滨江区校区，其余校区不参加5、本活动仅限滨康路附近校区3岁-6岁宝贝参加，新老会员不限6、每一位宝宝只能参加一次，如多个账号报名，不累计7、本活动内奖品仅用于试玩体验，所有奖品均不能进行兑换',
        orgIntro: '美吉姆 于1983年由威廉凯普林和谢尔曼夫妇共同努力合作创立，最初的两家中心位于加利福尼亚的圣莫尼卡市和范奈斯市。利用其在儿童早期教育、运动机能学、体育、舞蹈以及体操领域的专业经验，这几位创始人研发出了一套完整的符合孩子天性的课程体系和教学设备，旨在通过每周一次的结构性课程，帮助孩子构建强健的体魄，培养良好的社交能力，同时树立自尊心和自信心。',
        orgImg: 'https://img.ishanshan.com/gimg/img/f17b563c0dd9507877a3573915a9e53a'
      },
      gameFormId: '0',
      configForm: [{ label: '宝宝姓名', name: 'babyName', type: 'input',
        data: '', hide: 1, requier: 1, base: 1 },
      { label: '宝宝生日', name: 'babyBirthday', type: 'date',
        data: '', hide: 1, requier: 1, base: 1 },
      { label: '联系方式', name: 'tel', type: 'input',
        data: '', hide: 1, requier: 1, base: 1 }],
      fileList: [{
        name: '默认音乐',
        url: 'https://img.ishanshan.com/upload/1512991971764.mp3'
      }],
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        awardLevel: [
          { required: true, message: '请选择奖品类型', trigger: 'change' }
        ],

        awardNum: [
          { required: true, message: '请输入奖品数量', trigger: 'blur' }
        ],
        // winRate: [
        //   { required: true, message: '请输入中奖概率', trigger: 'blur' }

        // ],
        raffleDayNum: [
          { required: true, validator: raffleDayNum, trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '不允许小于零' }
        ],

        winUserNum: [
          { required: true, message: '每人中奖次数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '请填写大于0的整数' }
        ],

        shareAddNum: [
          { required: true, message: '选择分享是否增加抽奖次数', trigger: 'change' }
        ],
        businessTel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],

        endTime: [
          { type: 'string', required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        startTime: [
          { type: 'string', required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请选择收集信息', trigger: 'change' }
        ],
        rules: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapState('microGame', ['gameDetail', 'activeName', 'editGameDetail'])
  },
  mounted() {
    this.fetchGameDetail()
  },
  methods: {
    ...mapMutations('microGame', ['CHANGE_TAB', 'IS_CHANGE', 'RESET_GAME_DETAIL']),
    fetchGameDetail() {
      if (this.activeName === 'second') {
        const gameBase = JSON.parse(this.editGameDetail.gameBase)
        const gameConfig = JSON.parse(this.editGameDetail.gameConfig)

        // gameBase
        this.ruleForm.gameCode = gameBase.gameCode
        this.ruleForm.gameName = gameBase.gameName
        this.ruleForm.startTime = gameBase.startTime
        this.ruleForm.endTime = gameBase.endTime
        this.ruleForm.businessTel = gameBase.businessTel
        this.ruleForm.musicName = gameBase.musicName

        this.fileList[0].name = gameBase.musicName
        this.fileList[0].url = gameBase.musicUrl
        this.ruleForm.musicUrl = gameBase.musicUrl
        this.ruleForm.gameRule = gameBase.gameRule
        this.ruleForm.orgIntro = JSON.parse(gameBase.orgIntro)[0].value
        this.ruleForm.orgImg = JSON.parse(gameBase.orgIntro)[1].value
        this.ruleForm.wxTitle = gameBase.wxTitle
        this.ruleForm.wxIcon = gameBase.wxIcon
        this.ruleForm.wxCon = gameBase.wxCon
        this.ruleForm.type = []
        // 砍价游戏
        if (this.gameDetail.gameCode === 'bargain') {
          const gameDefense = JSON.parse(this.editGameDetail.gameDefense)
          const gameForm = JSON.parse(JSON.parse(this.editGameDetail.gameForm).configForm)
          // 砍价设置    gameDefense
          this.ruleForm.timeUnity = gameDefense.timeUnity
          this.ruleForm.num = gameDefense.num
          this.ruleForm.status = gameDefense.status + ''
          this.ruleForm.basePrice = gameConfig.basePrice
          this.ruleForm.realPrice = gameConfig.realPrice
          this.ruleForm.cutNum = gameConfig.cutNum
          this.ruleForm.payStatus = gameConfig.payStatus + ''

          this.ruleForm.awardTitle = gameConfig.awardName
          this.ruleForm.awardIntro = gameConfig.awardIntro
          this.ruleForm.awardImg = gameConfig.awardImg
          this.ruleForm.awardNum = gameConfig.awardNum
          this.ruleForm.winRate = gameConfig.winRate
          this.ruleForm.awardLevel = gameConfig.awardLevel
          this.ruleForm.type = []
          this.configForm = gameForm
          gameForm.forEach(e => {
            this.ruleForm.type.push(e.name)
          })
        } else {
          // queryFormConfig
          const gameAward = JSON.parse(this.editGameDetail.gameAward)
          // 抽奖设置   gameAward
          queryFormConfig({
            gameBaseId: gameBase.id
          }).then(res => {
            if (res.errorCode === 9000) {
              this.gameFormId = res.data.id
              const gameForm = JSON.parse(res.data.base_form)
              this.configForm = gameForm
              gameForm.forEach(e => {
                this.ruleForm.type.push(e.name)
              })
            }
          })
          // this.ruleForm.awardTitle = gameAward.awardTitle
          // this.ruleForm.awardIntro = gameAward.awardIntro
          // this.ruleForm.awardImg = gameAward.awardImg
          // this.ruleForm.awardNum = gameAward.awardNum
          // this.ruleForm.winRate = gameAward.winRate
          // this.ruleForm.status = gameAward.status
          // this.ruleForm.awardLevel = gameAward.awardLevel
          gameAward.forEach(v => {
            if (v.awardImg === '1') {
              v.status = '0'
            } else {
              v.status = '1'
            }
          })
          this.ruleForm.gameAward = gameAward
          this.ruleForm.raffleAllNum = gameConfig.raffleAllNum
          this.ruleForm.raffleDayNum = gameConfig.raffleDayNum
          this.ruleForm.winUserNum = gameConfig.winUserNum
          this.ruleForm.shareAddNum = gameConfig.shareAddNum
          this.ruleForm.maxShareNum = gameConfig.maxShareNum
        }
      }
    },
    addTab(targetName) {
      const newTabName = ++targetName + ''
      this.ruleForm.gameAward.push({
        awardImg: '//img.ishanshan.com/gimg/img/1b0be232f08ad05c12ebb25e1b4f7662',
        winRate: 1, // 中奖概率
        awardTitle: '3600元超值早教大礼包', // 奖品名称
        awardIntro: '内含价值998的体验课2节 +2000元现金抵用券+上海迪斯尼门票2张！',
        awardNum: 500, // 奖品数量
        status: '1'// 奖品类型---1实物
      })
      this.editableTabsValue = newTabName
    },
    removeTab(targetName) {
      if (this.activeName !== 'second') {
        if (this.ruleForm.gameAward.length === 1) {
          this.$message.warning('至少提供一个奖品')
        } else {
          const tabs = this.ruleForm.gameAward
          const activeName = this.editableTabsValue
          tabs.splice(targetName, 1)

          this.ruleForm.gameAward = Object.assign([], tabs)

          this.editableTabsValue = activeName - 1 + ''
        }
      } else {
        this.$message.warning('游戏创建成功后不允许添加或删除奖品项目')
      }
    },
    getIndex(index) {
      this.saveAwardImgIndex = index
    },
    getSelect(val) {
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // eslint-disable-next-line
          if (this.ruleForm.awardLevel == 1 && this.ruleForm.raffleAllNum == 1 && this.ruleForm.raffleDayNum == 1 && this.ruleForm.winUserNum == 1) {
            this.$message.warning('奖品总中奖概率不能小于1% ')
          } else {
            const gameBase = {
              id: '0',
              gameCode: this.gameDetail.gameCode,
              gameName: this.ruleForm.gameName,
              startTime: this.ruleForm.startTime,
              endTime: this.ruleForm.endTime,
              businessTel: this.ruleForm.businessTel,
              musicName: this.ruleForm.musicName,
              musicUrl: this.ruleForm.musicUrl,
              gameRule: this.ruleForm.gameRule,
              orgIntro: JSON.stringify([{ type: 'text', value: this.ruleForm.orgIntro }, { type: 'img', value: this.ruleForm.orgImg }]),
              wxTitle: this.ruleForm.wxTitle,
              wxIcon: this.ruleForm.wxIcon,
              wxCon: this.ruleForm.wxCon
            }

            const gameDefense = {
              id: '0',
              timeUnity: this.ruleForm.timeUnity,
              num: this.ruleForm.num,
              status: this.ruleForm.status
            }
            const bargainConfig = {
              id: '0',
              awardName: this.ruleForm.awardTitle,
              awardIntro: this.ruleForm.awardIntro,
              awardImg: this.ruleForm.awardImg,
              awardNum: this.ruleForm.awardNum,
              basePrice: this.ruleForm.basePrice,
              realPrice: this.ruleForm.realPrice,
              cutNum: this.ruleForm.cutNum,
              payStatus: this.ruleForm.payStatus,
              rule: JSON.stringify({
                timeUnity: '1',
                num: '1',
                helpTimeUnity: '1',
                helpNum: '1'
              }),
              isGetBarrage: 0
            }
            const raffleConfig = {
              id: '0',
              raffleAllNum: this.ruleForm.raffleAllNum,
              raffleDayNum: this.ruleForm.raffleDayNum,
              winUserNum: this.ruleForm.winUserNum,
              shareAddNum: this.ruleForm.shareAddNum,
              maxShareNum: this.ruleForm.maxShareNum,
              barrageStatus: '1' // 弹幕开启
            }

            const gameForm = {
              id: this.gameFormId,
              configForm: JSON.stringify(this.configForm)
            }

            if (this.activeName === 'second') {
              gameBase.id = JSON.parse(this.editGameDetail.gameBase).id
              if (this.gameDetail.gameCode === 'bargain') {
                gameForm.id = JSON.parse(this.editGameDetail.gameForm).id
                gameDefense.id = JSON.parse(this.editGameDetail.gameDefense).id
                bargainConfig.id = JSON.parse(this.editGameDetail.gameConfig).id
              } else {
                raffleConfig.id = JSON.parse(this.editGameDetail.gameConfig).id
              }
            }
            const saveGameAward = []
            this.ruleForm.gameAward.forEach((v, index) => {
              v.awardLevel = index
              if (v.status == '1') {//eslint-disable-line
                delete v.status
                saveGameAward.push(v)
              }
            })

            const data = {
              gameOrg: JSON.stringify([{
                orgId: Cookies.get('currentShopId'),
                tenantId: Cookies.get('tenantId'),
                orgName: Cookies.get('currentShopName')
              }]),

              gameConfig: JSON.stringify(raffleConfig),

              gamePlatForm: JSON.stringify({
                orgId: Cookies.get('currentShopId'),
                tenantId: Cookies.get('tenantId'),
                gameCode: this.gameDetail.gameCode,
                gameId: this.gameDetail.gameId
              }),

              gameAward: JSON.stringify(
                // awardTitle: this.ruleForm.awardTitle,
                // awardIntro: this.ruleForm.awardIntro,
                // awardImg: this.ruleForm.awardImg,
                // awardNum: this.ruleForm.awardNum,
                // winRate: this.ruleForm.winRate,
                // awardLevel: this.ruleForm.awardLevel,
                saveGameAward
              ),

              gameBase: JSON.stringify(gameBase),

              gameForm: JSON.stringify(gameForm)

            }

            if (this.gameDetail.gameCode === 'bargain') {
              gameBase.isGetBarrage = 0
              data.gameDefense = JSON.stringify(gameDefense)

              data.gamePlatform = data.gamePlatForm

              delete data.gamePlatForm
              delete data.gameConfig
              delete data.gameAward

              data.gameConfig = JSON.stringify(bargainConfig)
            }

            if (this.activeName === 'second') {
              const func = this.gameDetail.gameCode === 'bargain' ? bargainUpdateGameInfo : raffleUpdateGameInfo
              func(data).then(res => {
                if (res.errorCode === 9000) {
                  this.$message.success('保存成功')
                  this.$parent.close()
                  this.IS_CHANGE(true)
                  this.CHANGE_TAB('second')
                  this.RESET_GAME_DETAIL()
                  this.resetForm(formName)
                } else {
                  this.$message.error(res.errorMessage)
                }
              })
            } else {
              const func = this.gameDetail.gameCode === 'bargain' ? addBargainGameInfo : addGameInfo
              func(data).then(res => {
                if (res.errorCode === 9000) {
                  this.$message.success('保存成功')
                  this.$parent.close()
                  this.IS_CHANGE(true)
                  this.CHANGE_TAB('second')
                  this.RESET_GAME_DETAIL()
                  this.resetForm(formName)
                } else {
                  this.$message.error(res.errorMessage)
                }
              })
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    addAwardNum(val) {
      return val + 1
    },
    handleFormCheck(val) {
      const formCompleteArr = [
        { label: '宝宝姓名', name: 'babyName', type: 'input', data: '', hide: 1, requier: 1, base: 1 },
        { label: '宝宝生日', name: 'babyBirthday', type: 'date', data: '', hide: 1, requier: 1, base: 1 },
        { label: '联系方式', name: 'tel', type: 'input', data: '', hide: 1, requier: 1, base: 1 }
      ]
      this.configForm = []

      formCompleteArr.forEach(e => {
        this.ruleForm.type.forEach(v => {
          if (e.name === v) {
            this.configForm.push(e)
          }
        })
      })
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    resetMusic() {
      this.fileList = [{
        name: '默认音乐',
        url: 'https://img.ishanshan.com/upload/1512991971764.mp3'
      }]
    },
    beforeMusicUpload(file) {
      const isJPG = ['audio/mp3', 'audio/wma', 'audio/flac'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传音乐只能是mp3/wma/flac格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传音乐大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    beforeAvatarUpload(file) {
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG / PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传砍价bargain图片
    handleBargainSuccess(res, file) {
      if (res.sucess) {
        this.ruleForm.awardImg = res.data.url
      }
    },
    // 上传c抽奖奖品图片
    handleAwardSuccess(res, file) {
      if (res.sucess) {
        this.ruleForm.gameAward[this.saveAwardImgIndex].awardImg = res.data.url
      }
    },

    // 上传机构图片
    handleOrgImgSuccess(res, file) {
      if (res.sucess) {
        this.ruleForm.orgImg = res.data.url
      }
    },
    /* 移除音乐*/
    handleMusicRemove(file, fileList) {
      this.fileList = []
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleShareSuccess(res, file) {
      if (res.sucess) {
        this.ruleForm.wxIcon = res.data.url
      }
    },
    // 上传音乐成功

    handleMusicSuccess(res, file) {
      if (res.sucess) {
        this.ruleForm.musicName = file.name
        this.ruleForm.musicUrl = res.data.url
      }
    }
  }
}
</script>
<style lang="scss">
.edit_box {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.form_tips {
  font-size: 12px;
  color: #ccc;
}

.edit_game_left {
  background-repeat: no-repeat;
  background-size: contain;
  min-width: 350px;
  height: 600px;
  display: inline-block;
  position: relative;
  margin: 0 20px;

  overflow: hidden;
  overflow-y: scroll;
  img {
    width: 310px;
  }
}

.edit_game_right {
  padding-right: 20px;
  height: calc(100vh - 120px);
  overflow-y: auto;
  .el-form-item__content {
    width: 450px;
  }
}

.block_title {
  display: flex;
  font-size: 18px;
  margin-bottom: 18px;
  line-height: 26px;
  .icon_title {
    height: 26px;
    width: 6px;
    display: -webkit-inline-box;
    background-color: #5d9cec;
    border-radius: 5px;
    margin-right: 4px;
  }
}
</style>
