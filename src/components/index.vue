<template>

    <div>
        <el-menu default-active="0" class="el-menu-demo" mode="horizontal">
            <el-menu-item v-for="(item, index) in TagList" :index="String(index)"><div @click="getBookListWithTagId(item.id)">{{ item.tag_name }}</div></el-menu-item>
        </el-menu>
        <el-table :data="BookList" stripe border @row-click="setDialog">
            <el-table-column prop="title" label="书名" width="280"></el-table-column>
            <el-table-column prop="star" label="评分" width="180"></el-table-column>
            <el-table-column prop="comment" label="评论人数"></el-table-column>
            <el-table-column prop="desc" label="书籍简介"></el-table-column>
        </el-table>
        <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="100">
        </el-pagination>
        <el-dialog size="tiny" title="百度云PDF下载" v-model="dialogTableVisible">
            <el-table :data="BookList" @row-click="testConsole">
                <el-table-column  property="title" label="下载地址" width="510"></el-table-column>
            </el-table>
        </el-dialog>



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
    var pageNum = 2;
    var initTagId = 1;
    export default{

        data: function () {
            defaultId : 1
            return {
                TagList: TagList,
                BookList: BookList,
                initTagId : initTagId,
                pageNum : pageNum,
                dialogTableVisible: false
            }
        },
        mounted:function(){
            this.getTagList();
            this.getBookListWithTagId(this.initTagId, 1);
        },
        methods: {
            getTagList: function () {
                this.$http.get('http://localhost:8888/doubanserver/')
                    .then(function (response) {
                        response.data.forEach(function (e) {
                            TagList.push(e);
                        })
                    });
            },
            getBookListWithTagId: function (id, page) {
                if(page){
                    this.pageNum = page;
                }else {
                    this.pageNum = 1;
                }
                this.$http.get('http://localhost:8888/doubanserver/index.php/Home/Index/getListWithTagId?id=' + id +'&page=' + page)
                    .then(function (response) {
                        BookList.splice(0,10);
                        response.data.forEach(function (e) {
                            if(e.title.length>50){
                                e.title = e.title.substring(0,10) + "...";
                            }
                            BookList.push(e);
                        });
                    });
                this.defaultId = id;
            },
            handleSizeChange(val) {},
            handleCurrentChange(val) {
                this.getBookListWithTagId(this.defaultId, val);
            },
            setDialog(row){
                this.dialogTableVisible = true;
            },
            testConsole(row){
                console.log(row.id);
            }
        }
    }
</script>
