<!--
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \VueAnenuFiler\src\renderer\pages\Info.vue
-->
<template>
  <div>
    <div class="view-title">关于软件 <i class="el-icon-info"></i></div>
    <div class="about">
      <h2>帮助文档</h2>
      <p>本文将会介绍AneuFiler软件的使用方法及一些注意事项</p>

      <h3>关于AneuFiler</h3>
      <p>
        AneuFiler专门用于“21、18、13和性染色体倍型检测试剂盒（荧光PCR-毛细管电泳法）”产生数据的分析。
      </p>

      <h3>文件要求</h3>
      <p>文件的要求如下：</p>
      <ul>
        <li>文件必须为txt或csv格式</li>
        <li>文件命名要求：不能含有空格、特殊符号、中文</li>
      </ul>

      <h3>使用方法</h3>

      <h5>导入文件</h5>
      <p>导入文件有两种方式：</p>
      <ol>
        <li>拖拽到指定区域</li>
        <li>点击文件处理区下面的矩形区域</li>
      </ol>

      <h5>设置面板</h5>
      <p>输出结果设置：</p>
      <p>
        1、默认针对每一个输入文件都会按照样本名拆分输出结果到输出文件夹中。<br />
        输出文件夹位于每个输入文件相同的目录下。
      </p>

      <p>
        2、绿色开关（按样本输出）可以关闭：关闭后针对每一个输入文件会将结果输出到唯一
        一个结果文件中。
      </p>
      <ul>
        <li>输出文件夹不会改变。</li>
      </ul>
      <p>
        3、为兼容 Excel ，默认输出编码格式为 GBK
        ；为获得更广泛的兼容性，可手动修改为 UTF-8 。
      </p>
      <h3>联系</h3>
      <p>
        如遇软件使用上的问题，请联系
        <a @click="openExternal('developer')" class="url">晶准开发人员</a
        >。同时，也欢迎你提出宝贵的意见。
      </p>
      <p>
        问题提交地址：
        <a @click="openExternal('issues')" class="url">问题提交链接</a>
      </p>
    </div>
  </div>
</template>

<script>
import { openExternal } from '../assets/js/openExternal'
export default {
  methods: {
    openExternal
  }
}
</script>

<style lang="less">
.view-title {
  color: #eee;
  font-size: 20px;
  text-align: center;
  margin: 35px auto;
}
.about {
  color: #dcdcdc;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  .url{
    color:#47a6f0
  }
}
</style>