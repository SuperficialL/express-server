<template>
    <div>
        <h1>轮播列表</h1>
        <el-table :data="banners">
            <el-table-column align="center"
                             label="序号"
                             type="index"
                             width='80'
            >
                <template slot-scope="scope">
                    <span>{{scope.$index+1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="操作"
                             align="center"
            >
                <template slot-scope="scope">
                    <el-button type="primary"
                               size="small"
                               @click="$router.push(`/banners/edit/${scope.row._id}`)"
                    >
                        编辑
                    </el-button>
                    <el-button type="danger" size="small" @click="remove(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getBanners,deleteBanner} from '@/api'
    
    export default {
        data() {
            return {
                banners:[]
            }
        },
        methods: {
            async fetch() {
                // 获取所有轮播数据
                const res = await getBanners()
                this.banners = res.data
            },
            async remove(row) {
                this.$confirm(`是否确定要删除分类?"${row.name}"`,'提示',{
                    confirmButtonText: '确认',
                    cancleButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const res = await deleteBanner(row._id)
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
        },
        created() {
            this.fetch()
        }
    }
</script>
