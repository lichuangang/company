<<template>
<div>
    <MyHeader page-level=1></MyHeader>
    <Card style="width:100%">
        <p v-if="sort==0" slot="title">
            <Icon type="chatboxes"></Icon>
            活跃榜
        </p>
        <p v-if="sort==3" slot="title">
            <Icon type="arrow-graph-down-right"></Icon>
            差评榜
        </p>
        <p v-if="sort==2" slot="title">
            <Icon type="arrow-graph-up-right"></Icon>
            好评榜
        </p>

        <a slot="extra" @click="flush">
            <Input v-model="keyword" size="small" icon="search" placeholder="请输入..." style="width: 200px"></Input>
        </a>
        <ul>
            <li v-for="item in items" :key="item.id">
                <router-link target='_blank' :to="'/info/'+item.id">
                    <p class="cpn_item" v-text="item.name"></p>
                    <Row class="cpn_desc">
                        <Col span="24" v-text="item.description">
                        </Col>
                    </Row>
                </router-link>
                <Row class="cpn_tip">
                    <Col span="10" style="text-align:left"> {{item.createTime}}
                    </Col>
                    <Col span="14" style="text-align:right">
                    <Icon style="font-size:16px;color:#19be6b" type="thumbsup"></Icon> ({{item.diggCount}})
                    <Icon style="font-size:16px;color:#ed3f14" type="thumbsdown"></Icon> ({{item.buryCount}})
                    </Col>
                </Row>
                <div class="cpn_split"></div>
            </li>
        </ul>
    </Card>
    <Row v-if='isloading'>
        <Col class="demo-spin-col" span="24">
        <Spin fix>
            <Icon type="load-c" size=36 class="demo-spin-icon-load"></Icon>
            <div>加载中...</div>
        </Spin>
        </Col>
    </Row>
    <Back-top></Back-top>
</div>
</template>

<style>
.cpn_item {
    line-height: 30px;
    font-size: 14px;
    color: black;
}

.cpn_item a {
    color: #293452;
}

.cpn_tip {
    font-size: 12px;
    color: gray;
}

.cpn_desc {
    line-height: 18px;
    font-size: 12px;
    color: gray;
}

.cpn_split {
    height: 1px;
    background: #e5e5e5;
}

.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
    from {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.demo-spin-col {
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
</style>

<script>
import MyHeader from './header.vue'
import Util from '../libs/util';
export default {
    data() {
        return {
            tabIndex: 1,
            items: [],
            sort: 1,
            keyword: '',
            page: 1,
            isloading: false,
        };
    },
    methods: {
        flush() {
            var that = this;
            var url = 'companies?sort=' + this.sort + '&page=' + this.page + '&pageSize=20&name=' + this.keyword;
            if (this.isloading) return;
            this.isloading = true;
            Util.ajax.get(url).then(rs => {
                var items = that.items.concat(rs.data.data.content);
                that.items = items;
                this.isloading = false
            })
        },
    },
    created() {
        var that = this;
        this.sort = this.$route.params.type;
        this.flush()
        window.onscroll = function() {
            if (that.$route.params.type) {
                if (getScrollTop() + getClientHeight() == getScrollHeight()) {
                    that.page += 1;
                    that.flush();
                }
            }
        }
    },
    components: {
        MyHeader
    },
    watch: {
        keyword: function(v) {
            this.items=[];
            this.flush();
        }
    }
}

//获取滚动条当前的位置
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
//获取当前可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}
//获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
</script>
