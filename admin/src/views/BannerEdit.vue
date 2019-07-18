<template>
    <div>
        <h1>{{id? '编辑':'新建'}}轮播</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label='名称'>
                <el-input v-model="model.name"></el-input>
            </el-form-item>

            <el-form-item>

            <el-button @click='model.items.push({})'>
                <i class="el-icon-plus"></i>添加轮播
            </el-button>

            <el-row type="flex" style='flex-wrap:wrap;'>
                <el-col :md='24' v-for="(item,index) in model.items" :key="index">
                    <el-form-item label='跳转链接(URL)'>
                        <el-input v-model="item.url"></el-input>
                    </el-form-item>

                    <el-form-item label='图标'>
                        <el-upload
                            class="avatar-uploader"
                            action="http://127.0.0.1:3000/admin/api/uploads"
                            :show-file-list="false"
                            :on-success="res => $set(item,'image',res.url)"
                        >
                            <img v-if="item.image" :src="item.image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label='删除'>
                        <el-button size='small' type='danger' @click="model.items.splice(i,1)">删除</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {getBanner,updateBanner,createBanner} from '@/api'
    
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                model: {
                    items: []
                },
            }
        },
        methods: {
            async save() {
                let res
                if (this.id) {
                    // id存在,修改轮播
                    res= await updateBanner(this.id,this.model)
                } else {
                    // id不存在,创建分类
                    res = await createBanner(this.model)
                }
                if (res.data) {
                    this.$router.push('/banners/list')
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                }
            },
            async fetch() {
                // 获取当前轮播
                const res = await getBanner(this.id)
                this.model = Object.assign({},this.model,res.data)
            }
        },
        created() {
            this.id && this.fetch()
        }
    }
</script>
