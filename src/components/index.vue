<template>

    <div>
        <el-button @click.native="startHacking">Let's do it</el-button>
        <div v-for="item in TagList" style="float: left;margin-right: 15px">
            <span @click="getBookListWithTagId(item.id)">{{ item.tag_name }}</span>
        </div>
        <table style="clear:both;padding-top: 10px">
            <tr v-for="item in BookList">
                <td>{{ item.title }}</td>
                <td>评分：{{ item.star }}&nbsp;</td>
                <td>评论：({{ item.comment }})</td>
            </tr>
        </table>

    </div>
</template>
<style>

</style>
<script>
    var TagList = [];
    var BookList = [];
    export default{

        data: function () {
            this.$http.get('http://localhost/doubanserver/')
                    .then(function (response) {
                        response.data.forEach(function (e) {
                            TagList.push(e);
                        })
                    });
            return {
                TagList: TagList,
                BookList: BookList
            }
        },
        mounted:function(){
            this.getBookListWithTagId(1);
        },
        methods: {
            getBookListWithTagId: function (id) {
                this.$http.get('http://localhost/doubanserver/index.php/Home/Index/getListWithTagId?id=' + id)
                    .then(function (response) {
                        BookList.splice(0,40);
                        console.log(BookList);
                        response.data.forEach(function (e) {
                            BookList.push(e);
                        });
                    });
            },
            startHacking: function() {
                this.$notify({
                    title: 'It Works',
                    message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
                    duration: 6000
                })
            }
        }
    }
</script>
