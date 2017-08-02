const routers = [
  {
    path: '/',
    meta: {
      title: '求职防坑手册',
      keywords: '求职,入坑,入职,内推,福利,面试,培训,年终奖,薪水,辞职,劳动仲裁,五险一金,环境,氛围,技术,制度,马屁,不正规,洗脑,工资,HR,妹纸,公司,拖欠工资',
      description: '求职防坑手册（简称“防坑手册”）由大家自由提交公司并自由发表评价，供大家选择公司时查看。由于自由评价需要自己分析结论。'
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
  },
  {
    path: '/grid/:type',
    meta: {
      title: '求职防坑列表',
      keywords: '求职,入坑,入职,内推,福利,面试,培训,年终奖,薪水,辞职,劳动仲裁,五险一金,环境,氛围,技术,制度,马屁,不正规,洗脑,工资,HR,妹纸,公司,拖欠工资',
      description: '求职防坑手册（简称“防坑手册”）由大家自由提交公司并自由发表评价，供大家选择公司时查看。由于自由评价需要自己分析结论。'
    },
    component: (resolve) => require(['./views/grid.vue'], resolve)
  },
  {
    path: '/info/:id',
    meta: {
      title: '求职防坑详情'
    },
    component: (resolve) => require(['./views/info.vue'], resolve)
  }
]
export default routers
