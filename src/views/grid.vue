<<template>
  <div>
    <MyHeader page-level=1></MyHeader>
    <Card style="width:100%">
        <p v-if="sort==1" slot="title">
            <Icon type="chatboxes"></Icon>
            活跃榜
        </p>
        <p v-if="sort==2" slot="title">
            <Icon type="arrow-graph-down-right"></Icon>
            差评榜
        </p>
        <p v-if="sort==3" slot="title">
            <Icon type="arrow-graph-up-right"></Icon>
            好评榜
        </p>

        <a slot="extra" @click="flush">
            <Icon type="ios-loop-strong"></Icon>
            刷新
        </a>
        <ul>
            <li v-for="item in items" :key="item.id">
                <router-link :to="'/info/'+item.id">
                    <p class="cpn_item" v-text="item.name"></p>
                    <Row class="cpn_desc">
                        <Col span="24" v-text="item.description" >
                        </Col>                                              
                    </Row>
                </router-link> 
                <Row class="cpn_tip">
                    <Col span="10" style="text-align:left">
                        {{item.createTime}}
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
</style>

<script>
import MyHeader from './header.vue'
import Util from '../libs/util';
export default {
    data() {
        return {
            tabIndex: 1,
            items: [],
            sort: 1
        };
    },
    methods: {
        flush() {
            var that = this;
            Util.ajax.get('companies?sort=' + this.sort).then(rs => {
                that.items = rs.data.data.content;
            })
        },
    },
    created() {
        this.sort = this.$route.params.type;
        this.flush()
    },
    components: { MyHeader }
}
</script>

