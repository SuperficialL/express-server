<template>
    <div>
        <h1>文章列表</h1>
        <el-table :data="articles">
            <el-table-column align="center"
                             label="序号"
                             type="index"
                             width='80'
            >
                <template slot-scope="scope">
                    <span>{{ (page-1) * limit + scope.$index+1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop='category.name' label="所属分类"></el-table-column>
            <el-table-column label="操作"
                             align="center"
            >
                <template slot-scope="scope">
                    <el-button type="primary"
                               size="small"
                               @click="$router.push(`/articles/edit/${scope.row._id}`)"
                    >
                        编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="remove(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>

            
        </el-table>
        <el-pagination
                :page-size="limit"
                layout="total,prev, pager, next, jumper"
                :current-page.sync="page"
                @current-change="handleCurrentChange"
                :total="total">
          </el-pagination>
    </div>
</template>

<script>
    import {getArticles,deleteArticle} from '@/api'
    
    export default {
        data() {
            return {
                articles:[],
                page:1,
                limit:10,
                total: 0
            }
        },
        methods: {
            async fetch() {
                // 获取所有文章数据
                const res = await getArticles({
                    page:this.page,
                    limit:this.limit
                })
                this.articles = res.data.articles
                this.page = res.data.page
                this.limit = res.data.limit
                this.total = res.data.total
            },
            async remove(row) {
                this.$confirm(`是否确定要删除轮播?"${row.title}"`,'提示',{
                    confirmButtonText: '确认',
                    cancleButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await deleteArticle(row._id)
                    if (res) {
                        this.$message({
                            type:'success',
                            message: '删除成功!'
                        })
                        this.fetch()
                    }
                }).catch(() => {
                    this.$message({
                        type:'info',
                        message: '已取消删除!'
                    })
                })
            },
            handleCurrentChange(val) {
                this.page = val
                this.fetch()
            }
        },
        created() {
            this.fetch()
        }
    }
</script>
