<template>
    <div class="header">
        <Row>
            <Col span="16">
            <div v-if="pageLevel==1">
                <img src="imgs/logo.png" alt="">
            </div>
            <div v-if="pageLevel==2" class="rtn_div" @click="goBack">
                <Icon style="line-height:35px;font-size:25px;" type="arrow-left-c"></Icon>
            </div>
            <div class="title">
                重庆求职防坑手册
            </div>
            </Col>
            <Col span="8" style="text-align: right">
            <Button v-if="pageLevel==1" class="btn_push" type="primary" shape="circle" @click="open">新发布</Button>
            <Button v-if="pageLevel==2" class="btn_push" type="primary" shape="circle" @click="clickFunc">发表评论</Button>
            </Col>
        </Row>

        <Modal v-model="show" title="发布新动态" :loading="loading">
            <Alert v-if="error" type="error" show-icon>
                错误提示
                <span slot="desc">
                    {{error}}
                </span>
            </Alert>
            <Form ref="formValidate" :model="formItem" :label-width="80" :rules="ruleValidate">
                <Form-item label="公司名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入公司名称"></Input>
                </Form-item>
                <Form-item label="描述信息" prop="desc">
                    <Input v-model="formItem.desc" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="请输入描述信息"></Input>
                </Form-item>
                <Form-item label="公司地址">
                    <Input v-model="formItem.address" placeholder="请输入公司地址"></Input>
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
import Util from '../libs/util';
export default {
    props: ['pageLevel', 'doFunc'],
    data() {
        return {
            show: false,
            loading: false,
            error: '',
            formItem: {
                name: '',
                desc: '',
                address: ''
            },
            ruleValidate: {
                name: [{ required: true, message: '公司名称不能为空', trigger: 'blur' }],
                desc: [{ required: true, message: '描述信息不能为空', trigger: 'blur' }]
            }
        }
    },
    methods: {
        open() {
            this.show = true;
        },
        ok() {
            var that = this;

            this.$refs.formValidate.validate(ok => {
                if (ok) {
                    that.loading = true;
                    Util.ajax.post('companies', that.formItem).then(rs => {
                        that.loading = false;
                        if (rs.data.success) {
                            that.cancel();
                            window.location.reload();
                        } else {
                            that.error = rs.data.msg;
                        }
                    });
                }
            })
        },
        cancel() {
            this.show = false;
        },
        clickFunc() {
            this.doFunc();
        },
        goBack() {
            window.close();
            //this.$router.back(-1)
        }
    }
}
</script>

<style scoped>
.rtn_div {
    margin-top: 12px;
    height: 35px;
    width: 35px;
    border-radius: 17px;
    background: #2d8cf0;
    line-height: 35px;
    text-align: center;
    color: white;
    float: left;
    cursor: pointer;
    margin-left: 12px;
}

.rtn_div:hover {
    background: #57a3f3
}

.btn_push {
    margin-top: 15px;
    margin-right: 5px;
}

.header {
    height: 60px;
    background-color: #5cb9eb;
    text-align: left;
}

.header img {
    height: 50px;
    margin-left: 10px;
    margin-top: 5px;
    float: left;
}

.title {
    float: left;
    color: white;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
}
</style>
