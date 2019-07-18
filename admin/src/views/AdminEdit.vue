<template>
    <div>
        <h1>{{id? '编辑':'新建'}}管理员</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label='用户名'>
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label='密码'>
                <!-- <el-input type='password' v-model="model.password"></el-input> -->
                <el-input v-model="model.password"></el-input>
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
    import {getAdmin,updateAdmin,createAdmin} from '@/api'
    
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                model: {}
            }
        },
        methods: {
            async save() {
                let res
                if (this.id) {
                    // id存在,修改管理员信息
                    res= await updateAdmin(this.id,this.model)
                } else {
                    // id不存在,创建管理员
                    res = await createAdmin(this.model)
                }
                if (res.data) {
                    this.$router.push('/admin_users/list')
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                }
            },
            async fetch() {
                // 获取当前分类
                const res = await getAdmin(this.id)
                this.model = res.data
            }
        },
        created() {
            this.id && this.fetch()
        }
    }
</script>
