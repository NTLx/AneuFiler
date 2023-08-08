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
                :data="{
                  sampleOutputStatus: uploadParams.sampleOutputStatus,
                  outputFormat: uploadParams.outputFormat,
                }"
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
          <el-row class="mb-4">
            <el-col :span="12"
              ><div class="helpButton">
                <el-button type="warning" @click="help"
                  ><el-icon><QuestionFilled /></el-icon>帮助</el-button
                >
              </div></el-col
            >
            <el-col :span="12">
              <div class="downloadButton">
                <el-button type="primary" @click="downloadSampleTemplate">
                  <el-icon><Download /></el-icon>
                  下载样本信息模版文件
                </el-button>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="样本信息数据上传"
          name="second"
          v-if="showSampleInformation"
        >
          <el-upload
            v-model:file-list="fileList2"
            class="upload-demo1"
            action="#"
            accept=".xlsx,.xls"
            :on-change="handleChange1"
            :http-request="httpRequest1"
            :before-upload="beforeSampleInformationUpload"
          >
            <el-button type="primary" class="uploadSampleData"
              >上传样本信息数据</el-button
            >
            <template #tip>
              <div class="el-upload__tip">
                样本信息数据文件后缀格式必须为xlsx/xls
              </div>
            </template>
          </el-upload>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <div m="18">
                  <p m="t-0 b-2">与胎儿关系: {{ props.row.FRelation }}</p>
                  <p m="t-0 b-2">与母亲关系: {{ props.row.MRelation }}</p>
                  <p m="t-0 b-2">送检医师: {{ props.row.sendingPhysician }}</p>
                  <p m="t-0 b-2">采样日期: {{ props.row.samplingDate }}</p>
                  <p m="t-0 b-2">接收日期: {{ props.row.receiveDate }}</p>
                  <p m="t-0 b-2">报告日期: {{ props.row.reportDate }}</p>
                  <p m="t-0 b-2">母亲样本类型: {{ props.row.MSampleType }}</p>
                  <p m="t-0 b-2">胎儿样本类型: {{ props.row.FSampleType }}</p>
                  <p m="t-0 b-2">母21: {{ props.row.M21 }}</p>
                  <p m="t-0 b-2">母18: {{ props.row.M18 }}</p>
                  <p m="t-0 b-2">母13: {{ props.row.M13 }}</p>
                  <p m="t-0 b-2">母性染色体: {{ props.row.MSexChromosome }}</p>
                  <p m="t-0 b-2">母备注: {{ props.row.MNote }}</p>
                  <p m="t-0 b-2">胎儿21: {{ props.row.F21 }}</p>
                  <p m="t-0 b-2">胎儿18: {{ props.row.F18 }}</p>
                  <p m="t-0 b-2">胎儿13: {{ props.row.F13 }}</p>
                  <p m="t-0 b-2">
                    胎儿性染色体: {{ props.row.FSexChromosome }}
                  </p>
                  <p m="t-0 b-2">胎儿备注: {{ props.row.FNote }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="MSampleNo" label="母样本编号" />
            <el-table-column prop="FSampleNo" label="子样本编号" />
            <el-table-column prop="MSampleName" label="母亲样本名" />
            <el-table-column prop="FSampleName" label="胎儿样本名" />
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="age" label="年龄" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="设置" name="third" class="setting">
          <div class="settingPosition">
            <el-row>
              <el-col :span="24">
                <el-divider content-position="left">输出文件设置</el-divider>
              </el-col>
            </el-row>
            <el-row class="fileSetting">
              <el-col :span="8"
                ><el-switch
                  v-model="value1"
                  class="ml-2"
                  size="large"
                  inline-prompt
                  active-text="开启按样本输出"
                  active-value="1"
                  inactive-value="0"
                  inactive-text="开启按样本输出"
                  @change="switchReceiveStatus"
                ></el-switch
              ></el-col>
              <el-col :span="16" class="spanPosition">
                <span>格式：</span>
                <el-radio-group
                  v-model="radio1"
                  class="ml-4"
                  @change="switchRadio"
                  size="large"
                >
                  <el-radio-button label="GBK">GBK</el-radio-button>
                  <el-radio-button label="UTF-8">UTF-8</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-row>
            <el-row class="fileSetting">
              <el-col :span="24" class="spanPosition">
                <span>选择输出文件种类：</span>
                <el-radio-group
                  v-model="radio2"
                  @change="switchFileType"
                  size="large"
                >
                  <el-radio-button label="summaryFile"
                    >结果文件</el-radio-button
                  >
                  <el-radio-button label="summaryFileAndReportFile"
                    >结果文件+报告文件</el-radio-button
                  >
                  <el-radio-button label="reportFile">报告文件</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-divider content-position="left">报告设置</el-divider>
              </el-col>
            </el-row>
            <el-row class="fileSetting">
              <el-col :span="24">
                <el-select v-model="value2" size="large" @change="handleSelectChange">
                  <el-option v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-header>
  </el-container>
</template>

<script>
/* eslint-disable */
import { ElNotification } from "element-plus";
export default {
  data() {
    return {
      activeName: "first",
      fileList1: [],
      fileList2: [],
      tableData: [],
      value1: 0,
      value2:"default",
      radio1: "UTF-8",
      radio2: "summaryFile",
      showUploadGen: true,
      showSampleInformation: true,
      uploadParams: {
        outputFormat: "UTF-8",
        selectReport: "default",
        fileType: "summaryFile",
        sampleOutputStatus:"0",
      },
      options: [
        { label: "默认报告模板", value: "default" },
        { label: "其他", value: "other" },
      ],
    };
  },
  methods: {
    // 上传下机数据文件进行处理
    httpRequest(data) {
      var sampleOutputStatus = data.data.sampleOutputStatus;
      var outputFormat = data.data.outputFormat;
      console.log("uploadParams Data",data.data)
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
        exec(exeFile + " -i " + filePath +" -e "+outputFormat+" -s "+sampleOutputStatus, (error, stdout, stderr) => {
          if (error || stderr) {
            const notice = "输入下机数据文件" + fileName + "处理有误";
            log.error(
              "\n" +
                "当前输入下机数据文件" +
                fileName +
                "处理有误！" +
                "\n" +
                "stderr:" +
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
            log.info("\n" + "当前输入下机数据文件" + fileName + "处理完成！");
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
    handleClick(tab, event) {
      console.log(tab.props.label, event);
    },
    // 上传下机数据文件处理之前校验方法
    beforeAvatarUpload(file1) {
      let extension = file1.name.substring(file1.name.lastIndexOf(".") + 1);
      console.log("extension", extension);
      let extensionList = ["txt", "csv"];
      if (extensionList.indexOf(extension) < 0) {
        const formatMessage =
          "很抱歉，您选择的文件格式不符合要求，请重新选择文件！";
        ElNotification({
          showClose: true,
          message: formatMessage,
          type: "error",
          position: "top-right",
          duration: "0",
          offset: 60,
        });
        return false;
      }
    },
    // 跳转帮助文档
    help() {
      const { shell } = window.require("electron");
      shell.openExternal("https://github.com/NTLx/AneuFiler");
    },
    // 下载样本模版文件
    downloadSampleTemplate() {
      var path = require("path");
      var downloadFile = path.join(
        process.cwd(),
        "/resources/sampleDataTemplateAneuFiler.xlsx"
      );
      var win = window.require("@electron/remote").getCurrentWindow();
      win.webContents.downloadURL(downloadFile);
      console.log("downloadFile", downloadFile);
    },
    //上传样本信息文件并生成报告
    httpRequest1(data1) {
      var sampleFileName = data1.file.name;
      console.log("样本文件名：", sampleFileName);
      var sampleFilePath = data1.file.path;
      console.log("样本文件路径：", sampleFilePath);
      var path = require("path");
      var log = window.require("electron-log");
      log.transports.console.level = "silly";
      var app = window.require("@electron/remote").app;
      var logFilePath = path.join(app.getPath("temp"));
      var logFileName = "AneuFiler.log";
      log.transports.file.resolvePath = () =>
        path.join(logFilePath, logFileName);
      var xlsx = window.require("node-xlsx").default;
      var sampleFileNameCurrentPath = sampleFilePath.substring(
        0,
        sampleFilePath.lastIndexOf("\\") + 1
      );
      console.log("sampleFileNameCurrentPath", sampleFileNameCurrentPath);
      log.info(
        "\n" +
          "当前处理文件名：" +
          sampleFileName +
          "\n" +
          "成功传入输入样本数据文件"
      );
      var sampleSheets = xlsx.parse(sampleFilePath);
      var sampleSheetsData = sampleSheets[0].data;
      var sampleLineData = [];
      console.log("sampleSheetsData", sampleSheetsData);
      // 循环获取xlsx文件的样本信息数据
      for (var j = 1; j < sampleSheetsData.length; j++) {
        sampleLineData.push(sampleSheetsData[j]);
      }
      // 除去标题行具体数据
      console.log("sampleLineData", sampleLineData);
      const sampleArr = sampleLineData.map((item) => {
        var leftSlash = "/";
        if (item[0] == " " || item[0] == undefined) {
          item[0] = leftSlash;
        }
        if (item[1] == " " || item[1] == undefined) {
          item[1] = leftSlash;
        }
        if (item[2] == " " || item[2] == undefined) {
          item[2] = leftSlash;
        }
        if (item[3] == " " || item[3] == undefined) {
          item[3] = leftSlash;
        }
        if (item[4] == " " || item[4] == undefined) {
          item[4] = leftSlash;
        }
        if (item[5] == " " || item[5] == undefined) {
          item[5] = leftSlash;
        }
        if (item[6] == " " || item[6] == undefined) {
          item[6] = leftSlash;
        }
        if (item[7] == " " || item[7] == undefined) {
          item[7] = leftSlash;
        }
        if (item[8] == " " || item[8] == undefined) {
          item[8] = leftSlash;
        }
        if (item[9] == " " || item[9] == undefined) {
          item[9] = leftSlash;
        }
        if (item[10] == " " || item[10] == undefined) {
          item[10] = leftSlash;
        }
        if (item[11] == " " || item[11] == undefined) {
          item[11] = leftSlash;
        }
        if (item[12] == " " || item[12] == undefined) {
          item[12] = leftSlash;
        }
        if (item[13] == " " || item[13] == undefined) {
          item[13] = leftSlash;
        }
        if (item[14] == " " || item[14] == undefined) {
          item[14] = leftSlash;
        }
        if (item[15] == " " || item[15] == undefined) {
          item[15] = leftSlash;
        }
        if (item[16] == " " || item[16] == undefined) {
          item[16] = leftSlash;
        }
        if (item[17] == " " || item[17] == undefined) {
          item[17] = leftSlash;
        }
        if (item[18] == " " || item[18] == undefined) {
          item[18] = leftSlash;
        }
        if (item[19] == " " || item[19] == undefined) {
          item[19] = leftSlash;
        }
        if (item[20] == " " || item[20] == undefined) {
          item[20] = leftSlash;
        }
        if (item[21] == " " || item[21] == undefined) {
          item[21] = leftSlash;
        }
        if (item[22] == " " || item[22] == undefined) {
          item[22] = leftSlash;
        }
        if (item[23] == " " || item[23] == undefined) {
          item[23] = leftSlash;
        }
        return {
          MSampleNo: item[0],
          FSampleNo: item[1],
          MSampleName: item[2],
          FSampleName: item[3],
          sex: item[4],
          age: item[5],
          FRelation: item[6],
          MRelation: item[7],
          sendingPhysician: item[8],
          samplingDate: item[9],
          receiveDate: item[10],
          reportDate: item[11],
          MSampleType: item[12],
          FSampleType: item[13],
          M21: item[14],
          M18: item[15],
          M13: item[16],
          MSexChromosome: item[17],
          MNote: item[18],
          F21: item[19],
          F18: item[20],
          F13: item[21],
          FSexChromosome: item[22],
          FNote: item[23],
          SampleName: item[24],
        };
      });
      console.log("sampleArr", sampleArr);
      this.tableData = sampleArr;
    },
    // 按样本输出开关按钮
    switchReceiveStatus(val){
      console.log("按样本输出开关状态", val);
      this.uploadParams.sampleOutputStatus = val;
    },
    // 切换文件格式
    switchRadio(val){
      console.log("当前切换后的文件格式",val);
      this.uploadParams.outputFormat = val;
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
.spanPosition {
  display: flex;
  align-items: center;
}
.el-switch__core .el-switch__inner .is-icon, .el-switch__core .el-switch__inner .is-text{
  color:#000
}
</style>
