<style scoped>
.index {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    background-color: #f3f3f3;
}

.tab img {
    width: 100%;
}

.content {
    margin-top: 5px;
    background-color: white;
}

.content p {
    text-align: left;
}

.content ul li {
    text-align: left;
    line-height: 35px;
}

.cpn_split {
    height: 1px;
    background: #e5e5e5;
}

.fb {
    margin: 20px 10px;
}

.feedback {
    margin: 5px 15px;
}

.cpn_name {
    color: black;
    font-size: 14px;
}
</style>
<template>
<div class="index">
    <MyHeader page-level="1"></MyHeader>
    <Carousel v-if="homeData.banners.length > 0" autoplay v-model="tabIndex" style="margin-top:5px">
        <Carousel-item v-for="item in homeData.banners" :key="item">
            <div class="tab">
                <a target="_blank" :href="item.url" :alt="item.title">
                  <img :src="item.sourceUrl" alt="">
                </a>
            </div>
        </Carousel-item>
    </Carousel>
    <div class="content">
        <Card style="width:100%">
            <p slot="title">
                <Icon type="chatboxes"></Icon>
                活跃榜
            </p>
            <router-link target="_blank" to="grid/1" slot="extra">
                <Icon type="more"></Icon>
                更多...
            </router-link>
            <ul>
                <li v-for="item in homeData.hots" :key="item.id">
                    <router-link target="_blank" :to="'info/'+item.id">
                        <div class="cpn_name" v-text="item.name">
                        </div>
                    </router-link>
                    <div class="cpn_split"></div>
                </li>
            </ul>
        </Card>
    </div>
    <div class="content">
        <Card style="width:100%">
            <p slot="title">
                <Icon type="arrow-graph-up-right"></Icon>
                好评榜
            </p>
            <router-link target="_blank" to="grid/2" slot="extra">
                <Icon type="more"></Icon>
                更多...
            </router-link>
            <ul>
                <li v-for="item in homeData.diggs" :key="item.id">
                    <router-link target="_blank" :to="'info/'+item.id">
                        <div class="cpn_name" v-text="item.name">
                        </div>
                    </router-link>
                    <div class="cpn_split"></div>
                </li>
            </ul>
        </Card>
    </div>
    <div class="content">
        <Card style="width:100%">
            <p slot="title">
                <Icon type="arrow-graph-down-right"></Icon>
                差评榜
            </p>
            <router-link target="_blank" to="grid/3" slot="extra">
                <Icon type="more"></Icon>
                更多...
            </router-link>
            <ul>
                <li v-for="item in homeData.buries" :key="item.id">
                    <router-link target="_blank" :to="'info/'+item.id">
                        <div class="cpn_name" v-text="item.name">
                        </div>
                    </router-link>
                    <div class="cpn_split"></div>
                </li>
            </ul>
        </Card>
    </div>
    <div class="content fb">
        <Row>
            <Col span='22'>
            <Form :label-width="80">
                <Form-item label="给我们留言">
                    <Input v-model='feedback' type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入你想对我们说的话"></Input>
                </Form-item>
            </Form>
            <Button type="primary" @click="saveFeedback" style="margin-left: 8px">提交</Button>
            </Col>
        </Row>

    </div>
</div>
</template>
<script>
import MyHeader from './header.vue'
import Util from '../libs/util';

export default {
    data() {
        return {
            tabIndex: 1,
            items: [],
            homeData: {
                banners: [],
                hots: [],
                diggs: [],
                buries: []
            },
            feedback: ''
        };
    },
    methods: {
        handleStart() {
            this.$Modal.info({
                title: 'Bravo',
                content: 'Now, enjoy the convenience of iView.'
            });
        },
        saveFeedback() {
            var that = this;
            if (this.feedback == '') {
                that.$Modal.error({
                    title: '操作失败',
                    content: '请输入留言内容'
                });
                return;
            }

            Util.ajax.post('feedbacks', {
                "contact": "Empt",
                "content": this.feedback
            }).then(rs => {
                if (rs.data.success) {
                    that.$Modal.success({
                        title: '操作成功',
                        content: '谢谢您的宝贵建议。'
                    });
                    that.feedback = '';
                } else {
                    that.$Modal.error({
                        title: '操作失败',
                        content: rs.msg
                    });
                }
            })
        }
    },
    components: {
        MyHeader
    },
    created() {
        var that = this;
        Util.ajax.get('/home').then(res => {
            that.homeData = res.data.data;
        })
    }
};
</script>
