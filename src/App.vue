<template>
  <el-container>
    <el-header height="320px">
      <el-tabs
        v-model="activeName"
        class="demo-tabs"
        @tab-click="handleClick"
        stretch
      >
        <el-tab-pane
          label="GeneMapper下机数据上传"
          name="first"
          v-if="showUploadGen"
        >
          <div id="holder" class="holder" style="height: 519px">
            <div>
              <el-upload
                class="upload-demo"
                drag
                action="#"
                accept=".txt,.csv"
                :on-change="handleChange"
                :file-list="fileList1"
                :data="{}"
                :http-request="httpRequest"
                :before-upload="beforeAvatarUpload"
              >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  拖拽文件至此或<em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    文件名当中不能含有空格、特殊符号、中文
                  </div>
                </template>
              </el-upload>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-header>
  </el-container>
</template>

<script>
/* eslint-disable */
import { ElNotification } from 'element-plus'
export default {
  data() {
    return {
      activeName: "first",
      fileList1: [],
      showUploadGen: true,
    };
  },
  methods: {
    // 上传下机数据文件进行处理
    httpRequest(data) {
      // 获取上传的文件本地路径
      var filePath = data.file.path;
      var fileName = data.file.name;
      console.log("filePath", filePath);
      console.log("fileName", fileName);
      var path = require("path");
      // 生成日志文件
      var log = window.require("electron-log");
      log.transports.console.level = "silly";
      var app = window.require("@electron/remote").app;
      var logFilepath = path.join(app.getPath("temp"));
      console.log(logFilepath);
      var logFilename = "AneuFilerVue.log";
      log.transports.file.resolvePath = () =>
        path.join(logFilepath, logFilename);
      //调用可执行文件脚本
      var macURL = path.join(
        process.cwd(),
        "/Applications/AneuFilerVue.app/Contents/Resources/analysis.mac"
      );
      var linuxURL = path.join(process.cwd(), "/resources/analysis");
      var windowURL = path.join(process.cwd(), "/resources/analysis.exe");
      console.log("windowURL", windowURL);
      const { exec } = window.require("child_process");
      if (filePath) {
        if (process.platform === "darwin") {
          var exeFile = macURL;
        } else if (process.platform === "win32") {
          var exeFile = windowURL;
        } else if (process.platform === "linux") {
          var exeFile = linuxURL;
        }
        console.log("exeFile", exeFile);
        exec(exeFile + " -i " + filePath, (error, stdout, stderr) => {
          if (error || stderr) {
            const notice = "输入下机数据文件" + fileName + "处理有误";
            log.error(
              "\n" +
                "当前输入下机数据文件" +
                fileName +
                "处理有误！" +
                "\n"+"stderr:"+
                stderr
            );
            ElNotification({
              showClose: true,
              message: notice,
              type: "error",
              position: "top-right",
              duration: "0",
              offset: 60,
            });
          } else if (stdout) {
            const notice = "输入下机数据文件" + fileName + "处理完成";
            log.info(
              "\n" +
                "当前输入下机数据文件" +
                fileName +
                "处理完成！"
            );
            ElNotification({
              showClose: true,
              message: notice,
              type: "success",
              position: "top-right",
              duration: "2000",
              offset: 60,
            });
            console.log("stdout:\n" + stdout);
          }
        });
      }
    },
  },
};
</script>

<style>
.el-tabs {
  width: 100%;
}

.demo-tabs .el-tabs__content {
  height: calc(100% - 40px); /* 40px 是指每个标签页的高度 */
  display: flex;
}

.demo-tabs .el-tab-pane {
  flex: 1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.upload-demo .el-upload-dragger {
  height: 450px;
}
.el-upload-dragger {
  margin-top: 10px;
}
.upload-demo .el-upload__tip {
  font-size: 15px;
  color: #708090;
  margin-top: 0px;
}
.upload-demo1 {
  text-align: left;
}
.table-wrapper {
  overflow-x: auto;
}
a.help {
  color: #fff;
}
.demo-tabs .helpButton {
  text-align: left;
}
.demo-tabs .mb-4 .downloadButton {
  text-align: right;
}
.setting {
  position: relative;
}
/* .settingPosition {
  margin-top: 20%;
} */
.grid-content {
  border-radius: 4px;
  text-align: left;
}
.fileSetting {
  margin: 30px 0;
}

.el-divider__text {
  font-size: 16px !important;
}
i.el-icon.el-icon--upload {
  margin-top: 100px;
}
.leftText {
  display: flex;
  align-items: center;
}
</style>
