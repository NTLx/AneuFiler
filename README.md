<!--
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @FilePath: \VueAnenuFiler\README.md
-->
# Aneufilervue

> An electron-vue project of AneuFiler
`AneuFiler` 专门用于“21、18、13和性染色体倍型检测试剂盒（荧光PCR-毛细管电泳法）”产生数据的分析：

- 使用[Electon-vue](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/)进行跨平台开发
- 核心算法模块不开源
## 软件使用

### 程序主窗口

![main window](https://cdn.jsdelivr.net/gh/Letmeouted/PicGO/Pic/Snipaste_2021-02-01_12-10-23.png)

将一个或多个文件（下机数据，用默认格式导出）拖拽至 `文件处理区` 即可；也可以点击提示区域，然后选择需要处理的文件。

> - 仅支持 `txt` 或 `csv` 格式的输入文件；
> - 点击方式添加文件时，一次只能选择一个文件进行处理。

默认针对每一个输入文件都会按照样本名拆分输出结果到输出文件夹中。

输出文件夹位于每个输入文件相同的目录下。

### 查看帮助文档

可点击主界面的橙色 `帮助` 按钮查看帮助文档。

### 退出程序

点击主界面的红色 `退出` 按钮即可退出程序。

### 设置

设置面板如图：

![each sample output](https://cdn.jsdelivr.net/gh/Letmeouted/PicGO/Pic/Snipaste_2021-02-01_12-14-26.png)

可将绿色开关 `按样本输出` 关闭：针对每一个输入文件会将结果输出到唯一一个结果文件中。

> 输出文件夹不会改变。

为兼容 `Excel` ，默认输出编码格式为 `GBK` ；为获得更广泛的兼容性，可手动修改为 `UTF-8` 。

### 关于
关于面板如图：

![](https://cdn.jsdelivr.net/gh/Letmeouted/PicGO/Pic/Snipaste_2021-02-01_12-19-18.png)

关于界面是一些有关软件的说明以及软件的使用方法。如有不懂，可以进入该页面进行查看。

## Other Release

该软件另有 [Electron + mdui](https://github.com/NTLx/AneuFiler) 的版本
## 反馈

如在本软件的使用过程中有任何意见或建议，欢迎 [提出](https://github.com/NTLx/AneuFiler/issues/new/choose)，也可以 [查看留言](https://github.com/NTLx/AneuFiler/issues) 。

---

