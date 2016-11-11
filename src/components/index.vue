<template>

    <div>
        <el-menu default-active="0" class="el-menu-demo" mode="horizontal">
            <el-menu-item v-for="(item, index) in TagList" :index="String(index)">{{ item.tag_name }}</el-menu-item>
        </el-menu>
        <el-table
                :data="BookList"
                stripe
                border
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="书名"
                    width="280">
            </el-table-column>
            <el-table-column
                    prop="star"
                    label="评分"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="comment"
                    label="评论人数">
            </el-table-column>
            <el-table-column
                    prop="desc"
                    label="书籍简介">
            </el-table-column>
        </el-table>
        <!--<table style="clear:both;padding-top: 10px">-->
            <!--<tr v-for="item in BookList">-->
                <!--<td>{{ item.title }}</td>-->
                <!--<td>评分：{{ item.star }}&nbsp;</td>-->
                <!--<td>评论：({{ item.comment }})</td>-->
            <!--</tr>-->
        <!--</table>-->

    </div>
</template>
<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<script>
    var TagList = [];
    var BookList = [];
    export default{

        data: function () {
            this.$http.get('http://localhost:8888/doubanserver/')
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
                this.$http.get('http://localhost:8888/doubanserver/index.php/Home/Index/getListWithTagId?id=' + id)
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
