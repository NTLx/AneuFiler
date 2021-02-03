<!--
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \VueAnenuFiler\src\renderer\pages\Info.vue
-->
<template>
  <div>
    <div class="view-title">关于软件  <i class="el-icon-info"></i></div>
    <div class="about">
      <p class="declare">软件说明:</p>
      <p class="info">
        AneuFiler专门用于“21、18、13和性染色体倍型检测试剂盒（荧光PCR-毛细管电泳法）”产生数据的分析。
      </p>
      <p class="hint">软件使用方法:</p>
      <p class="methods">
        1.
        将一个或多个文件（下机数据，用默认格式导出）拖拽至分析面板中的文件处理区
        即可；也可以点击提示区域，然后选择需要处理的文件。
      </p>
      <ul>
        <li>仅支持 txt 或 csv 格式的输入文件；</li>

        <li>点击方式添加文件时，一次只能选择一个文件进行处理。</li>
      </ul>
      <p class="methods">
        2.默认针对每一个输入文件都会按照样本名拆分输出结果到输出文件夹中。<br />
        输出文件夹位于每个输入文件相同的目录下。
      </p>
      <p class="methods">
        3.可将绿色开关（按样本输出）关闭：关闭后针对每一个输入文件会将结果输出到唯一
        一个结果文件中。
      </p>
      <ul>
        <li>输出文件夹不会改变。</li>
      </ul>
      <p class="methods">
        4.为兼容 Excel ，默认输出编码格式为 GBK
        ；为获得更广泛的兼容性，可手动修改为 UTF-8 。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
.view-title {
  color: #eee;
  font-size: 20px;
  text-align: center;
  margin: 10px auto;
}
.about {
  color: #eee;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  .declare {
    font-size: 20px;
  }
  .info {
    font-size: 15px !important;
    text-indent: 2em;
  }
  .hint {
    font-size: 20px;
  }
  .methods {
    font-size: 15px !important;
    text-indent: 2em;
  }
  li {
    font-size: 15px;
  }
}
</style>