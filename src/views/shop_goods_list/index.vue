<template>
  <div>
    <Drawer></Drawer>
    <el-tabs v-model="activeName.tab" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.id"
        :label="item.label"
        :name="item.name"
      >
        <el-card>
          <div class="search">
            <div style="display: flex">
              <p>
                关键词<el-input
                  size="small"
                  v-model="activeName.title"
                  clearable
                  placeholder="商品名称"
                  style="width: 200px; margin-left: 10px"
                />
              </p>
              <p v-if="isFlag">
                商品分类
                <el-select
                  style="margin-left: 10px; padding-letf: 10px"
                  v-model="activeName.category_id"
                  placeholder="请选择商品分类"
                  size="small"
                  clearable
                >
                  <el-option
                    style=""
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </p>
            </div>
            <div class="btn">
              <el-button type="primary" size="small" @click="serach"  >搜索</el-button>
              <el-button size="small">重置</el-button>
              <el-button
                size="small"
                style="border: none"
                @click="isFlag = !isFlag"
              >
                {{ isFlag ? '收起' : '展开' }}
                <el-icon class="el-icon--right">
                  <ArrowUp v-if="isFlag" /> <ArrowDown v-else
                /></el-icon>
              </el-button>
            </div>
          </div>
          <div>
            <el-button size="small" type="primary">新增</el-button>
            <el-button
              type="warning"
              size="small"
              v-if="activeName.tab === 'delete'"
              >恢复商品</el-button
            >
            <el-button
              type="danger"
              size="small"
              v-if="activeName.tab !== 'delete'"
              >批量删除</el-button
            >
            <el-button
              type="danger"
              size="small"
              v-if="activeName.tab === 'delete'"
              >彻底删除</el-button
            >
            <el-button
              size="small"
              v-if="activeName.tab === 'all' || activeName.tab === 'saling'"
              >上架</el-button
            >
            <el-button
              size="small"
              v-if="activeName.tab === 'all' || activeName.tab === 'off'"
              >下架</el-button
            >
          </div>
          <Table :data="goodsList" :cols="cols">
            <template #content="{ row }">
              <div class="content">
                <img
                  style="width: 50px; height: 50px"
                  :src="row.cover"
                  alt=""
                />
                <div class="item">
                  <p style="padding: 0px; margin: 0px">{{ row.title }}</p>
                  <span style="color: red">￥{{ row.min_price }} </span>
                  <span style="color: #dcdfe6; margin: 0 5px">|</span>
                  <span style="font-size: 10px">￥{{ row.min_oprice }} </span>
                  <p style="color: #9ca3af; font-size: 10px; margin: 0px">
                    分类:{{
                      row.category && row.category.name ? row.category.name : ''
                    }}
                  </p>
                  <p style="color: #9ca3af; font-size: 10px; margin: 0px">
                    创建时间：{{ row.create_time }}
                  </p>
                </div>
              </div>
            </template>
            <template v-slot:status="{ row }">
              <!-- {{ row }} -->
              <el-tag
                style="padding: 0 10px"
                class="ml-2"
                :type="row.status === 1 ? 'success' : 'danger'"
              >
                {{ row.status === 1 ? '仓库' : '上架' }}
              </el-tag>
            </template>
            <template #audit="{ row }">
              <span> {{ row.ischeck === 1 ? '通过' : '拒绝' }} </span>
            </template>
            <template #active>
              <div v-if="activeName.tab !== 'delete'" style="" >
                <el-button link type="primary" size="small">修改</el-button>
                <el-button link type="primary" size="small">商品规格</el-button>
                <el-button link type="primary" size="small"
                  >设置轮播图</el-button
                >
                <el-button link type="primary" size="small">商品详情</el-button>
                <el-popconfirm title="是否要删除该商品?">
                  <template #reference>
                    <el-button link type="primary" size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </div>
              <div v-else>暂无操作</div>
            </template>
          </Table>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import cols from './cols'
import Table from '../../components/Table.vue'
import Drawer from '../../components/Drawer.vue'
import { goodsListAPI } from '../../api/goods'
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
const isFlag = ref(false)
console.log(isFlag)
const current = ref(1)
const goodsList = ref([])
const options = ref([])
const activeName = reactive({
  tab: 'all',
  title: '',
  category_id: ''
})
const tabList = reactive([
  { label: '全部', name: 'all' },
  { label: '审核中', name: 'checking' },
  { label: '出售中', name: 'saling' },
  { label: '已下架', name: 'off' },
  { label: '库存预警', name: 'min_stock' },
  { label: '回收站', name: 'delete' }
])

const getGoodsList = async () => {
  const { list, totalCount, cates } = await goodsListAPI(
    current.value,
    activeName
  )
  goodsList.value = list
  console.log(list, totalCount, cates, 'res')
  options.value = cates
}
const serach = () => {
  getGoodsList()
}
getGoodsList()
const handleClick = ({ props: { name } }) => {
  console.log(name)
  activeName.tab = name
  getGoodsList()
}
</script>

<style lang="scss" scoped>
// * {
//   padding: 0;
//   margin: 0;
// }
.content {
  display: flex;
  .item {
    margin-left: 5px;
  }
  img {
    border-radius: 5px;
  }
}
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin-left: 40px;
  }

  .btn {
    margin-right: 0px;
    .el-button {
      width: 60px;
    }
  }
}
</style>
