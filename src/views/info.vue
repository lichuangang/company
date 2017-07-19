<style>
.title {
  text-align: center;
  line-height: 45px;
}

.cpn_tip {
  padding: 5px 10px;
}

.desc {
  line-height: 18px;
  padding: 5px 10px;
  font-size: 14px
}

.comment {
  margin: 5px 10px;
}

.cpn_split {
  height: 1px;
  background: #e5e5e5;
  margin-top: 5px;
}

.commentType {
  margin: 5px;
  padding: 5px;
  background-color: #f8f8f9;
  border-radius: 10px;
  border: 1px solid #dddee1;
}

.comment_lou {
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background: #dddee1;
  line-height: 35px;
  text-align: center;
  color: white;
}

.comment_opt {
  border: 1px solid #80848f;
  float: right;
  border-radius: 10px;
  padding: 0px 7px;
  margin-right: 10px;
  font-size: 8px;
  cursor: pointer;
}

.comment_opt:hover {
  background-color: #e9eaec
}

.comment_child {
  background-color: #e9eaec;
  padding: 10px;
  border-radius: 10px;
  margin: 5px;
}
</style>

<template>
  <div>
    <MyHeader page-level="2" :do-func="pubCmt"></MyHeader>
    <div class="title">
      <h2 v-text="info.name"></h2>
    </div>
    <div class="desc" v-text="info.description">
  
    </div>
  
    <div v-if="info.address" class="desc" v-text="info.address">
  
    </div>
  
    <Row class="cpn_tip">
      <Col span="12" style="text-align:left"> {{info.createTime}}
      </Col>
      <Col span="12" style="text-align:right;font-size: 14px;">
      <Icon type="thumbsup" style="font-size:16px"></Icon> 好评 ({{info.diggCount}})
      <Icon type="thumbsdown" style="font-size:16px"></Icon> 差评 ({{info.buryCount}})
      </Col>
    </Row>
  
    <div class="comment">
      <div class="commentType" v-for="(item,index) in comments">
        <Row>
          <Col span="4" style="max-width:45px;min-width:35px;">
          <div class="comment_lou">
            <Icon v-if="item.type==1" type="thumbsup" style="font-size:18px;color:#19be6b"></Icon>
            <Icon v-if="item.type==0" type="thumbsdown" style="font-size:18px;color:#ed3f14"></Icon>
          </div>
          </Col>
          <Col span="20">
          <Row>
            <p style="margin:10px auto;" v-text="item.content"></p>
            <Col span="12"> {{item.createTime}}
            </Col>
            <Col span="12" style="text-align:right;">
            <div class="comment_opt" @click="repushComment(item)">
              <Icon type="chatbubble-working" style="font-size:14px;"></Icon>&nbsp;{{item.childs?''+item.childs.length:'0'}}
            </div>
            <div class="comment_opt" @click="digg(item)">
              <Icon type="thumbsup" style="font-size:14px;"></Icon>&nbsp;{{item.diggCount}}
            </div>
            </Col>
          </Row>
          <div v-if="item.childs">
            <Row class="comment_child" v-for="sItem in item.childs" :key="sItem.id">
              <p style="margin:10px auto;" v-text="sItem.content"></p>
              <Col span="12"> {{sItem.createTime}}
              </Col>
              <Col span="12" style="text-align:right;">
              <div class="comment_opt" @click="repushComment(sItem)">
                <Icon type="chatbubble-working" style="font-size:14px;"></Icon>
              </div>
              <div class="comment_opt" @click="digg(sItem)">
                <Icon type="thumbsup" style="font-size:14px;"></Icon>&nbsp;{{sItem.diggCount}}
              </div>
              </Col>
            </Row>
          </div>
          </Col>
        </Row>
      </div>
    </div>
  
    <Modal v-model="commentShow" :title="repushTxt" :loading="loading">
      <Alert v-if="error" type="error" show-icon>
        错误提示
        <span slot="desc">
          {{error}}
        </span>
      </Alert>
      <Form ref="formValidate" :model="commentData" :label-width="80" :rules="ruleValidate">
        <Form-item v-if="commentData.parentId == 0" label="好评差评" prop="type">
          <Radio-group v-model="commentData.type">
            <Radio label="1">
              <Icon type="thumbsup" style="font-size:16px"></Icon>
              <span>好评</span>
            </Radio>
            <Radio label="0">
              <Icon type="thumbsdown" style="font-size:16px"></Icon>
              <span>差评</span>
            </Radio>
          </Radio-group>
        </Form-item>
        <Form-item label="说点什么" prop="content">
          <Input v-model="commentData.content" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="请输入评论内容"></Input>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="ghost" @click="cancel">取消</Button>
        <Button type="primary" @click="ok" style="margin-left: 8px">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import MyHeader from './header.vue'
import Util from '../libs/util';
export default {
  data() {
    return {
      info: {
        id: '',
        name: '',
        description: '',
        address: '',
        diggCount: 0,
        buryCount: 0
      },
      commentShow: false,
      loading: false,
      error: '',
      repushTxt: '发表评论',
      commentData: {
        companyId: 0,
        content: '',
        parentId: 0,
        type: 1
      },
      ruleValidate: {
        content: [{ required: true, message: '请输入评论内容', trigger: 'blur' }]
      },
      comments: []
    }
  },
  methods: {
    repushComment(item) {
      this.openComment(item);
    },
    digg(item) {
      var that = this;
      Util.ajax.post('comments/' + item.id + '/digg', {}).then(rs => {
        console.log(rs)
        if (rs.data.success) {
          that.loadComment();
        } else {
          this.$Modal.warning({
            title: '操作失败',
            content: rs.data.msg
          });
        }
      })
    },
    ok() {
      var that = this;
      this.loading = true;
      Util.ajax.post('comments', this.commentData).then(rs => {
        that.loading = false;
        if (rs.data.success) {
          that.cancel();
          that.loadComment();
        } else {
          that.error = rs.data.msg;
        }
      });
    },
    cancel() {
      this.commentShow = false;
    },
    loadComment() {
      var that = this;
      Util.ajax.get('comments?companyId=' + this.commentData.companyId).then(rs => {
        that.comments = rs.data.data.content;
      })
    },
    pubCmt() {
      this.openComment();
    },
    openComment(item) {
      if (item) {
        this.repushTxt = '回复评论';
        if (item.parentId == undefined || item.parentId == 0) {
          this.commentData.parentId = item.id;
          this.commentData.content = '';
        } else {
          this.commentData.content = '@' + item.content + '// ';
          this.commentData.parentId = item.parentId;
        }
      } else {
        this.commentData.parentId = 0;
        this.repushTxt = '发表评论';
        this.commentData.content = '';
      }
      this.commentShow = true;
    }
  },
  created() {
    var that = this;
    this.commentData.companyId = this.$route.params.id;
    Util.ajax.get('companies/' + this.$route.params.id).then(rs => {
      that.info = rs.data.data;
    });

    this.loadComment();
  },
  components: { MyHeader }
}
</script>

