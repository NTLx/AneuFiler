<!--
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \VueAnenuFiler\src\renderer\layouts\Main.vue
-->
<template>
  <el-container>
    <el-aside width="160px">
      <div class="fake-title-bar">
        <div class="fake-title-bar__title" v-if="os !== 'darwin'">
          AneuFiler - {{ version }}
        </div>
      </div>
      <div class="handle-bar" v-if="os !== 'darwin'">
        <i class="el-icon-minus" @click="minimizeWindow"></i>
        <i class="el-icon-close" @click="closeWindow"></i>
      </div>
      <div class="image">
        <el-image
          style="width: 140px; height: 40px"
          :src="require('../../../static/image1.png')"
          @click="open('https://github.com/NTLx/AneuFiler/tree/vue')"
        ></el-image>
      </div>
      <el-row style="padding-top: 22px" class="main-content">
        <el-col :span="12" class="side-bar-menu">
          <el-menu
            class="AneuFiler-sidebar"
            :default-active="activeIndex"
            :default-openeds="defaultOpenIndex"
            @select="handleSelect"
            :unique-opened="true"
            background-color="#3f3c37"
            text-color="#fff"
            :router="true"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1" @click="goTo('/upload')">
              <i class="el-icon-upload"></i>
              <span slot="title">分析面板</span>
            </el-menu-item>
            <el-menu-item index="2" @click="goTo('/setting')">
              <i class="el-icon-setting"></i>
              <span slot="title">设置面板</span>
            </el-menu-item>
            <el-menu-item index="3" @click="goTo('/info')">
              <i class="el-icon-info"></i>
              <span slot="title">关于</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <div class="back">
        <el-button
          type="danger"
          icon="el-icon-back"
          size="small"
          onclick="javascript:window.close()"
          round
          >退出</el-button>
      </div>
    </el-aside>
    <el-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-main>
  </el-container>
</template>
<script>
import { remote } from 'electron'
export default {
  data () {
    return {
      version: '0.0.1',
      activeIndex: '1',
      defaultOpenIndex: []
    }
  },
  created () {
    this.os = process.platform
    this.$router.push('/upload')
  },
  mounted () {
    this.defaultOpenIndex = ['/upload']
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    minimizeWindow () {
      remote.getCurrentWindow().minimize() // 窗口最小化
    },
    closeWindow () {
      remote.getCurrentWindow().close()
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    goTo (path) {
      this.$router.replace(path)
      if (path === '/upload') {
        this.$message({
          showClose: true,
          message: '进入分析面板',
          center: true,
          duration: '1000',
          offset: '400'
        })
      }
      if (path === '/setting') {
        this.$message({
          showClose: true,
          center: true,
          message: '进入设置面板',
          duration: '1000',
          offset: '400'
        })
      }
      if (path === '/info') {
        this.$message({
          showClose: true,
          center: true,
          message: '进入关于页面',
          duration: '1000',
          offset: '400'
        })
      }
    }
  }
}
</script>

<style lang="less">
.el-aside {
  .fake-title-bar {
    -webkit-app-region: drag;
    height: h=22px;
    width: 100%;
    text-align: center;
    color: #eee;
    font-size: 12px;
    line-height: h;
    position: fixed;
    z-index: 100;
  }
  .handle-bar {
    position: absolute;
    top: 2px;
    right: 4px;
    i {
      cursor: pointer;
      font-size: 18px;
      margin-left: 5px;
    }
    .el-icon-minus {
      color: #eee;
      &:hover {
        color: #409eff;
      }
    }
    .el-icon-close {
      color: #eee;
      &:hover {
        color: #f15140;
      }
    }
  }
  .image {
    margin-top: 30px;
  }
  .side-bar-menu {
    position: fixed;
    height: 100vh;
    width: 160px;
    overflow-x: hidden;
    overflow-y: hidden;
    .el-menu {
      border-right: none;
      width: 170px;
      position: relative;
      top: 30%;
      transform: translateY(-50%);
    }
  }
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
  .back {
    position: absolute;
    text-align: center;
    left: 30px;
    bottom: 30px;
  }
}
.el-main {
  height: 100vh;
}
::-webkit-scrollbar {
  width: 4px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: #61a8df;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #37dace;
}
::-webkit-scrollbar-thumb:active {
  background-color: #17bbaf;
}
</style>