<template>
    <div>
        <h1>{{id? '编辑':'新建'}}文章</h1>
        <el-form label-width="80px" @submit.native.prevent="save">
            <el-form-item label='标题'>
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="所属分类">
                <el-select v-model="model.category">
                    <el-option 
                        v-for="item in categories" 
                        :key="item._id"
                        :label='item.name'
                        :value='item._id'
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作者">
                <el-select v-model="model.author">
                    <el-option 
                        v-for="item in users" 
                        :key="item._id"
                        :label='item.username'
                        :value='item._id'
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="缩略图">
                <el-upload
                    class="avatar-uploader"
                    :headers="getAuthHeaders()"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="UploadSuccess"
                    >
                    <img v-if="model.img" :src="model.img" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="标签">
                <el-select v-model="model.tags" multiple value-key="name">
                    <el-option
                        v-for="item in tagList"
                        :key="item._id"
                        :label="item.name"
                        :value="item"
                        >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='正文'>
                <mavon-editor v-model="model.body" />
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
    import { getArticle,getCategories,updateArticle,createArticle,getAdminList,getTags } from '@/api'

    export default {
        props: {
            id: {}
        },
        data() {
            return {
                editorOption:{},
                model: {},
                categories:[],
                users: [],
                tagList: [],
            }
        },
        methods: {
            UploadSuccess(res) {
                this.$set(this.model, 'img', res.url)
                // this.model.img = res
            },
            async save() {
                // 保存数据
                let res
                if (this.id) {
                    // id存在,修改分类
                    res= await updateArticle(this.id,this.model)
                } else {
                    // id不存在,创建分类
                    res = await createArticle(this.model)
                }
                if (res.data) {
                    this.$router.push('/articles/list')
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                }
            },
            async fetchArticle() {
                // 获取当前文章
                const res = await getArticle(this.id)
                this.model = res.data
            },
            async fetchPCategories() {
                // 获取分类
                const res = await getCategories()
                this.categories = res.data
            },
            async fetchAuthors() {
                // 获取作者
                const res = await getAdminList()
                this.users = res.data
            },
            async fetchTags() {
                // 获取标签
                const res = await getTags()
                this.tagList = res.data
            }
        },
        created() {
            this.id && this.fetchArticle()
            this.fetchPCategories()
            this.fetchAuthors()
            this.fetchTags()
        }
    }
</script>
