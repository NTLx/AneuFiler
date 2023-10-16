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
          <div id="holder" class="holder">
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
                  fileType: uploadParams.fileType,
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
                <template #file>
                  <el-text size="large">GeneMapper下机输入文件：{{fileList1[0].name}}</el-text>
                </template>
              </el-upload>
            </div>
          </div>
          <el-row class="mb-4">
            <el-col :span="12">
              <div class="helpButton">
                <el-tooltip
                  class="box-item"
                  content="跳转至帮助文档"
                  effect="light"
                >
                  <el-button type="warning" @click="help" size="large">
                    <el-icon><QuestionFilled /></el-icon>帮助
                  </el-button>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="downloadButton">
                <el-tooltip
                  class="box-item"
                  content="下载样本信息模板文件"
                  effect="light"
                >
                  <el-button
                    type="primary"
                    @click="downloadSampleTemplate"
                    size="large"
                  >
                    <el-icon><Download /></el-icon>
                    模版
                  </el-button>
                </el-tooltip>
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
            :data="{
              fileType: uploadParams.fileType,
              selectReport: uploadParams.selectReport,
            }"
          >
            <el-tooltip class="box-item" content="上传样本信息文件" effect="light" placement="right">
              <el-button type="primary" class="uploadSampleData" size="large">
                <el-icon><Upload /></el-icon>上传
              </el-button>
            </el-tooltip>
            <template #tip>
              <div class="el-upload__tip">
                样本信息数据文件后缀格式必须为xlsx/xls
              </div>
            </template>
          </el-upload>
          <el-table :data="tableData" style="width: 100%" id="myTable">
            <el-table-column type="expand">
              <template #default="props">
                <div m="18">
                  <p m="t-0 b-2">
                    与胎儿关系: {{ props.row.relationship_with_fetus }}
                  </p>
                  <p m="t-0 b-2">
                    与母亲关系: {{ props.row.relationship_with_mother }}
                  </p>
                  <p m="t-0 b-2">送检医师: {{ props.row.sendingPhysician }}</p>
                  <p m="t-0 b-2">采样日期: {{ props.row.samplingDate }}</p>
                  <p m="t-0 b-2">接收日期: {{ props.row.receiveDate }}</p>
                  <p m="t-0 b-2">报告日期: {{ props.row.reportDate }}</p>
                  <p m="t-0 b-2">
                    母亲样本类型: {{ props.row.motherSampleType }}
                  </p>
                  <p m="t-0 b-2">
                    胎儿样本类型: {{ props.row.fetusSampleType }}
                  </p>
                  <p m="t-0 b-2">母21: {{ props.row.mother21 }}</p>
                  <p m="t-0 b-2">母18: {{ props.row.mother18 }}</p>
                  <p m="t-0 b-2">母13: {{ props.row.mother13 }}</p>
                  <p m="t-0 b-2">
                    母性染色体: {{ props.row.motherSexChromosome }}
                  </p>
                  <p m="t-0 b-2">母备注: {{ props.row.motherNote }}</p>
                  <p m="t-0 b-2">胎儿21: {{ props.row.fetus21 }}</p>
                  <p m="t-0 b-2">胎儿18: {{ props.row.fetus18 }}</p>
                  <p m="t-0 b-2">胎儿13: {{ props.row.fetus13 }}</p>
                  <p m="t-0 b-2">
                    胎儿性染色体: {{ props.row.fetusSexChromosome }}
                  </p>
                  <p m="t-0 b-2">胎儿备注: {{ props.row.feutsNote }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="motherSampleNumber"
              label="母样本编号"
              align="center"
              fixed
            />
            <el-table-column
              prop="fetusSampleNumber"
              label="子样本编号"
              align="center"
            />
            <el-table-column
              prop="motherSampleName"
              label="母亲样本名"
              align="center"
            />
            <el-table-column
              prop="fetusSampleName"
              label="胎儿样本名"
              align="center"
            />
            <el-table-column prop="sex" label="性别" align="center" />
            <el-table-column prop="age" label="年龄" align="center" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="设置" name="third" class="setting">
          <div class="settingPosition">
            <el-row class="row-container">
              <el-col :span="24">
                <el-divider content-position="left">输出文件设置</el-divider>
              </el-col>
              <el-col :span="12">
                <div class="spanPosition">
                  <span>类型：</span>
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
                    <el-radio-button label="reportFile"
                      >报告文件</el-radio-button
                    >
                  </el-radio-group>
                </div>
              </el-col>
              <el-col :span="12"
                ><el-switch
                  v-model="value1"
                  class="ml-2"
                  size="large"
                  inline-prompt
                  active-text="开启按样本输出"
                  active-value="-s"
                  inactive-value=""
                  style="
                    --el-switch-on-color: #13ce66;
                    --el-switch-off-color: #ff4949;
                  "
                  inactive-text="开启按样本输出"
                  @change="switchReceiveStatus"
                ></el-switch
              ></el-col>
            </el-row>
            <el-row class="row-container">
              <el-col :span="24">
                <el-divider content-position="left">报告设置</el-divider>
              </el-col>
              <el-col :span="24">
                <el-select
                  v-model="value2"
                  size="large"
                  @change="handleSelectChange"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="row-container">
              <el-col :span="24">
                <el-divider content-position="left">日志</el-divider>
              </el-col>
              <el-col :span="24">
                <el-tooltip class="box-item" content="打开日志文件" effect="light">
                  <el-button @click="openLogFile" type="primary" size="large">
                    <el-icon><Document /></el-icon>日志
                  </el-button>
                </el-tooltip>
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
import { ElNotification, ElLoading } from "element-plus";
export default {
  data() {
    return {
      activeName: "first",
      fileList1: [],
      fileList2: [],
      tableData: [],
      outputArr1: [],
      lastOutput: [],
      outputDirectry: "",
      value1: "",
      value2: "default",
      radio2: "summaryFile",
      showUploadGen: true,
      showSampleInformation: false,
      uploadParams: {
        outputFormat: this.outputFormat(),
        selectReport: "default",
        fileType: "summaryFile",
        sampleOutputStatus: "",
      },
      options: [
        { label: "默认报告模板", value: "default" },
        { label: "其他", value: "other" },
      ],
    };
  },
  methods: {
    // 获取浏览器窗口高度
    getWindowHeight() {
      return (
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      );
    },
    // 获取浏览器窗口宽度
    getWindowWidth() {
      return (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      );
    },
    //调节表格高度
    adjustTableHeight() {
      var table = document.getElementById("myTable");
      var windowHeight = this.getWindowHeight();
      var windowWidth = this.getWindowWidth();
      var tableHeight,tableWidth
      table == null ?(console.log("nothing"),console.log("windowHeight", windowHeight),console.log("windowWidth", windowWidth)):(console.log("windowHeight", windowHeight),console.log("windowWidth", windowWidth),tableHeight = windowHeight - table.offsetTop-100,tableWidth = windowWidth - 20,table.style.height = tableHeight + "px",table.style.width = tableWidth + "px");
    },
    // 根据操作系统设置输出文件默认值
    outputFormat() {
      const platformEncodingMap = {
        darwin: "UTF-8",
        win32: "GBK",
        linux: "UTF-8",
      };
      const platform = process.platform;
      return platformEncodingMap[platform] || "UTF-8";
    },
    // 上传下机数据文件进行处理
    httpRequest(data) {
      var loading = ElLoading.service({
        lock: true,
        text: "上传处理中",
        background: "rgba(0, 0, 0, 0.7)",
      });
      var sampleOutputStatus = data.data.sampleOutputStatus;
      console.log("sampleOutputStatus", sampleOutputStatus);
      var outputFormat = data.data.outputFormat;
      var fileType = data.data.fileType;
      console.log("uploadParams Data", data.data);
      // 获取上传的文件本地路径
      var filePath = data.file.path;
      var fileName = data.file.name;
      console.log("filePath", filePath);
      console.log("fileName", fileName);
      var path = require("path");

      // 创建 Date 对象并传入时间戳
      var date = new Date();
      // 使用 Date 对象的方法获取日期和时间信息
      var year = date.getFullYear(); // 年份
      var month = date.getMonth() + 1; // 月份（注意月份从 0 开始，所以要加 1）
      var day = date.getDate(); // 日期
      var hours = date.getHours(); // 小时
      var minutes = date.getMinutes(); // 分钟
      var seconds = date.getSeconds(); // 秒
      // 格式化日期和时间
      var formattedDateTime = `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
      if (process.platform === "darwin") {
        var inputFile = path.dirname(filePath);
      } else if (process.platform === "win32") {
        var inputFile = filePath.substring(0, filePath.lastIndexOf("\\") + 1);
      } else if (process.platform === "linux") {
        var inputFile = filePath.substring(0, filePath.lastIndexOf("\\") + 1);
      }
      var inputFileNameWithOutSuffix = fileName.substring(
        0,
        fileName.lastIndexOf(".")
      );
      console.log("inputFileNameWithOutSuffix", inputFileNameWithOutSuffix);
      var generateDataFolder =
        inputFileNameWithOutSuffix + "." + formattedDateTime;
      var outputDirectry = path.join(inputFile, generateDataFolder);
      console.log("outputDirectry", outputDirectry);
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
        "/Applications/AneuFiler.app/Contents/Resources/analysis.mac"
      );
      var linuxURL = path.join(process.cwd(), "/resources/analysis");
      var windowURL = path.join(process.cwd(), "/resources/analysis.exe");
      console.log("windowURL", windowURL);
      const { exec } = window.require("child_process");
      if (filePath) {
        if (process.platform === "darwin") {
          var exeFile = macURL;
          this.uploadParams.outputFormat = "UTF-8";
        } else if (process.platform === "win32") {
          var exeFile = windowURL;
          this.uploadParams.outputFormat = "GBK";
        } else if (process.platform === "linux") {
          var exeFile = linuxURL;
          this.uploadParams.outputFormat = "UTF-8";
        }
        console.log("exeFile", exeFile);
        exec(
          exeFile +
            " -i " +
            filePath +
            " -e " +
            outputFormat +
            " " +
            sampleOutputStatus +
            " -o " +
            outputDirectry,
          (error, stdout, stderr) => {
            if (error || stderr) {
              loading.close();
              const notice = "输入下机数据文件" + fileName + "处理有误";
              log.error("\n" + notice + "！" + "\n" + "stderr:" + stderr);
              this.showErrorNotification(notice);
              this.errorNotification(fileName, notice);
            } else if (stdout) {
              loading.close();
              const notice = "输入下机数据文件" + fileName + "处理完成";
              log.info("\n" + notice + "！");
              this.showSuccessNotification(notice);
              console.log("stdout:\n" + stdout);
              if (fileType == "summaryFileAndReportFile") {
                this.changeSampleTab();
                //处理生成的SummaryFile
                // if(process.platform ==="darwin"){
                //   var inputFile = path.dirname(filePath)
                // }else if(process.platform ==="win32"){
                // var inputFile = filePath.substring(
                //   0,
                //   filePath.lastIndexOf("\\") + 1
                // );
                // }else if(process.platform ==="linux"){
                //   var inputFile = filePath.substring(
                //   0,
                //   filePath.lastIndexOf("\\") + 1
                // );
                // }
                var outPutFileName =
                  inputFileNameWithOutSuffix + ".Summary.tsv";
                var summaryFile = path.join(
                  inputFile,
                  generateDataFolder,
                  outPutFileName
                );
                // var date = new Date();
                // const year = date.getFullYear(); // 获取年份，例如：2023
                // const month = date.getMonth() + 1; // 获取月份，注意月份从0开始，所以需要加1，例如：7
                // const day = date.getDate(); // 获取日期，例如：12
                // const formattedDate = `${year}-${month}-${day}`;
                // // 去除文件后缀
                // var inputFileNameWithOutSuffix = fileName.substring(
                //   0,
                //   fileName.lastIndexOf(".")
                // );
                // console.log("inputFile", inputFileNameWithOutSuffix);
                // var generateDataFolder =
                //   inputFileNameWithOutSuffix + "." + formattedDate;
                // var outPutFileName =
                //   generateDataFolder + "." + outputFormat + ".Summary.tsv";
                // const summaryFile = path.join(
                //   inputFile,
                //   generateDataFolder,
                //   outPutFileName
                // );
                // console.log("summaryFile", summaryFile);
                // var outputDirectry = path.join(inputFile, generateDataFolder);
                console.log("outputDirectry", outputDirectry);
                this.outputDirectry = outputDirectry;
                var xlsx = window.require("node-xlsx");
                // var tsvFile = fs.readFileSync(summaryFile, "utf8");
                const parsedData = xlsx.parse(summaryFile);
                console.log("parsedData", parsedData);
                var parsedSheetData = parsedData[0].data;
                // iconv.skipDecodeWarning = true;
                var parsedLineData = [];
                for (var j = 2; j < parsedSheetData.length; j++) {
                  parsedLineData.push(parsedSheetData[j]);
                }
                const outputArr = parsedLineData.map(function (item) {
                  return {
                    sampleFileName: item[0],
                    chromosome21: item[1],
                    chromosome18: item[2],
                    chromosome13: item[3],
                    chromosomeX: item[4],
                    chromosomeY: item[5],
                    sexChromosome: item[6],
                    comment: item[7],
                  };
                });
                console.log("outputArr", outputArr);
                this.outputArr1 = outputArr;
              }
            }
          }
        );
      }
    },
    handleClick(tab, event) {
      console.log(tab.props.label, event);
      var label = tab.props.label;
      switch (label) {
        case "GeneMapper下机数据上传":
        case "样本信息数据上传":
        case "设置":
          this.showInfoNotification(label);
          break;
        default:
          // 默认情况下的处理逻辑
          break;
      }
    },
    // info消息通知
    showInfoNotification(message) {
      ElNotification({
        message: message,
        type: "info",
        showClose: true,
        position: "top-right",
        duration: "2000",
        offset: 60,
      });
    },
    // error消息通知
    showErrorNotification(message) {
      ElNotification({
        message: message,
        type: "error",
        showClose: true,
        position: "top-right",
        duration: "2000",
        offset: 60,
      });
    },
    // success消息通知
    showSuccessNotification(message) {
      ElNotification({
        message: message,
        type: "success",
        showClose: true,
        position: "top-right",
        duration: "2000",
        offset: 60,
      });
    },
    // warning 消息通知
    showWarningNotification(message) {
      ElNotification({
        message: message,
        type: "warning",
        showClose: true,
        position: "top-right",
        duration: "2000",
        offset: 60,
      });
    },
    //处理GeneMapper数据文件列表
    handleChange(file, fileList1) {
      this.fileList1 = fileList1.slice(-1);
      console.log("fileList1", fileList1.length);
    },
    // 处理样本信息文件列表
    handleChange1(file, fileList2) {
      this.fileList2 = fileList2.slice(-1);
      console.log("fileList1", fileList2.length);
    },
    // 上传下机数据文件处理之前校验方法
    beforeAvatarUpload(file1) {
      let extension = file1.name.substring(file1.name.lastIndexOf(".") + 1);
      console.log("extension", extension);
      let extensionList = ["txt", "csv"];
      if (extensionList.indexOf(extension) < 0) {
        const formatMessage =
          "很抱歉，您选择的文件格式不符合要求，请重新选择文件！";
        this.showErrorNotification(formatMessage);
        this.errorNotification(file1.name, formatMessage);
        return false;
      }
    },
    // 跳转帮助文档
    help() {
      const { shell } = window.require("electron");
      shell.openExternal(
        "https://alidocs.dingtalk.com/i/p/b6Vz6PvgYDp7VmZ9/docs/KGZLxjv9VGZ0Gb4Puk6vownPW6EDybno"
      );
    },
    // 下载样本模版文件
    downloadSampleTemplate() {
      var path = require("path");
      if (process.platform === "darwin") {
        var downloadFile = path.join(
          process.cwd(),
          "/Applications/AneuFiler.app/Contents/Resources/sampleDataTemplateAneuFiler.xlsx"
        );
        var win = window.require("@electron/remote").getCurrentWindow();
        win.webContents.downloadURL("file:///" + downloadFile);
      } else if (process.platform === "win32") {
        var downloadFile = path.join(
          process.cwd(),
          "/resources/sampleDataTemplateAneuFiler.xlsx"
        );
        var win = window.require("@electron/remote").getCurrentWindow();
        win.webContents.downloadURL(downloadFile);
      } else if (process.platform === "linux") {
        var downloadFile = path.join(
          process.cwd(),
          "/resources/sampleDataTemplateAneuFiler.xlsx"
        );
        var win = window.require("@electron/remote").getCurrentWindow();
        win.webContents.downloadURL(downloadFile);
      }
      console.log("downloadFile", downloadFile);
    },
    // 上传样本信息数据文件处理之前的校验方法
    beforeSampleInformationUpload(file2, fileList2) {
      let extension1 = file2.name.substring(file2.name.lastIndexOf(".") + 1);
      let extensionList1 = ["xlsx", "xls"];
      if (extensionList1.indexOf(extension1) < 0) {
        const formatMessage =
          "很抱歉，您选择的文件格式不符合要求，请重新选择文件！";
        this.showErrorNotification(formatMessage);
        this.errorNotification(file2.name, formatMessage);
        return false;
      }
      console.log(file2);
    },
    //日期格式转换1
    formatDate1(numb, format = "年", format1 = "月", format2 = "日") {
      let time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      let year = time.getFullYear() + "";
      let month = time.getMonth() + 1 + "";
      let date = time.getDate() + "";
      if (format && format.length === 1) {
        return (
          year +
          format +
          (month < 10 ? "0" + month : month) +
          format1 +
          (date < 10 ? "0" + date : date) +
          format2
        );
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
    //日期格式转换2
    formatDate2(numb, format = "-") {
      let time1 = new Date((numb - 1) * 24 * 3600000 + 1);
      time1.setYear(time1.getFullYear() - 70);
      let year = time1.getFullYear() + "";
      let month = time1.getMonth() + 1 + "";
      let date = time1.getDate() + "";
      if (format && format.length === 1) {
        return (
          year +
          format +
          (month < 10 ? "0" + month : month) +
          format +
          (date < 10 ? "0" + date : date)
        );
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
    //上传样本信息文件并生成报告
    httpRequest1(data1) {
      var loading = ElLoading.service({
        lock: true,
        text: "上传处理中",
        background: "rgba(0, 0, 0, 0.7)",
      });
      var fileType = data1.data.fileType;
      var selectReport = data1.data.selectReport;
      console.log("fileType", fileType);
      console.log("selectReport", selectReport);
      var sampleFileName = data1.file.name;
      console.log("样本文件名：", sampleFileName);
      var sampleFilePath = data1.file.path;
      console.log("样本文件路径：", sampleFilePath);
      var path = require("path");
      var log = window.require("electron-log");
      log.transports.console.level = "silly";
      var app = window.require("@electron/remote").app;
      var logFilePath = path.join(app.getPath("temp"));
      var logFileName = "AneuFilerVue.log";
      log.transports.file.resolvePath = () =>
        path.join(logFilePath, logFileName);
      var xlsx = window.require("node-xlsx").default;
      if (process.platform === "darwin") {
        var sampleFileNameCurrentPath = path.dirname(sampleFilePath);
      } else if (process.platform === "win32") {
        var sampleFileNameCurrentPath = sampleFilePath.substring(
          0,
          sampleFilePath.lastIndexOf("\\") + 1
        );
      } else if (process.platform === "linux") {
        var sampleFileNameCurrentPath = sampleFilePath.substring(
          0,
          sampleFilePath.lastIndexOf("\\") + 1
        );
      }
      // 创建 Date 对象并传入时间戳
      var date = new Date();
      // 使用 Date 对象的方法获取日期和时间信息
      var year = date.getFullYear(); // 年份
      var month = date.getMonth() + 1; // 月份（注意月份从 0 开始，所以要加 1）
      var day = date.getDate(); // 日期
      var hours = date.getHours(); // 小时
      var minutes = date.getMinutes(); // 分钟
      var seconds = date.getSeconds(); // 秒
      // 格式化日期和时间
      var formattedDateTime = `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
      var sampleFileNameNoSuffix = sampleFileName.substring(
        0,
        sampleFileName.lastIndexOf(".")
      );
      console.log("sampleFileNameCurrentPath", sampleFileNameCurrentPath);
      console.log("sampleFileNameNoSuffix", sampleFileNameNoSuffix);
      var reportFileFolder = sampleFileNameNoSuffix + "." + formattedDateTime;
      var reportFilePath = sampleFileNameCurrentPath + reportFileFolder;
      console.log("reportFileFoler", reportFileFolder);
      log.info(
        "\n" +
          "当前处理文件名：" +
          sampleFileName +
          "\n" +
          "成功传入输入样本数据文件"
      );
      var sampleSheets = xlsx.parse(sampleFilePath);
      var sampleSheetsData = sampleSheets[0].data;
      // var sampleLineData = [];
      var outFileName = [];
      var outFileNamePath = [];
      var motherSampleNumber = [];
      var motherSampleName = [];
      var fetusSampleNumber = [];
      var fetusSampleName = [];
      var sex = [];
      var age = [];
      var relationship_with_fetus = [];
      var relationship_with_mother = [];
      var sendingPhysician = [];
      var samplingDate = [];
      var receiveDate = [];
      var reportDate = [];
      var motherSampleType = [];
      var fetusSampleType = [];
      var mother21 = [];
      var mother18 = [];
      var mother13 = [];
      var motherSexChromosome = [];
      var motherNote = [];
      var fetus21 = [];
      var fetus18 = [];
      var fetus13 = [];
      var fetusSexChromosome = [];
      var feutsNote = [];
      var sampleName = [];
      console.log("sampleSheetsData", sampleSheetsData);
      for (var n = 1; n < sampleSheetsData.length; n++) {
        for (var m = 0; m < sampleSheetsData[0].length; m++) {
          switch (sampleSheetsData[0][m]) {
            case "母亲样本编号":
              motherSampleNumber.push(sampleSheetsData[n][m]);
              break;
            case "母亲样本名":
              motherSampleName.push(sampleSheetsData[n][m]);
              break;
            case "胎儿样本编号":
              fetusSampleNumber.push(sampleSheetsData[n][m]);
              break;
            case "胎儿样本名":
              fetusSampleName.push(sampleSheetsData[n][m]);
              break;
            case "性别":
              sex.push(sampleSheetsData[n][m]);
              break;
            case "年龄":
              age.push(sampleSheetsData[n][m]);
              break;
            case "与胎儿关系":
              relationship_with_fetus.push(sampleSheetsData[n][m]);
              break;
            case "与母亲关系":
              relationship_with_mother.push(sampleSheetsData[n][m]);
              break;
            case "送检医师":
              sendingPhysician.push(sampleSheetsData[n][m]);
              break;
            case "采样日期":
              samplingDate.push(this.formatDate2(sampleSheetsData[n][m]));
              break;
            case "接收日期":
              receiveDate.push(this.formatDate2(sampleSheetsData[n][m]));
              break;
            case "报告日期":
              reportDate.push(this.formatDate1(sampleSheetsData[n][m]));
              break;
            case "母亲样本类型":
              motherSampleType.push(sampleSheetsData[n][m]);
              break;
            case "胎儿样本类型":
              fetusSampleType.push(sampleSheetsData[n][m]);
              break;
            case "母21":
              mother21.push(sampleSheetsData[n][m]);
              break;
            case "母18":
              mother18.push(sampleSheetsData[n][m]);
              break;
            case "母13":
              mother13.push(sampleSheetsData[n][m]);
              break;
            case "母性染色体":
              motherSexChromosome.push(sampleSheetsData[n][m]);
              break;
            case "母备注":
              motherNote.push(sampleSheetsData[n][m]);
              break;
            case "胎儿21":
              fetus21.push(sampleSheetsData[n][m]);
              break;
            case "胎儿18":
              fetus18.push(sampleSheetsData[n][m]);
              break;
            case "胎儿13":
              fetus13.push(sampleSheetsData[n][m]);
              break;
            case "胎儿性染色体":
              fetusSexChromosome.push(sampleSheetsData[n][m]);
              break;
            case "胎儿备注":
              feutsNote.push(sampleSheetsData[n][m]);
              break;
            case "样本":
              sampleName.push(sampleSheetsData[n][m]);
              break;
            default:
              break;
          }
        }
      }
      var sampleArrData = {
        motherSampleNumber: motherSampleNumber,
        motherSampleName: motherSampleName,
        fetusSampleNumber: fetusSampleNumber,
        fetusSampleName: fetusSampleName,
        sex: sex,
        age: age,
        relationship_with_fetus: relationship_with_fetus,
        relationship_with_mother: relationship_with_mother,
        sendingPhysician: sendingPhysician,
        samplingDate: samplingDate,
        receiveDate: receiveDate,
        reportDate: reportDate,
        motherSampleType: motherSampleType,
        fetusSampleType: fetusSampleType,
        mother21: mother21,
        mother18: mother18,
        mother13: mother13,
        motherSexChromosome: motherSexChromosome,
        motherNote: motherNote,
        fetus21: fetus21,
        fetus18: fetus18,
        fetus13: fetus13,
        fetusSexChromosome: fetusSexChromosome,
        feutsNote: feutsNote,
        sampleName: sampleName,
      };
      console.log("样本数据", sampleArrData);
      var sampleArr = sampleArrData.motherSampleNumber.map(function (
        name,
        index
      ) {
        var leftSlash = "/";
        if (
          sampleArrData.motherSampleNumber[index] == " " ||
          sampleArrData.motherSampleNumber[index] == undefined
        ) {
          sampleArrData.motherSampleNumber[index] = leftSlash;
        }
        if (
          sampleArrData.motherSampleName[index] == " " ||
          sampleArrData.motherSampleName[index] == undefined
        ) {
          sampleArrData.motherSampleName[index] = leftSlash;
        }
        if (
          sampleArrData.fetusSampleNumber[index] == " " ||
          sampleArrData.fetusSampleNumber[index] == undefined
        ) {
          sampleArrData.fetusSampleNumber[index] = leftSlash;
        }
        if (
          sampleArrData.fetusSampleName[index] == " " ||
          sampleArrData.fetusSampleName[index] == undefined
        ) {
          sampleArrData.fetusSampleName[index] = leftSlash;
        }
        if (
          sampleArrData.sex[index] == " " ||
          sampleArrData.sex[index] == undefined
        ) {
          sampleArrData.sex[index] = leftSlash;
        }
        if (
          sampleArrData.age[index] == " " ||
          sampleArrData.age[index] == undefined
        ) {
          sampleArrData.age[index] = leftSlash;
        }
        if (
          sampleArrData.relationship_with_fetus[index] == " " ||
          sampleArrData.relationship_with_fetus[index] == undefined
        ) {
          sampleArrData.relationship_with_fetus[index] = leftSlash;
        }
        if (
          sampleArrData.relationship_with_mother[index] == " " ||
          sampleArrData.relationship_with_mother[index] == undefined
        ) {
          sampleArrData.relationship_with_mother[index] = leftSlash;
        }
        if (
          sampleArrData.sendingPhysician[index] == " " ||
          sampleArrData.sendingPhysician[index] == undefined
        ) {
          sampleArrData.sendingPhysician[index] = leftSlash;
        }
        if (
          sampleArrData.samplingDate[index] == " " ||
          sampleArrData.samplingDate[index] == undefined
        ) {
          sampleArrData.samplingDate[index] = leftSlash;
        }
        if (
          sampleArrData.receiveDate[index] == " " ||
          sampleArrData.receiveDate[index] == undefined
        ) {
          sampleArrData.receiveDate[index] = leftSlash;
        }
        if (
          sampleArrData.reportDate[index] == " " ||
          sampleArrData.reportDate[index] == undefined
        ) {
          sampleArrData.reportDate[index] = leftSlash;
        }
        if (
          sampleArrData.motherSampleType[index] == " " ||
          sampleArrData.motherSampleType[index] == undefined
        ) {
          sampleArrData.motherSampleType[index] = leftSlash;
        }
        if (
          sampleArrData.fetusSampleType[index] == " " ||
          sampleArrData.fetusSampleType[index] == undefined
        ) {
          sampleArrData.fetusSampleType[index] = leftSlash;
        }
        if (
          sampleArrData.mother21[index] == " " ||
          sampleArrData.mother21[index] == undefined
        ) {
          sampleArrData.mother21[index] = leftSlash;
        }
        if (
          sampleArrData.mother18[index] == " " ||
          sampleArrData.mother18[index] == undefined
        ) {
          sampleArrData.mother18[index] = leftSlash;
        }
        if (
          sampleArrData.mother13[index] == " " ||
          sampleArrData.mother13[index] == undefined
        ) {
          sampleArrData.mother13[index] = leftSlash;
        }
        if (
          sampleArrData.motherNote[index] == " " ||
          sampleArrData.motherNote[index] == undefined
        ) {
          sampleArrData.motherNote[index] = leftSlash;
        }
        if (
          sampleArrData.fetus21[index] == " " ||
          sampleArrData.fetus21[index] == undefined
        ) {
          sampleArrData.fetus21[index] = leftSlash;
        }
        if (
          sampleArrData.fetus18[index] == " " ||
          sampleArrData.fetus18[index] == undefined
        ) {
          sampleArrData.fetus18[index] = leftSlash;
        }
        if (
          sampleArrData.fetus13[index] == " " ||
          sampleArrData.fetus13[index] == undefined
        ) {
          sampleArrData.fetus13[index] = leftSlash;
        }
        if (
          sampleArrData.fetusSexChromosome[index] == " " ||
          sampleArrData.fetusSexChromosome[index] == undefined
        ) {
          sampleArrData.fetusSexChromosome[index] = leftSlash;
        }
        if (
          sampleArrData.feutsNote[index] == " " ||
          sampleArrData.feutsNote[index] == undefined
        ) {
          sampleArrData.feutsNote[index] = leftSlash;
        }
        if (
          sampleArrData.sampleName[index] == " " ||
          sampleArrData.sampleName[index] == undefined
        ) {
          sampleArrData.sampleName[index] = leftSlash;
        }
        return {
          motherSampleNumber: name,
          motherSampleName: sampleArrData.motherSampleName[index],
          fetusSampleNumber: sampleArrData.fetusSampleNumber[index],
          fetusSampleName: sampleArrData.fetusSampleName[index],
          sex: sampleArrData.sex[index],
          age: sampleArrData.age[index],
          relationship_with_fetus: sampleArrData.relationship_with_fetus[index],
          relationship_with_mother:
            sampleArrData.relationship_with_mother[index],
          sendingPhysician: sampleArrData.sendingPhysician[index],
          samplingDate: sampleArrData.samplingDate[index],
          receiveDate: sampleArrData.receiveDate[index],
          reportDate: sampleArrData.reportDate[index],
          motherSampleType: sampleArrData.motherSampleType[index],
          fetusSampleType: sampleArrData.fetusSampleType[index],
          mother21: sampleArrData.mother21[index],
          mother18: sampleArrData.mother18[index],
          mother13: sampleArrData.mother13[index],
          motherSexChromosome: sampleArrData.motherSexChromosome[index],
          motherNote: sampleArrData.motherNote[index],
          fetus21: sampleArrData.fetus21[index],
          fetus18: sampleArrData.fetus18[index],
          fetus13: sampleArrData.fetus13[index],
          fetusSexChromosome: sampleArrData.fetusSexChromosome[index],
          feutsNote: sampleArrData.feutsNote[index],
          sampleName: sampleArrData.sampleName[index],
        };
      });
      console.log("sampleArr", sampleArr);
      if (sampleArr.length == 0) {
        var nullNotice =
          "样本信息表中数据暂无数据,请重新上传有数据的样本信息表!";
        this.showErrorNotification(nullNotice);
        log.error("\n" + nullNotice);
        this.errorNotification(
          sampleFileName,
          "当前处理输入文件：" +
            sampleFileName +
            "有误！" +
            "\n" +
            "样本信息表数据为空，请记得添加样本信息数据！"
        );
        loading.close();
      } else {
        this.tableData = sampleArr;
        loading.close();
        if (fileType == "summaryFileAndReportFile") {
          this.adjustTableHeight();
          var generateFileData = this.outputArr1;
          var generateFileDataPath = this.outputDirectry;
          var iconv = require("iconv-lite");
          iconv.skipDecodeWarning = true;
          this.removeSummaryData = [];
          for (var k = 0; k < generateFileData.length; k++) {
            // console.log("一",iconv.decode(generateFileData[k].comment, "gbk"))
            if (
              generateFileData[k].comment == undefined ||
              generateFileData[k].comment == "0"
            ) {
              console.log("sumarry 结果文件具体行:第", k);
            }
            if (
              generateFileData[k].comment == undefined ||
              generateFileData[k].comment == "0" ||
              iconv.decode(generateFileData[k].comment, "gbk") == "21 三体" ||
              iconv.decode(generateFileData[k].comment, "gbk") == "18 三体" ||
              iconv.decode(generateFileData[k].comment, "gbk") == "13 三体" ||
              iconv.decode(generateFileData[k].comment, "utf8") == "21 三体" ||
              iconv.decode(generateFileData[k].comment, "utf8") == "18 三体" ||
              iconv.decode(generateFileData[k].comment, "utf8") == "13 三体"
            ) {
              // 剔除需复核图谱数据
              console.log("sdada");
              this.removeSummaryData.push({
                sampleFileName: generateFileData[k].sampleFileName,
                chromosome13: generateFileData[k].chromosome13,
                chromosome18: generateFileData[k].chromosome18,
                chromosome21: generateFileData[k].chromosome21,
                chromosomeX: generateFileData[k].chromosomeX,
                chromosomeY: generateFileData[k].chromosomeY,
                sexChromosome: generateFileData[k].sexChromosome,
              });
            }
          }
          var removeSummaryData = this.removeSummaryData;
          console.log("remove", removeSummaryData);
          sampleArr.forEach((item, index) => {
            removeSummaryData.forEach((item, index1) => {
              if (
                sampleArr[index].sampleName ==
                removeSummaryData[index1].sampleFileName
              ) {
                var Result = "本结果提示，胎儿样本未见母体DNA污染，";
                var Trisomy13,
                  Trisomy18,
                  Trisomy21,
                  Trisomy13Stronger,
                  Trisomy18Stronger,
                  Trisomy21Stronger,
                  sexChromosome,
                  Trisomy13Color,
                  Trisomy18Color,
                  Trisomy21Color,
                  sexChromosomeColor,
                  sexChromosomeStronger,
                  reportResult,
                  reportResultColor,
                  reportOtherResult,
                  simpleReport;
                //判断规则1. 染色体都为2，性染色体全都对应XN 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+”-阴性“
                if (
                  (removeSummaryData[index1].chromosome13 == "2" &&
                    removeSummaryData[index1].chromosome18 == "2" &&
                    removeSummaryData[index1].chromosome21 == "2" &&
                    removeSummaryData[index1].chromosomeX == "1" &&
                    removeSummaryData[index1].chromosomeY == "1") ||
                  (removeSummaryData[index1].chromosome13 == "2" &&
                    removeSummaryData[index1].chromosome18 == "2" &&
                    removeSummaryData[index1].chromosome21 == "2" &&
                    removeSummaryData[index1].chromosomeX == "2")
                ) {
                  Trisomy13 = "未见三体";
                  Trisomy18 = "未见三体";
                  Trisomy21 = "未见三体";
                  Trisomy13Stronger = false;
                  Trisomy18Stronger = false;
                  Trisomy21Stronger = false;
                  sexChromosome = "未见异常";
                  Trisomy13Color = "000000";
                  Trisomy18Color = "000000";
                  Trisomy21Color = "000000";
                  sexChromosomeColor = "000000";
                  sexChromosomeStronger = false;
                  reportResult = "未见目标染色体数目异常";
                  reportResultColor = "000000";
                  reportOtherResult = "，可排除18号、13号、21号三体型。";
                  simpleReport = "-阴性";
                } else if (
                  (removeSummaryData[index1].chromosome13 == "2" &&
                    removeSummaryData[index1].chromosome18 == "2" &&
                    removeSummaryData[index1].chromosome21 == "3" &&
                    removeSummaryData[index1].chromosomeX == "1" &&
                    removeSummaryData[index1].chromosomeY == "1") ||
                  (removeSummaryData[index1].chromosome13 == "2" &&
                    removeSummaryData[index1].chromosome18 == "2" &&
                    removeSummaryData[index1].chromosome21 == "3" &&
                    removeSummaryData[index1].chromosomeX == "2")
                ) {
                  //判断规则2. 胎儿21染色体为3，性染色体全都对应XN 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-T21”
                  Trisomy13 = "未见三体";
                  Trisomy18 = "未见三体";
                  Trisomy21 = "提示三体";
                  Trisomy13Stronger = false;
                  Trisomy18Stronger = false;
                  Trisomy21Stronger = true;
                  sexChromosome = "未见异常";
                  Trisomy13Color = "000000";
                  Trisomy18Color = "000000";
                  Trisomy21Color = "ff0000";
                  sexChromosomeColor = "000000";
                  sexChromosomeStronger = false;
                  reportResult = "提示21号染色体三体";
                  reportResultColor = "ff0000";
                  reportOtherResult = "，可排除18号、13号三体型。";
                  simpleReport = "-T21";
                } else if (
                  (removeSummaryData[index1].chromosome13 == "2" &&
                    removeSummaryData[index1].chromosome18 == "3" &&
                    removeSummaryData[index1].chromosome21 == "2" &&
                    removeSummaryData[index1].chromosomeX == "1" &&
                    removeSummaryData[index1].chromosomeY == "1") ||
                  (removeSummaryData[index1].chromosome13 == "2" &&
                    removeSummaryData[index1].chromosome18 == "3" &&
                    removeSummaryData[index1].chromosome21 == "2" &&
                    removeSummaryData[index1].chromosomeX == "2")
                ) {
                  //判断规则3. 胎儿18染色体为3，性染色体全都对应XN 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-T18”
                  Trisomy13 = "未见三体";
                  Trisomy18 = "提示三体";
                  Trisomy21 = "未见三体";
                  Trisomy13Stronger = false;
                  Trisomy18Stronger = true;
                  Trisomy21Stronger = false;
                  Trisomy13Color = "000000";
                  Trisomy18Color = "ff0000";
                  Trisomy21Color = "000000";
                  sexChromosome = "未见异常";
                  sexChromosomeStronger = false;
                  sexChromosomeColor = "000000";
                  reportResult = "提示18号染色体三体";
                  reportResultColor = "ff0000";
                  reportOtherResult = "，可排除21号、13号三体型。";
                  simpleReport = "-T18";
                } else if (
                  (removeSummaryData[index1].chromosome13 == "3" &&
                    removeSummaryData[index1].chromosome18 == "2" &&
                    removeSummaryData[index1].chromosome21 == "2" &&
                    removeSummaryData[index1].chromosomeX == "1" &&
                    removeSummaryData[index1].chromosomeY == "1") ||
                  (removeSummaryData[index1].chromosome13 == "3" &&
                    removeSummaryData[index1].chromosome18 == "2" &&
                    removeSummaryData[index1].chromosome21 == "2" &&
                    removeSummaryData[index1].chromosomeX == "2")
                ) {
                  //判断规则4. 胎儿13染色体为3，性染色体全都对应XN 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-T13”
                  Trisomy13 = "提示三体";
                  Trisomy18 = "未见三体";
                  Trisomy21 = "未见三体";
                  Trisomy13Color = "ff0000";
                  Trisomy18Color = "000000";
                  Trisomy21Color = "000000";
                  sexChromosome = "未见异常";
                  Trisomy13Stronger = true;
                  Trisomy18Stronger = false;
                  Trisomy21Stronger = false;
                  sexChromosomeColor = "000000";
                  sexChromosomeStronger = false;
                  reportResult = "提示13号染色体三体";
                  reportResultColor = "ff0000";
                  reportOtherResult = "，可排除21号、18号三体型。";
                  simpleReport = "-T13";
                } else if (
                  removeSummaryData[index1].chromosome13 == "3" &&
                  removeSummaryData[index1].chromosome18 == "3" &&
                  removeSummaryData[index1].chromosome21 == "3" &&
                  removeSummaryData[index1].chromosomeX == "3"
                ) {
                  //判断规则5. 胎儿所有染色体为3，胎儿性染色体为XXX 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-三倍体”
                  Trisomy13 = "提示三体";
                  Trisomy18 = "提示三体";
                  Trisomy21 = "提示三体";
                  Trisomy13Stronger = true;
                  Trisomy18Stronger = true;
                  Trisomy21Stronger = true;
                  Trisomy13Color = "ff0000";
                  Trisomy18Color = "ff0000";
                  Trisomy21Color = "ff0000";
                  sexChromosome = "提示XXX";
                  sexChromosomeColor = "ff0000";
                  reportResult = "提示三倍体XXX";
                  sexChromosomeStronger = true;
                  reportResultColor = "ff0000";
                  reportOtherResult = "。";
                  simpleReport = "-三倍体";
                } else if (
                  removeSummaryData[index1].chromosome13 == "3" &&
                  removeSummaryData[index1].chromosome18 == "3" &&
                  removeSummaryData[index1].chromosome21 == "3" &&
                  removeSummaryData[index1].chromosomeX == "2" &&
                  removeSummaryData[index1].chromosomeY == "1"
                ) {
                  //判断规则6. 胎儿所有染色体为3，胎儿性染色体为XXY 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-三倍体”
                  Trisomy13 = "提示三体";
                  Trisomy18 = "提示三体";
                  Trisomy21 = "提示三体";
                  Trisomy13Stronger = true;
                  Trisomy18Stronger = true;
                  Trisomy21Stronger = true;
                  Trisomy13Color = "ff0000";
                  Trisomy18Color = "ff0000";
                  Trisomy21Color = "ff0000";
                  sexChromosome = "提示XXY";
                  sexChromosomeColor = "ff0000";
                  reportResult = "提示三倍体XXY";
                  sexChromosomeStronger = true;
                  reportResultColor = "ff0000";
                  reportOtherResult = "。";
                  simpleReport = "-三倍体";
                } else if (
                  removeSummaryData[index1].chromosome13 == "2" &&
                  removeSummaryData[index1].chromosome18 == "2" &&
                  removeSummaryData[index1].chromosome21 == "2" &&
                  removeSummaryData[index1].chromosomeX == "1" &&
                  removeSummaryData[index1].chromosomeY == "0"
                ) {
                  //判断规则7. 所有染色体为2，胎儿性染色体为性染色体数目异常 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-X单体”
                  Trisomy13 = "未见三体";
                  Trisomy18 = "未见三体";
                  Trisomy21 = "未见三体";
                  Trisomy13Stronger = false;
                  Trisomy18Stronger = false;
                  Trisomy21Stronger = false;
                  Trisomy13Color = "000000";
                  Trisomy18Color = "000000";
                  Trisomy21Color = "000000";
                  sexChromosome = "提示X染色体单体";
                  sexChromosomeColor = "ff0000";
                  sexChromosomeStronger = true;
                  reportResult = "性染色体数目提示X染色体单体";
                  reportResultColor = "ff0000";
                  reportOtherResult = "，可排除18号、13号、21号三体型。";
                  simpleReport = "-X单体";
                } else if (
                  // eslint-disable-next-line no-dupe-else-if
                  removeSummaryData[index1].chromosome13 == "2" &&
                  removeSummaryData[index1].chromosome18 == "2" &&
                  removeSummaryData[index1].chromosome21 == "2" &&
                  removeSummaryData[index1].chromosomeX == "2" &&
                  removeSummaryData[index1].chromosomeY == "1"
                ) {
                  //判断规则8. 所有染色体为2，胎儿性染色体为性染色体数目异常 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+”-XXY“
                  Trisomy13 = "未见三体";
                  Trisomy18 = "未见三体";
                  Trisomy21 = "未见三体";
                  Trisomy13Stronger = false;
                  Trisomy18Stronger = false;
                  Trisomy21Stronger = false;
                  Trisomy13Color = "000000";
                  Trisomy18Color = "000000";
                  Trisomy21Color = "000000";
                  sexChromosome = "提示XXY";
                  sexChromosomeColor = "ff0000";
                  sexChromosomeStronger = true;
                  reportResult = "性染色体数目提示XXY";
                  reportResultColor = "ff0000";
                  reportOtherResult = "，可排除18号、13号、21号三体型。";
                  simpleReport = "-XXY";
                } else if (
                  removeSummaryData[index1].chromosome13 == "2" &&
                  removeSummaryData[index1].chromosome18 == "2" &&
                  removeSummaryData[index1].chromosome21 == "2" &&
                  removeSummaryData[index1].chromosomeX == "3" &&
                  removeSummaryData[index1].chromosomeY == "0"
                ) {
                  //判断规则9. 所有染色体为2，胎儿性染色体为性染色体数目异常 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-XXX”
                  Trisomy13 = "未见三体";
                  Trisomy18 = "未见三体";
                  Trisomy21 = "未见三体";
                  Trisomy13Color = "000000";
                  Trisomy18Color = "000000";
                  Trisomy21Color = "000000";
                  Trisomy13Stronger = false;
                  Trisomy18Stronger = false;
                  Trisomy21Stronger = false;
                  sexChromosome = "提示XXX";
                  sexChromosomeColor = "ff0000";
                  sexChromosomeStronger = true;
                  reportResult = "性染色体数目提示XXX";
                  reportResultColor = "ff0000";
                  reportOtherResult = "，可排除18号、13号、21号三体型。";
                  simpleReport = "-XXX";
                } else if (
                  removeSummaryData[index1].chromosome13 == "2" &&
                  removeSummaryData[index1].chromosome18 == "2" &&
                  removeSummaryData[index1].chromosome21 == "2" &&
                  removeSummaryData[index1].chromosomeX == "1" &&
                  removeSummaryData[index1].chromosomeY == "2"
                ) {
                  //判断规则10. 所有染色体为2，胎儿性染色体为性染色体数目异常 报告名：“胎 儿样本编号”+“胎儿样本名”+“Qpcr快检”+”-XYY“
                  Trisomy13 = "未见三体";
                  Trisomy18 = "未见三体";
                  Trisomy21 = "未见三体";
                  Trisomy13Stronger = false;
                  Trisomy18Stronger = false;
                  Trisomy21Stronger = false;
                  Trisomy13Color = "000000";
                  Trisomy18Color = "000000";
                  Trisomy21Color = "000000";
                  sexChromosome = "提示XYY";
                  sexChromosomeColor = "ff0000";
                  sexChromosomeStronger = true;
                  reportResult = "性染色体数目提示XYY";
                  reportResultColor = "ff0000";
                  reportOtherResult = "，可排除18号、13号、21号三体型。";
                  simpleReport = "-XYY";
                }
                console.log("测试", selectReport);
                if (selectReport == "default") {
                  var officegen = window.require("officegen");
                  var fs = window.require("fs");

                  var docx = officegen({
                    type: "docx",
                    pageMargins: {
                      top: 141,
                      bottom: 850,
                      left: 908,
                      right: 908,
                    },
                    author: "彭朝敏",
                    creater: "彭朝敏",
                    columns: "1",
                  }); //word

                  docx.on("finalize", function (written) {
                    console.log(
                      "Finish to create Word file.\nTotal bytes created: " +
                        written +
                        "\n"
                    );
                  });

                  docx.on("error", function (err) {
                    console.log(err);
                  });
                  var header1 = docx.getHeader().createP();
                  var header2 = docx.getHeader().createP({
                    align: "right",
                    superscript: true,
                    subscript: true,
                  });
                  // var pObj = docx.createP()
                  if (process.platform === "darwin") {
                    var pic = path.join(
                      process.cwd(),
                      "/Applications/AneuFiler.app/Contents/Resources/hunanjiahui.png"
                    );
                  } else if (process.platform === "win32") {
                    var pic = path.join(
                      process.cwd(),
                      "/resources/hunanjiahui.png"
                    );
                  } else if (process.platform === "linux") {
                    var pic = path.join(
                      process.cwd(),
                      "/resources/hunanjiahui.png"
                    );
                  }
                  console.log("pic", pic);
                  header1.addImage(pic, {
                    cx: 685,
                    cy: 75,
                    underline: true,
                    color: "ff0000",
                  });
                  header2.addText("家系编号:", {
                    font_size: 10.5,
                    line_height: 200,
                  });
                  var footer = docx.getFooter().createP();
                  var footer1 = docx.getFooter().createP();
                  var InspectorName = "刘鑫林";
                  var ReviewerName = "曾桥";
                  var chiefPhysicianName = "邬玲仟";
                  var telephone = "0731-84805365";
                  var addressName = "湖南省长沙市开福区湘雅路74号";

                  console.log("reportDateTime", sampleArr[index].reportDate);
                  footer.addHorizontalLine();
                  footer1.addText("检测人：", { font_size: 9, bold: true });
                  footer1.addText(InspectorName, { font_size: 9 });
                  footer1.addText(
                    "                                            审核人：",
                    { font_size: 9, bold: true }
                  );
                  footer1.addText(ReviewerName, { font_size: 9 });
                  footer1.addText(
                    "                                                                                      主任医师：",
                    { font_size: 9, bold: true }
                  );
                  footer1.addText(chiefPhysicianName, { font_size: 9 });
                  var footer2 = docx.getFooter().createP();
                  // console.log("footer2[index]",footer2[index])
                  footer2.addText("咨询热线：", { font_size: 9, bold: true });
                  footer2.addText(telephone, {
                    font_size: 9,
                    font_face: "Times New Roman",
                  });
                  footer2.addText("                         地址：", {
                    font_size: 9,
                    bold: true,
                  });
                  footer2.addText(addressName, {
                    font_size: 9,
                    font_face: "Times New Roman",
                    font_face_east: "SimSun",
                  });
                  footer2.addText(
                    "                                   报告日期：",
                    {
                      font_size: 9,
                      bold: true,
                    }
                  );
                  footer2.addText(sampleArr[index].reportDate, {
                    font_size: 9,
                    font_face: "Times New Roman",
                    font_face_east: "SimSun",
                  });
                  var pObj = docx.createP({ align: "center" }); // 创建行 设置居中 大标题
                  pObj.addText("QF-PCR母血污染鉴定及快速筛查检测报告", {
                    bold: true,
                    font_size: 18,
                    font_face: "Times New Roman",
                    font_face_east: "SimSun",
                  }); // 添加文字 设置字体样式 加粗 大小
                  var pObj1 = docx.createP({ align: "left" });
                  pObj1.addText("样本信息", { bold: true, font_size: 12 });
                  var data1 = [
                    [
                      {
                        type: "text",
                        val: "家系编号： ",
                        opt: { font_size: 10.5 },
                      },
                      {
                        type: "text",
                        val: "",
                        opt: { font_size: 10.5 },
                      },
                      {
                        type: "text",
                        val: "                                                                                                      送检机构：",
                        opt: { font_size: 10.5 },
                      },
                      {
                        type: "text",
                        val: "三亚市妇幼保健院",
                        opt: { font_size: 10.5 },
                      },
                    ],
                    [
                      {
                        type: "text",
                        val: "检测类型：",
                        opt: { font_size: 10.5 },
                      },
                      {
                        type: "text",
                        val: "QF-PCR母血污染鉴定及快速筛查检测",
                        opt: {
                          font_size: 10.5,
                          font_face: "Times New Roman",
                          font_face_east: "SimSun",
                        },
                      },
                      {
                        type: "text",
                        val: "                             送检医师：",
                        opt: { font_size: 10.5 },
                      },
                      {
                        type: "text",
                        val: sampleArr[index].sendingPhysician,
                        opt: { font_size: 10.5 },
                      },
                    ],
                    [
                      {
                        type: "text",
                        val: "采样日期：",
                        opt: { font_size: 10.5 },
                      },
                      {
                        type: "text",
                        val: sampleArr[index].samplingDate,
                        opt: { font_size: 10.5, font_face: "Times New Roman" },
                      },
                      {
                        type: "text",
                        val: "                                                                                  接收日期：",
                        opt: { font_size: 10.5 },
                      },
                      {
                        type: "text",
                        val: sampleArr[index].receiveDate,
                        opt: { font_size: 10.5, font_face: "Times New Roman" },
                      },
                    ],
                  ];
                  docx.createByJson(data1);
                  var style = {
                    "@w:val": "single",
                    "@w:sz": "4",
                    "@w:space": "0",
                    "@w:color": "000000", //黑色
                  };
                  var borderStyle = {
                    "w:top": style,
                    "w:bottom": style,
                    // 'w:left': style2,
                    // 'w:right': style2,
                    "w:insideH": style,
                    // 'w:insideV': style,
                  };
                  var table1 = [
                    [
                      {
                        val: "样本编号",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          // cellColWidth: 42,
                          cellColWidth: 1200,
                          b: true,
                          // sz: '48',
                          shd: {
                            fill: "71c3fb",
                          },
                          // fontFamily: "Avenir Book"
                        },
                      },
                      {
                        val: "姓名",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          b: true,
                          // cellColWidth: 1500,
                          // b:true,
                          // color: "A00000",
                          // align: "right",
                          shd: {
                            fill: "71c3fb",
                          },
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: "性别",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          b: true,
                          shd: {
                            fill: "71c3fb",
                          },
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: "年龄",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          b: true,
                          shd: {
                            fill: "71c3fb",
                          },
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: "关系",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          b: true,
                          shd: {
                            fill: "71c3fb",
                          },
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: "样本类型",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          b: true,
                          shd: {
                            fill: "71c3fb",
                          },
                          cellColWidth: 2000,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: "备注",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          b: true,
                          shd: {
                            fill: "71c3fb",
                          },
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                    ],
                    [
                      {
                        val: sampleArr[index].MSampleNo,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                      {
                        val: sampleArr[index].MSampleName,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 1500,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: sampleArr[index].sex,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: sampleArr[index].age,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                      {
                        val: sampleArr[index].FRelation,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: sampleArr[index].MSampleType,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 1600,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                      {
                        val: "",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                    ],
                    [
                      {
                        val: sampleArr[index].FSampleNo,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                      {
                        val: sampleArr[index].FSampleName,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 1600,
                          fixedLayout: true,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: "",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: "",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: sampleArr[index].MRelation,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: sampleArr[index].FSampleType,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: "",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          // cellColWidth: 42,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                    ],
                  ];
                  var tableStyle1 = {
                    tableColWidth: 1400,
                    tableSize: 18,
                    tableColor: "ada",
                    tableAlign: "left",
                    tableVAlign: "center",
                    //   borders: true,
                    borderStyle: borderStyle,
                    //   columns:[{width:1200},{width:1600},{width:100},{width:100},{width:100},{width:1500},{width:100}]
                  };
                  docx.createTable(table1, tableStyle1);
                  var pObj4 = docx.createP();
                  pObj4.addText("");
                  var pObj2 = docx.createP({ align: "left" });
                  pObj2.addText("检测项目", { bold: true, font_size: 12 });
                  var table2 = [
                    [
                      {
                        val: "项目类型",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          // cellColWidth: 42,
                          cellColWidth: 2500,
                          b: true,
                          // sz: '48',
                          shd: {
                            fill: "71c3fb",
                          },
                          // fontFamily: "Avenir Book"
                        },
                      },
                      {
                        val: "检测范围",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          b: true,
                          cellColWidth: 4000,
                          // b:true,
                          // color: "A00000",
                          // align: "right",
                          shd: {
                            fill: "71c3fb",
                          },
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: "检测方法",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          b: true,
                          shd: {
                            fill: "71c3fb",
                          },
                          cellColWidth: 4000,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                    ],
                    [
                      {
                        val: "QF-PCR母血污染鉴定",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 2200,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                      {
                        val: "13, 18, 21, X, Y染色体",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 3500,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                      {
                        val: "QF-PCR + 毛细管电泳扫描",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 3000,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                    ],
                  ];
                  // var style2 = {
                  //     '@w:val': 'single',
                  //     '@w:sz': '4',
                  //     '@w:space': '0',
                  //     '@w:color': '000000'//黑色
                  //   }
                  // // var style2 ={
                  // //     '@w:val': 'single',
                  // //     '@w:sz': '4',
                  // //     '@w:space': '1',
                  // //     '@w:color': 'FFFFFF'//白色
                  // // }
                  // var borderStyle = {
                  //     'w:top': style2,
                  //     'w:bottom': style2,
                  //     // 'w:left': style2,
                  //     // 'w:right': style2,
                  //     'w:insideH': style2,
                  //     // 'w:insideV': style,
                  //   }
                  var tableStyle2 = {
                    tableColWidth: 8600,
                    tableSize: 18,
                    tableColor: "ada",
                    tableAlign: "left",
                    tableVAlign: "center",
                    //   borders: true,
                    borderStyle: borderStyle,
                    //   columns:[{width:1200},{width:1600},{width:100},{width:100},{width:100},{width:1500},{width:100}]
                  };
                  docx.createTable(table2, tableStyle2);
                  var pObj5 = docx.createP();
                  pObj5.addText("");
                  var pObj3 = docx.createP({ align: "left" });
                  pObj3.addText("筛查检测结果", { bold: true, font_size: 12 });

                  var table3 = [
                    [
                      {
                        val: "母血污染分析结果",
                        opts: {
                          align: "center",
                          vAlign: "center",
                          sz: "21",
                          // cellColWidth: 42,
                          cellColWidth: 3500,
                          b: true,
                          // sz: '48',
                          // shd: {
                          //   fill: "71c3fb",
                          // },
                          // fontFamily: "Avenir Book"
                        },
                      },
                      {
                        val: "胎儿样本未见母体DNA污染",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          gridSpan: 2,
                          cellColWidth: 7000,
                          // b:true,
                          // color: "A00000",
                          // align: "right",
                          // shd: {
                          //   fill: "71c3fb",
                          // },
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                    ],
                    [
                      {
                        val: "QF-PCR分析结果",
                        opts: {
                          align: "center",
                          vAlign: "center",
                          sz: "21",
                          b: true,
                          cellColWidth: 2200,
                          vMerge: "restart",
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                      {
                        val: "13三体",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 2600,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                      {
                        val: Trisomy13,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          b: Trisomy13Stronger,
                          color: Trisomy13Color,
                          cellColWidth: 3200,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                    ],
                    [
                      { opts: { vMerge: "continue" } },
                      {
                        val: "18三体",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 2600,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                      {
                        val: Trisomy18,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          b: Trisomy18Stronger,
                          cellColWidth: 3000,
                          color: Trisomy18Color,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                    ],
                    [
                      { opts: { vMerge: "continue" } },
                      {
                        val: "21三体",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 2600,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                          fontFamily: "Times New Roman",
                        },
                      },
                      {
                        val: Trisomy21,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 3000,
                          color: Trisomy21Color,
                          b: Trisomy21Stronger,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                    ],
                    [
                      { opts: { vMerge: "continue" } },
                      {
                        val: "性染色体",
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          //   b:true,
                          cellColWidth: 2600,
                          // b:true,
                          // sz: '48',
                          // shd: {
                          //   fill: "92CDDC",
                          //   themeFill: "text1",
                          //   "themeFillTint": "80"
                          // }
                        },
                      },
                      {
                        val: sexChromosome,
                        opts: {
                          align: "left",
                          vAlign: "center",
                          sz: "21",
                          b: sexChromosomeStronger,
                          cellColWidth: 3000,
                          color: sexChromosomeColor,
                          fontFamily: "Times New Roman",
                        },
                      },
                    ],
                  ];
                  var tableStyle3 = {
                    tableColWidth: 8500,
                    tableSize: 18,
                    tableColor: "ada",
                    tableAlign: "left",
                    tableVAlign: "center",
                    //   borders: true,
                    borderStyle: borderStyle,
                    //   columns:[{width:1200},{width:1600},{width:100},{width:100},{width:100},{width:1500},{width:100}]
                  };
                  docx.createTable(table3, tableStyle3);
                  var pObj6 = docx.createP({ align: "left" });
                  pObj6.addText("结果描述：", { bold: true, font_size: 10.5 });
                  var pObj7 = docx.createP({ indentFirstLine: "440" });
                  console.log("reportResult", reportResult);
                  pObj7.addText(Result, {
                    font_size: 10.5,
                    font_face: "Times New Roman",
                    font_face_east: "SimSun",
                  });
                  pObj7.addText(reportResult, {
                    font_size: 10.5,
                    color: reportResultColor,
                    bold: sexChromosomeStronger,
                    font_face: "Times New Roman",
                    font_face_east: "SimSun",
                  });
                  pObj7.addText(reportOtherResult, {
                    font_size: 10.5,
                    font_face: "Times New Roman",
                    font_face_east: "SimSun",
                  });
                  var pObj8 = docx.createP();
                  pObj8.addText("");
                  var pObj16 = docx.createP();
                  pObj16.addText("检测方法：", { bold: true, font_size: 10.5 });
                  pObj16.addText(
                    "DNA从样本中抽提并纯化后，采用多重荧光DNA模板进行扩增，扩增产物在遗传分析仪上进行电泳分析。",
                    {
                      font_size: 10.5,
                      font_face: "Times New Roman",
                      font_face_east: "SimSun",
                    }
                  );
                  // var data2 = [
                  //   [
                  //     {
                  //       type: "text",
                  //       val: "检测方法：",
                  //       opt: { bold: true, font_size: 10.5 },
                  //     },
                  //     {
                  //       type: "text",
                  //       val: "DNA从样本中抽提并纯化后，采用多重荧光PCR对DNA模板进行扩增，扩增产物在遗传分析仪上进行电泳分析。",
                  //       opt: { font_size: 10.5 },
                  //     },
                  //   ],
                  // ];
                  // docx.createByJson(data2);
                  var pObj9 = docx.createP({ align: "left" });
                  pObj9.addText("局限性声明：", {
                    bold: true,
                    font_size: 10.5,
                  });
                  // var pObj10 = docx.createListOfNumbers ();
                  var pObj10 = docx.createP();
                  pObj10.addText(
                    "1.本检测结果仅为筛查结果，不作为产前诊断结果，不单独作为确诊或排除病例的依据，最终结果需要核型分析方法进行确诊。阴性结果不能排除其他染色体三体，其结果的确认应结合临床进行综合判断；",
                    {
                      font_size: 10.5,
                      font_face: "Times New Roman",
                      font_face_east: "SimSun",
                    }
                  );
                  var pObj11 = docx.createP();
                  pObj11.addText(
                    "2.本检测仅对21号，18号，13号及性染色体进行筛查检测，不能排除其他染色体异常。且只能排除染色体数目异常，不能排除染色体结构异常，亦不能排除微小染色体异常或某些基因突变；",
                    {
                      font_size: 10.5,
                      font_face: "Times New Roman",
                      font_face_east: "SimSun",
                    }
                  );
                  var pObj12 = docx.createP();
                  pObj12.addText(
                    "3.本检测不能检测21号、18号、13号及性染色体低比例嵌合体现象。",
                    {
                      font_size: 10.5,
                      font_face: "Times New Roman",
                      font_face_east: "SimSun",
                    }
                  );
                  // 本检测不能检测21号、18号、13号及性染色体低比例嵌合体现象。
                  // word分页
                  docx.putPageBreak();
                  var pObj13 = docx.createP({ align: "left" });
                  pObj13.addText("QF-PCR毛细管电泳扫描结果：", {
                    bold: true,
                    font_size: 10.5,
                    font_face: "Times New Roman",
                    font_face_east: "SimSun",
                  });
                  outFileName[index] =
                    sampleArr[index].FSampleNo +
                    sampleArr[index].FSampleName +
                    "Qpcr快检" +
                    simpleReport +
                    ".docx";
                  console.log("outFileName[index]", outFileName[index]);
                  outFileNamePath[index] = path.join(
                    generateFileDataPath,
                    outFileName[index]
                  );
                  console.log("outFileNamePath[index]", outFileNamePath[index]);
                  var out = fs.createWriteStream(outFileNamePath[index]); // 文件写入
                  out.on("error", function (err) {
                    console.log(err);
                  });
                  var result1 = docx.generate(out); // 当前目录生成word
                  console.log("result1", result1);
                } else if (selectReport == "other") {
                  console.log("生成其他报告");
                }
              }
            });
          });
          loading.close();
          var reportMessage = "已生成报告，请注意查收！";
          this.showSuccessNotification(reportMessage);
        } else if (fileType == "reportFile") {
          var fs = window.require("fs");
          this.adjustTableHeight();
          fs.mkdir(reportFilePath, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log("Directory created successfully.");
            }
          });
          sampleArr.forEach((item, index) => {
            var Result = "本结果提示，胎儿样本未见母体DNA污染，";
            var Trisomy13,
              Trisomy18,
              Trisomy21,
              Trisomy13Stronger,
              Trisomy18Stronger,
              Trisomy21Stronger,
              sexChromosome,
              Trisomy13Color,
              Trisomy18Color,
              Trisomy21Color,
              sexChromosomeColor,
              sexChromosomeStronger,
              reportResult,
              reportResultColor,
              reportOtherResult,
              simpleReport;
            if (
              sampleArr[index].fetus21 == "2" &&
              sampleArr[index].fetus18 == "2" &&
              sampleArr[index].fetus13 == "2" &&
              sampleArr[index].fetusSexChromosome == "XN"
            ) {
              Trisomy13 = "未见三体";
              Trisomy18 = "未见三体";
              Trisomy21 = "未见三体";
              Trisomy13Stronger = false;
              Trisomy18Stronger = false;
              Trisomy21Stronger = false;
              sexChromosome = "未见异常";
              Trisomy13Color = "000000";
              Trisomy18Color = "000000";
              Trisomy21Color = "000000";
              sexChromosomeColor = "000000";
              sexChromosomeStronger = false;
              reportResult = "未见目标染色体数目异常";
              reportResultColor = "000000";
              reportOtherResult = "，可排除18号、13号、21号三体型。";
              simpleReport = "-阴性";
            } else if (
              sampleArr[index].fetus21 == "3" &&
              sampleArr[index].fetus18 == "2" &&
              sampleArr[index].fetus13 == "2" &&
              sampleArr[index].fetusSexChromosome == "XN"
            ) {
              //判断规则2. 胎儿21染色体为3，性染色体全都对应XN 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-T21”
              Trisomy13 = "未见三体";
              Trisomy18 = "未见三体";
              Trisomy21 = "提示三体";
              Trisomy13Stronger = false;
              Trisomy18Stronger = false;
              Trisomy21Stronger = true;
              sexChromosome = "未见异常";
              Trisomy13Color = "000000";
              Trisomy18Color = "000000";
              Trisomy21Color = "ff0000";
              sexChromosomeColor = "000000";
              sexChromosomeStronger = false;
              reportResult = "提示21号染色体三体";
              reportResultColor = "ff0000";
              reportOtherResult = "，可排除18号、13号三体型。";
              simpleReport = "-T21";
            } else if (
              sampleArr[index].fetus21 == "2" &&
              sampleArr[index].fetus18 == "3" &&
              sampleArr[index].fetus13 == "2" &&
              sampleArr[index].fetusSexChromosome == "XN"
            ) {
              //判断规则3. 胎儿18染色体为3，性染色体全都对应XN 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-T18”
              Trisomy13 = "未见三体";
              Trisomy18 = "提示三体";
              Trisomy21 = "未见三体";
              Trisomy13Stronger = false;
              Trisomy18Stronger = true;
              Trisomy21Stronger = false;
              Trisomy13Color = "000000";
              Trisomy18Color = "ff0000";
              Trisomy21Color = "000000";
              sexChromosome = "未见异常";
              sexChromosomeStronger = false;
              sexChromosomeColor = "000000";
              reportResult = "提示18号染色体三体";
              reportResultColor = "ff0000";
              reportOtherResult = "，可排除21号、13号三体型。";
              simpleReport = "-T18";
            } else if (
              sampleArr[index].fetus21 == "2" &&
              sampleArr[index].fetus18 == "2" &&
              sampleArr[index].fetus13 == "3" &&
              sampleArr[index].fetusSexChromosome == "XN"
            ) {
              //判断规则4. 胎儿13染色体为3，性染色体全都对应XN 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-T13”
              Trisomy13 = "提示三体";
              Trisomy18 = "未见三体";
              Trisomy21 = "未见三体";
              Trisomy13Color = "ff0000";
              Trisomy18Color = "000000";
              Trisomy21Color = "000000";
              sexChromosome = "未见异常";
              Trisomy13Stronger = true;
              Trisomy18Stronger = false;
              Trisomy21Stronger = false;
              sexChromosomeColor = "000000";
              sexChromosomeStronger = false;
              reportResult = "提示13号染色体三体";
              reportResultColor = "ff0000";
              reportOtherResult = "，可排除21号、18号三体型。";
              simpleReport = "-T13";
            } else if (
              sampleArr[index].fetus21 == "3" &&
              sampleArr[index].fetus18 == "3" &&
              sampleArr[index].fetus13 == "3" &&
              sampleArr[index].fetusSexChromosome == "XXX"
            ) {
              //判断规则5. 胎儿所有染色体为3，胎儿性染色体为XXX 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-三倍体”
              Trisomy13 = "提示三体";
              Trisomy18 = "提示三体";
              Trisomy21 = "提示三体";
              Trisomy13Stronger = true;
              Trisomy18Stronger = true;
              Trisomy21Stronger = true;
              Trisomy13Color = "ff0000";
              Trisomy18Color = "ff0000";
              Trisomy21Color = "ff0000";
              sexChromosome = "提示XXX";
              sexChromosomeColor = "ff0000";
              reportResult = "提示三倍体XXX";
              sexChromosomeStronger = true;
              reportResultColor = "ff0000";
              reportOtherResult = "。";
              simpleReport = "-三倍体";
            } else if (
              sampleArr[index].fetus21 == "3" &&
              sampleArr[index].fetus18 == "3" &&
              sampleArr[index].fetus13 == "3" &&
              sampleArr[index].fetusSexChromosome == "XXY"
            ) {
              //判断规则6. 胎儿所有染色体为3，胎儿性染色体为XXY 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-三倍体”
              Trisomy13 = "提示三体";
              Trisomy18 = "提示三体";
              Trisomy21 = "提示三体";
              Trisomy13Stronger = true;
              Trisomy18Stronger = true;
              Trisomy21Stronger = true;
              Trisomy13Color = "ff0000";
              Trisomy18Color = "ff0000";
              Trisomy21Color = "ff0000";
              sexChromosome = "提示XXY";
              sexChromosomeColor = "ff0000";
              reportResult = "提示三倍体XXY";
              sexChromosomeStronger = true;
              reportResultColor = "ff0000";
              reportOtherResult = "。";
              simpleReport = "-三倍体";
            } else if (
              sampleArr[index].fetus21 == "2" &&
              sampleArr[index].fetus18 == "2" &&
              sampleArr[index].fetus13 == "2" &&
              sampleArr[index].fetusSexChromosome == "性染色体数目异常" &&
              sampleArr[index].feutsNote ==
                "未见明显MCC，提示X染色体单体，符合亲缘关系"
            ) {
              //判断规则7. 所有染色体为2，胎儿性染色体为性染色体数目异常 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-X单体”
              Trisomy13 = "未见三体";
              Trisomy18 = "未见三体";
              Trisomy21 = "未见三体";
              Trisomy13Stronger = false;
              Trisomy18Stronger = false;
              Trisomy21Stronger = false;
              Trisomy13Color = "000000";
              Trisomy18Color = "000000";
              Trisomy21Color = "000000";
              sexChromosome = "提示X染色体单体";
              sexChromosomeColor = "ff0000";
              sexChromosomeStronger = true;
              reportResult = "性染色体数目提示X染色体单体";
              reportResultColor = "ff0000";
              reportOtherResult = "，可排除18号、13号、21号三体型。";
              simpleReport = "-X单体";
            } else if (
              sampleArr[index].fetus21 == "2" &&
              sampleArr[index].fetus18 == "2" &&
              sampleArr[index].fetus13 == "2" &&
              sampleArr[index].fetusSexChromosome == "性染色体数目异常" &&
              sampleArr[index].feutsNote == "未见明显MCC，提示XXY，符合亲缘关系"
            ) {
              //判断规则8. 所有染色体为2，胎儿性染色体为性染色体数目异常 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+”-XXY“
              Trisomy13 = "未见三体";
              Trisomy18 = "未见三体";
              Trisomy21 = "未见三体";
              Trisomy13Stronger = false;
              Trisomy18Stronger = false;
              Trisomy21Stronger = false;
              Trisomy13Color = "000000";
              Trisomy18Color = "000000";
              Trisomy21Color = "000000";
              sexChromosome = "提示XXY";
              sexChromosomeColor = "ff0000";
              sexChromosomeStronger = true;
              reportResult = "性染色体数目提示XXY";
              reportResultColor = "ff0000";
              reportOtherResult = "，可排除18号、13号、21号三体型。";
              simpleReport = "-XXY";
            } else if (
              sampleArr[index].fetus21 == "2" &&
              sampleArr[index].fetus18 == "2" &&
              sampleArr[index].fetus13 == "2" &&
              sampleArr[index].fetusSexChromosome == "性染色体数目异常" &&
              sampleArr[index].feutsNote == "未见明显MCC，提示XXX，符合亲缘关系"
            ) {
              //判断规则9. 所有染色体为2，胎儿性染色体为性染色体数目异常 报告名：“胎儿样本编号”+“胎儿样本名”+“Qpcr快检”+“-XXX”
              Trisomy13 = "未见三体";
              Trisomy18 = "未见三体";
              Trisomy21 = "未见三体";
              Trisomy13Color = "000000";
              Trisomy18Color = "000000";
              Trisomy21Color = "000000";
              Trisomy13Stronger = false;
              Trisomy18Stronger = false;
              Trisomy21Stronger = false;
              sexChromosome = "提示XXX";
              sexChromosomeColor = "ff0000";
              sexChromosomeStronger = true;
              reportResult = "性染色体数目提示XXX";
              reportResultColor = "ff0000";
              reportOtherResult = "，可排除18号、13号、21号三体型。";
              simpleReport = "-XXX";
            } else if (
              sampleArr[index].fetus21 == "2" &&
              sampleArr[index].fetus18 == "2" &&
              sampleArr[index].fetus13 == "2" &&
              sampleArr[index].fetusSexChromosome == "性染色体数目异常" &&
              sampleArr[index].feutsNote == "未见明显MCC，提示XYY，符合亲缘关系"
            ) {
              //判断规则10. 所有染色体为2，胎儿性染色体为性染色体数目异常 报告名：“胎 儿样本编号”+“胎儿样本名”+“Qpcr快检”+”-XYY“
              Trisomy13 = "未见三体";
              Trisomy18 = "未见三体";
              Trisomy21 = "未见三体";
              Trisomy13Stronger = false;
              Trisomy18Stronger = false;
              Trisomy21Stronger = false;
              Trisomy13Color = "000000";
              Trisomy18Color = "000000";
              Trisomy21Color = "000000";
              sexChromosome = "提示XYY";
              sexChromosomeColor = "ff0000";
              sexChromosomeStronger = true;
              reportResult = "性染色体数目提示XYY";
              reportResultColor = "ff0000";
              reportOtherResult = "，可排除18号、13号、21号三体型。";
              simpleReport = "-XYY";
            }
            if (selectReport == "default") {
              var officegen = window.require("officegen");
              var docx = officegen({
                type: "docx",
                pageMargins: {
                  top: 141,
                  bottom: 850,
                  left: 908,
                  right: 908,
                },
                columns: "1",
              }); //word

              docx.on("finalize", function (written) {
                console.log(
                  "Finish to create Word file.\nTotal bytes created: " +
                    written +
                    "\n"
                );
              });

              docx.on("error", function (err) {
                console.log(err);
              });
              var header1 = docx.getHeader().createP();
              var header2 = docx.getHeader().createP({
                align: "right",
                superscript: true,
                subscript: true,
              });
              // var pObj = docx.createP()
              if (process.platform === "darwin") {
                var pic = path.join(
                  process.cwd(),
                  "/Applications/AneuFiler.app/Contents/Resources/hunanjiahui.png"
                );
              } else if (process.platform === "win32") {
                var pic = path.join(
                  process.cwd(),
                  "/resources/hunanjiahui.png"
                );
              } else if (process.platform === "linux") {
                var pic = path.join(
                  process.cwd(),
                  "/resources/hunanjiahui.png"
                );
              }
              header1.addImage(pic, {
                cx: 685,
                cy: 75,
                underline: true,
                color: "ff0000",
              });
              header2.addText("家系编号:", {
                font_size: 10.5,
                line_height: 200,
              });
              var footer = docx.getFooter().createP();
              var footer1 = docx.getFooter().createP();
              var InspectorName = "刘鑫林";
              var ReviewerName = "曾桥";
              var chiefPhysicianName = "邬玲仟";
              var telephone = "0731-84805365";
              var addressName = "湖南省长沙市开福区湘雅路74号";
              footer.addHorizontalLine();
              footer1.addText("检测人：", { font_size: 9, bold: true });
              footer1.addText(InspectorName, { font_size: 9 });
              footer1.addText(
                "                                            审核人：",
                { font_size: 9, bold: true }
              );
              footer1.addText(ReviewerName, { font_size: 9 });
              footer1.addText(
                "                                                                                      主任医师：",
                { font_size: 9, bold: true }
              );
              footer1.addText(chiefPhysicianName, { font_size: 9 });
              var footer2 = docx.getFooter().createP();
              // console.log("footer2[index]",footer2[index])
              footer2.addText("咨询热线：", { font_size: 9, bold: true });
              footer2.addText(telephone, {
                font_size: 9,
                font_face: "Times New Roman",
              });
              footer2.addText("                         地址：", {
                font_size: 9,
                bold: true,
              });
              footer2.addText(addressName, {
                font_size: 9,
                font_face: "Times New Roman",
                font_face_east: "SimSun",
              });
              footer2.addText("                                   报告日期：", {
                font_size: 9,
                bold: true,
              });
              footer2.addText(sampleArr[index].reportDate, {
                font_size: 9,
                font_face: "Times New Roman",
                font_face_east: "SimSun",
              });
              //var tows = ['id', 'provinceZh', 'leaderZh', 'cityZh', 'cityEn'];//创建一个和表头对应且名称与数据库字段对应数据，便于循环取出数据
              var pObj = docx.createP({ align: "center" }); // 创建行 设置居中 大标题
              pObj.addText("QF-PCR母血污染鉴定及快速筛查检测报告", {
                bold: true,
                font_size: 18,
                font_face: "Times New Roman",
                font_face_east: "SimSun",
              }); // 添加文字 设置字体样式 加粗 大小
              var pObj1 = docx.createP({ align: "left" });
              pObj1.addText("样本信息", { bold: true, font_size: 12 });
              var data1 = [
                [
                  {
                    type: "text",
                    val: "家系编号： ",
                    opt: { font_size: 10.5 },
                  },
                  {
                    type: "text",
                    val: "",
                    opt: { font_size: 10.5 },
                  },
                  {
                    type: "text",
                    val: "                                                                                                      送检机构：",
                    opt: { font_size: 10.5 },
                  },
                  {
                    type: "text",
                    val: "三亚市妇幼保健院",
                    opt: { font_size: 10.5 },
                  },
                ],
                [
                  {
                    type: "text",
                    val: "检测类型：",
                    opt: { font_size: 10.5 },
                  },
                  {
                    type: "text",
                    val: "QF-PCR母血污染鉴定及快速筛查检测",
                    opt: {
                      font_size: 10.5,
                      font_face: "Times New Roman",
                      font_face_east: "SimSun",
                    },
                  },
                  {
                    type: "text",
                    val: "                             送检医师：",
                    opt: { font_size: 10.5 },
                  },
                  {
                    type: "text",
                    val: sampleArr[index].sendingPhysician,
                    opt: { font_size: 10.5 },
                  },
                ],
                [
                  {
                    type: "text",
                    val: "采样日期：",
                    opt: { font_size: 10.5 },
                  },
                  {
                    type: "text",
                    val: sampleArr[index].samplingDate,
                    opt: { font_size: 10.5, font_face: "Times New Roman" },
                  },
                  {
                    type: "text",
                    val: "                                                                                  接收日期：",
                    opt: { font_size: 10.5 },
                  },
                  {
                    type: "text",
                    val: sampleArr[index].receiveDate,
                    opt: { font_size: 10.5, font_face: "Times New Roman" },
                  },
                ],
              ];
              docx.createByJson(data1);
              var style = {
                "@w:val": "single",
                "@w:sz": "4",
                "@w:space": "0",
                "@w:color": "000000", //黑色
              };
              var borderStyle = {
                "w:top": style,
                "w:bottom": style,
                // 'w:left': style2,
                // 'w:right': style2,
                "w:insideH": style,
                // 'w:insideV': style,
              };
              var table1 = [
                [
                  {
                    val: "样本编号",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      // cellColWidth: 42,
                      cellColWidth: 1200,
                      b: true,
                      // sz: '48',
                      shd: {
                        fill: "71c3fb",
                      },
                      // fontFamily: "Avenir Book"
                    },
                  },
                  {
                    val: "姓名",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      b: true,
                      // cellColWidth: 1500,
                      // b:true,
                      // color: "A00000",
                      // align: "right",
                      shd: {
                        fill: "71c3fb",
                      },
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: "性别",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      b: true,
                      shd: {
                        fill: "71c3fb",
                      },
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: "年龄",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      b: true,
                      shd: {
                        fill: "71c3fb",
                      },
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: "关系",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      b: true,
                      shd: {
                        fill: "71c3fb",
                      },
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: "样本类型",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      b: true,
                      shd: {
                        fill: "71c3fb",
                      },
                      cellColWidth: 2000,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: "备注",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      b: true,
                      shd: {
                        fill: "71c3fb",
                      },
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                ],
                [
                  {
                    val: sampleArr[index].MSampleNo,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                  {
                    val: sampleArr[index].MSampleName,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 1500,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: sampleArr[index].sex,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: sampleArr[index].age,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                  {
                    val: sampleArr[index].FRelation,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: sampleArr[index].MSampleType,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 1600,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                  {
                    val: "",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                ],
                [
                  {
                    val: sampleArr[index].FSampleNo,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                  {
                    val: sampleArr[index].FSampleName,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 1600,
                      fixedLayout: true,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: "",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: "",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: sampleArr[index].MRelation,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: sampleArr[index].FSampleType,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: "",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      // cellColWidth: 42,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                ],
              ];
              var tableStyle1 = {
                tableColWidth: 1400,
                tableSize: 18,
                tableColor: "ada",
                tableAlign: "left",
                tableVAlign: "center",
                //   borders: true,
                borderStyle: borderStyle,
                //   columns:[{width:1200},{width:1600},{width:100},{width:100},{width:100},{width:1500},{width:100}]
              };
              docx.createTable(table1, tableStyle1);
              var pObj4 = docx.createP();
              pObj4.addText("");
              var pObj2 = docx.createP({ align: "left" });
              pObj2.addText("检测项目", { bold: true, font_size: 12 });
              var table2 = [
                [
                  {
                    val: "项目类型",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      // cellColWidth: 42,
                      cellColWidth: 2500,
                      b: true,
                      // sz: '48',
                      shd: {
                        fill: "71c3fb",
                      },
                      // fontFamily: "Avenir Book"
                    },
                  },
                  {
                    val: "检测范围",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      b: true,
                      cellColWidth: 4000,
                      // b:true,
                      // color: "A00000",
                      // align: "right",
                      shd: {
                        fill: "71c3fb",
                      },
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: "检测方法",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      b: true,
                      shd: {
                        fill: "71c3fb",
                      },
                      cellColWidth: 4000,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                ],
                [
                  {
                    val: "QF-PCR母血污染鉴定",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 2200,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                  {
                    val: "13, 18, 21, X, Y染色体",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 3500,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                  {
                    val: "QF-PCR + 毛细管电泳扫描",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 3000,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                ],
              ];
              // var style2 = {
              //     '@w:val': 'single',
              //     '@w:sz': '4',
              //     '@w:space': '0',
              //     '@w:color': '000000'//黑色
              //   }
              // // var style2 ={
              // //     '@w:val': 'single',
              // //     '@w:sz': '4',
              // //     '@w:space': '1',
              // //     '@w:color': 'FFFFFF'//白色
              // // }
              // var borderStyle = {
              //     'w:top': style2,
              //     'w:bottom': style2,
              //     // 'w:left': style2,
              //     // 'w:right': style2,
              //     'w:insideH': style2,
              //     // 'w:insideV': style,
              //   }
              var tableStyle2 = {
                tableColWidth: 8600,
                tableSize: 18,
                tableColor: "ada",
                tableAlign: "left",
                tableVAlign: "center",
                //   borders: true,
                borderStyle: borderStyle,
                //   columns:[{width:1200},{width:1600},{width:100},{width:100},{width:100},{width:1500},{width:100}]
              };
              docx.createTable(table2, tableStyle2);
              var pObj5 = docx.createP();
              pObj5.addText("");
              var pObj3 = docx.createP({ align: "left" });
              pObj3.addText("筛查检测结果", { bold: true, font_size: 12 });

              var table3 = [
                [
                  {
                    val: "母血污染分析结果",
                    opts: {
                      align: "center",
                      vAlign: "center",
                      sz: "21",
                      // cellColWidth: 42,
                      cellColWidth: 3500,
                      b: true,
                      // sz: '48',
                      // shd: {
                      //   fill: "71c3fb",
                      // },
                      // fontFamily: "Avenir Book"
                    },
                  },
                  {
                    val: "胎儿样本未见母体DNA污染",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      gridSpan: 2,
                      cellColWidth: 7000,
                      // b:true,
                      // color: "A00000",
                      // align: "right",
                      // shd: {
                      //   fill: "71c3fb",
                      // },
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                ],
                [
                  {
                    val: "QF-PCR分析结果",
                    opts: {
                      align: "center",
                      vAlign: "center",
                      sz: "21",
                      b: true,
                      cellColWidth: 2200,
                      vMerge: "restart",
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                  {
                    val: "13三体",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 2600,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                  {
                    val: Trisomy13,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      b: Trisomy13Stronger,
                      color: Trisomy13Color,
                      cellColWidth: 3200,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                ],
                [
                  { opts: { vMerge: "continue" } },
                  {
                    val: "18三体",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 2600,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                  {
                    val: Trisomy18,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      b: Trisomy18Stronger,
                      cellColWidth: 3000,
                      color: Trisomy18Color,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                ],
                [
                  { opts: { vMerge: "continue" } },
                  {
                    val: "21三体",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 2600,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                      fontFamily: "Times New Roman",
                    },
                  },
                  {
                    val: Trisomy21,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 3000,
                      color: Trisomy21Color,
                      b: Trisomy21Stronger,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                ],
                [
                  { opts: { vMerge: "continue" } },
                  {
                    val: "性染色体",
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      //   b:true,
                      cellColWidth: 2600,
                      // b:true,
                      // sz: '48',
                      // shd: {
                      //   fill: "92CDDC",
                      //   themeFill: "text1",
                      //   "themeFillTint": "80"
                      // }
                    },
                  },
                  {
                    val: sexChromosome,
                    opts: {
                      align: "left",
                      vAlign: "center",
                      sz: "21",
                      b: sexChromosomeStronger,
                      cellColWidth: 3000,
                      color: sexChromosomeColor,
                      fontFamily: "Times New Roman",
                    },
                  },
                ],
              ];
              var tableStyle3 = {
                tableColWidth: 8500,
                tableSize: 18,
                tableColor: "ada",
                tableAlign: "left",
                tableVAlign: "center",
                //   borders: true,
                borderStyle: borderStyle,
                //   columns:[{width:1200},{width:1600},{width:100},{width:100},{width:100},{width:1500},{width:100}]
              };
              docx.createTable(table3, tableStyle3);
              var pObj6 = docx.createP({ align: "left" });
              pObj6.addText("结果描述：", { bold: true, font_size: 10.5 });
              var pObj7 = docx.createP({ indentFirstLine: "440" });
              console.log("pObj7", pObj7);
              console.log(Result);
              console.log("reportResult", reportResult);
              pObj7.addText(Result, {
                font_size: 10.5,
                font_face: "Times New Roman",
                font_face_east: "SimSun",
              });
              pObj7.addText(reportResult, {
                font_size: 10.5,
                color: reportResultColor,
                bold: sexChromosomeStronger,
                font_face: "Times New Roman",
                font_face_east: "SimSun",
              });
              pObj7.addText(reportOtherResult, {
                font_size: 10.5,
                font_face: "Times New Roman",
                font_face_east: "SimSun",
              });
              console.log("oResult", Result);
              console.log("o7", pObj7);
              var pObj8 = docx.createP();
              pObj8.addText("");
              var pObj16 = docx.createP();
              pObj16.addText("检测方法：", { bold: true, font_size: 10.5 });
              pObj16.addText(
                "DNA从样本中抽提并纯化后，采用多重荧光DNA模板进行扩增，扩增产物在遗传分析仪上进行电泳分析。",
                {
                  font_size: 10.5,
                  font_face: "Times New Roman",
                  font_face_east: "SimSun",
                }
              );
              console.log("pObj16", pObj16);
              var pObj9 = docx.createP({ align: "left" });
              pObj9.addText("局限性声明：", { bold: true, font_size: 10.5 });
              var pObj10 = docx.createP();
              pObj10.addText(
                "1.本检测结果仅为筛查结果，不作为产前诊断结果，不单独作为确诊或排除病例的依据，最终结果需要核型分析方法进行确诊。阴性结果不能排除其他染色体三体，其结果的确认应结合临床进行综合判断；",
                {
                  font_size: 10.5,
                  font_face: "Times New Roman",
                  font_face_east: "SimSun",
                }
              );
              var pObj11 = docx.createP();
              pObj11.addText(
                "2.本检测仅对21号，18号，13号及性染色体进行筛查检测，不能排除其他染色体异常。且只能排除染色体数目异常，不能排除染色体结构异常，亦不能排除微小染色体异常或某些基因突变；",
                {
                  font_size: 10.5,
                  font_face: "Times New Roman",
                  font_face_east: "SimSun",
                }
              );
              var pObj12 = docx.createP();
              pObj12.addText(
                "3.本检测不能检测21号、18号、13号及性染色体低比例嵌合体现象。",
                {
                  font_size: 10.5,
                  font_face: "Times New Roman",
                  font_face_east: "SimSun",
                }
              );
              console.log("pobj12", pObj12);
              // 本检测不能检测21号、18号、13号及性染色体低比例嵌合体现象。
              // word分页
              docx.putPageBreak();
              var pObj13 = docx.createP({ align: "left" });
              pObj13.addText("QF-PCR毛细管电泳扫描结果：", {
                bold: true,
                font_size: 10.5,
                font_face: "Times New Roman",
                font_face_east: "SimSun",
              });
              outFileName[index] =
                sampleArr[index].FSampleNo +
                sampleArr[index].FSampleName +
                "Qpcr快检" +
                simpleReport +
                ".docx";
              console.log("outFileName[index]", outFileName[index]);
              outFileNamePath[index] = path.join(
                reportFilePath,
                outFileName[index]
              );
              console.log("outFileNamePath[index]", outFileNamePath[index]);
              var out = fs.createWriteStream(outFileNamePath[index]); // 文件写入
              out.on("error", function (err) {
                console.log(err);
              });
              var result1 = docx.generate(out); // 当前目录生成word
              console.log("result1", result1);
            } else if (selectReport == "other") {
              console.log("生成其他报告");
            }
          });
          loading.close();
          var reportMessage = "已生成报告，请注意查收！";
          this.showSuccessNotification(reportMessage);
        }
      }
    },
    // 运行脚本后错误系统通知
    errorNotification(fileName, body) {
      var path = require("path");
      var pic = path.join(process.cwd(), "/resources/app256x256.png");
      const options = {
        icon: pic,
        body: body,
      };
      const notification = new Notification("AneuFiler Error", options);
    },
    // 按样本输出开关按钮
    switchReceiveStatus(val) {
      console.log("按样本输出开关状态", val);
      this.uploadParams.sampleOutputStatus = val;
    },
    // 切换文件格式
    // switchRadio(val) {
    //   console.log("当前切换后的文件格式", val);
    //   this.uploadParams.outputFormat = val;
    // },
    // 文件输出种类
    switchFileType(val) {
      console.log("当前切换后的文件种类", val);
      if (val == "summaryFile") {
        this.radio2 = val;
        this.showUploadGen = true;
        this.showSampleInformation = false;
        this.changeGenTab();
      } else if (val == "summaryFileAndReportFile") {
        this.radio2 = val;
        this.showUploadGen = true;
        this.showSampleInformation = true;
        this.changeGenTab();
      } else if (val == "reportFile") {
        this.radio2 = val;
        this.showUploadGen = false;
        this.showSampleInformation = true;
        this.changeSampleTab();
      }
      this.uploadParams.fileType = val;
    },
    // 切换为GeneMapper下机数据上传Tab页
    changeGenTab() {
      this.activeName = "first";
      var genMessage = "Genemapper下机数据上传";
      setTimeout(() => {
        this.showInfoNotification(genMessage);
      }, 500);
    },
    // 切换为样本信息数据上传Tab页
    changeSampleTab() {
      this.activeName = "second";
      var sampleMessage = "样本信息数据上传";
      setTimeout(() => {
        this.showInfoNotification(sampleMessage);
      }, 500);
      this.tableData = [];
    },
    //打开日志文件方法
    openLogFile() {
      var log = window.require("electron-log");
      var path = require("path");
      var app = window.require("@electron/remote").app;
      var logFilepath = path.join(app.getPath("temp"));
      console.log(logFilepath);
      let convertedLogFilepath = logFilepath.replace(/\\/g, "/");
      var logFilename = "AneuFilerVue.log";
      log.transports.file.resolvePath = () =>
        path.join(convertedLogFilepath, logFilename);
      console.log(path.join(convertedLogFilepath, logFilename));
      var fs = window.require("fs");
      fs.access(
        path.join(convertedLogFilepath, logFilename),
        fs.constants.F_OK,
        (err) => {
          if (err) {
            console.log("文件不存在");
            var logNotice =
              "由于您还未进行任何数据分析操作，因此暂时无日志生成！";
            this.showErrorNotification(logNotice);
            this.errorNotification(logFilename, logNotice);
          } else {
            console.log("文件存在");
            if (process.platform === "darwin") {
              const { shell } = window.require("electron");
              const openFile = (filePath) => {
                shell
                  .openPath(filePath)
                  .then(() => {
                    console.log("文件已成功打开");
                  })
                  .catch((error) => {
                    console.error("打开文件时出错:", error);
                  });
              };
              openFile(path.join(convertedLogFilepath, logFilename));
              // shell.openExternal(path.join(convertedLogFilepath, logFilename));
            } else if (process.platform === "win32") {
              const { shell } = window.require("electron");
              shell.openExternal(path.join(convertedLogFilepath, logFilename));
            } else if (process.platform === "linux") {
              const { shell } = window.require("electron");
              shell.openExternal(path.join(convertedLogFilepath, logFilename));
            }
          }
        }
      );
    },
  },
  mounted() {
    window.addEventListener("resize", this.adjustTableHeight);
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
#holder {
  height: 77vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.upload-demo .el-upload-dragger {
  height: 69vh;
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
.settingPosition {
  display: flex;
  flex-direction: column;
  height: calc(90vh-20px);
}
.grid-content {
  border-radius: 4px;
  text-align: left;
}
.el-divider__text {
  font-size: 16px !important;
}
i.el-icon.el-icon--upload {
  margin-top: 21vh;
}
.spanPosition {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-switch__core .el-switch__inner .is-icon,
.el-switch__core .el-switch__inner .is-text {
  /* color: #000; */
}
.row-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>
