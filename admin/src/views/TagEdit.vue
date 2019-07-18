<template>
    <div>
        <h1>{{id? '编辑':'新建'}}标签</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label='名称'>
                <el-input v-model="model.name"></el-input>
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
    import {getTag,updateTag,createTag} from '@/api'
    
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                model: {
                    parent: {}
                },
                parents:[]
            }
        },
        methods: {
            async save() {
                let res
                if (this.id) {
                    // id存在,修改分类
                    res= await updateTag(this.id,this.model)
                } else {
                    // id不存在,创建分类
                    res = await createTag(this.model)
                }
                if (res.data) {
                    this.$router.push('/tags/list')
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                }
            },
            async fetch() {
                // 获取当前标签
                const res = await getTag(this.id)
                this.model = res.data
            }
        },
        created() {
            this.id && this.fetch()
        }
    }
</script>
