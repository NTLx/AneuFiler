# AneuFiler

[EN](README.md) | [🇨🇳中文](README.CN.md)

`AneuFiler` 专门用于“21、18、13和性染色体倍型检测试剂盒（荧光PCR-毛细管电泳法）”产生数据的分析：

- 使用 [Electron](https://electronjs.org) 框架进行跨平台开发
- 基于 [element-plus](https://github.com/element-plus/element-plus) 和 [Vue3.0](https://github.com/vuejs/core) 项目搭建用户界面
- 核心算法模块不开源

当前发布版本为 [`v0.5.0`](https://github.com/NTLx/AneuFiler/releases/tag/v0.5.0) ， `Pre-release` 版本的核心算法尚未完善，不建议用于实际生产。

> 版本号发布格式说明：
>
> 版本号以 `.` 符号分割为 3 个区域： v X.Y.Z
>
> - X 表示互不兼容的版本号
> - Y 表示重大更新版本号（如增加新的重大功能）
> - Z 表示累积更新、优化、bug修复等版本号

## 软件安装包

目前提供适用于 Mac OS X（64位）和 Windows 系统的发行版。

> Windows 版软件为 32 位，可在 32 位和 64 位 Windows 系统上运行。

### Windows

在 Windows 系统下可直接运行 `Portable` 版程序，无需安装。

[Portable 下载链接](https://github.com/NTLx/AneuFiler/releases/download/v0.5.0/AneuFiler.v0.5.0.Win_Portable.exe)

> 若以上连接效果不佳，请尝试使用 [下载镜像](http://cloud.cubicise.com:10081/s/yRdWpmNkiMMpRtq)

### Mac OS

在 Mac OS X 系统下，双击安装包，将软件包移动至 `应用程序` 文件夹内即可使用：

![darwin install](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190917162246.png)

[Mac OS 下载链接](https://github.com/NTLx/AneuFiler/releases/download/v0.3.1/AneuFiler.v0.3.1.MacOS.dmg)

> 若以上连接效果不佳，请尝试使用 [下载镜像](http://cloud.cubicise.com:10081/s/sWapR877m26Jfoc)

## 软件使用

### 程序主窗口

![main window](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-09-26_09-33-32.png)

将一个文件（下机数据，用默认格式导出）拖拽至 `文件处理区` 即可；也可以点击提示区域，然后选择需要处理的文件。

> - 仅支持 `txt` 或 `csv` 格式的输入文件；
> - 点击方式添加文件时，一次只能选择一个文件进行处理。

默认输出文件夹位于每个输入文件相同的目录下。

### 查看帮助文档

可点击主界面的橙色 `帮助` 按钮查看帮助文档。

### 下载样本信息模版文件

点击主界面的蓝色 `下载样本信息模版` 按钮即可下载样本信息模版文件。

### 样本信息数据上传窗口

![new window](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-09-26_09-01-25.png)

> 输出文件类型默认为`结果文件`

> 当选择`结果文件+报告文件`选项，标签页会由`设置`标签页自动跳转至`GeneMapper下机数据上传`标签页，同时`样本信息数据上传`标签页会自动显示出来。上传GeneMapper下机数据文件后，标签页自动跳转到下一个标签页`样本信息数据上传`，点击上传按钮`上传样本信息数据`，便可正常输出报告文件（报告文件会自动生成在结果文件的文件夹中）。

> 当选择`报告文件`选项后，标签页会由`设置`标签页自动跳转至`样本信息数据上传`标签页。点击`上传样本信息数据`上传按钮，便可正常输出报告文件（报告文件会自动生成在结果文件的文件夹中）。

### 选项

设置标签页如下图：

![each sample output](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-09-26_09-01-05.png)

#### 输出文件设置

Windows 操作系统环境下，默认输出文件的格式为"GBK"。

默认开启按样本输出为关闭状态，如需按样本输出（针对输入文件的样本会按照不同样本名输出到不同的结果文件中），请开启该开关。

默认输出文件类型只包含结果文件。如需输出报告文件，请选择`结果文件+报告文件`选项。如只需输出报告文件，请选择`报告文件`选项。

#### 报告文件设置

可选择特定报告文件模版样式，如需特定的报告样式，请提前告知开发者。

> 输出文件夹不会改变。

#### 日志

点击设置界面中打开日志文件便会打开如下图所示的日志文件内容：

![log](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-09-26_09-15-30.png)

## 反馈

如在本软件的使用过程中有任何意见或建议，欢迎 [提出](https://github.com/NTLx/AneuFiler/issues/new/choose)，也可以 [查看留言](https://github.com/NTLx/AneuFiler/issues) 。

## 更多功能

如果你还想让 `AneuFiler` 支持新特性，请使用 [FeatHub](https://feathub.com/NTLx/AneuFiler) 投票：

[![Feature Requests](https://cloud.githubusercontent.com/assets/390379/10127973/045b3a96-6560-11e5-9b20-31a2032956b2.png)](https://feathub.com/NTLx/AneuFiler)

[![Feature Requests](https://feathub.com/NTLx/AneuFiler?format=svg)](https://feathub.com/NTLx/AneuFiler)

## 参与

如果您想要参与本软件的开发，或有意为本项目贡献一份力量，却不知如何开始，可以参考 [这里](https://opensource.guide/zh-cn/) 。

## License

[GNU GPLv3](LICENSE.md)
