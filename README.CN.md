# AneuFiler

[EN](README.md) | [🇨🇳中文](README.CN.md)

`AneuFiler` 专门用于“21、18、13和性染色体倍型检测试剂盒（荧光PCR-毛细管电泳法）”产生数据的分析：

- 使用 [Electron](https://electronjs.org) 框架进行跨平台开发
- 基于 [electron-quick-start](https://github.com/electron/electron-quick-start) 和 [MDUI](https://github.com/zdhxiong/mdui) 项目搭建用户界面
- 核心算法模块不开源

当前发布版本为 [`v0.2.0`](https://github.com/NTLx/AneuFiler/releases/tag/v0.2.0) ， `Pre-release` 版本的核心算法尚未完善，不建议用于实际生产。

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

[Portable 下载链接](https://github.com/NTLx/AneuFiler/releases/download/v0.2.0/AneuFiler.v0.2.0.Win_Portable.exe)

若以上连接效果不佳，请尝试使用 [下载镜像](https://gitee.com/lx3325360/AneuFiler/releases/v0.2.0)

### Mac OS

在 Mac OS X 系统下，双击安装包，将软件包移动至 `应用程序` 文件夹内即可使用：

![darwin install](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190917162246.png)

[Mac OS 下载链接](https://github.com/NTLx/AneuFiler/releases/download/v0.2.0/AneuFiler.v0.2.0.MacOS.dmg)

## 软件使用

### 程序主窗口

![main window](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190918134715.png)

将一个或多个文件（下机数据，用默认格式导出）拖拽至 `文件处理区` 即可；也可以点击提示区域，然后选择需要处理的文件。

> - 仅支持 `txt` 或 `csv` 格式的输入文件；
> - 点击方式添加文件时，一次只能选择一个文件进行处理。

默认针对每一个输入文件都会按照样本名拆分输出结果到输出文件夹中。

输出文件夹位于每个输入文件相同的目录下。

### 查看帮助文档

可点击主界面的橙色 `帮助` 按钮查看帮助文档。

### 退出程序

点击主界面的蓝色 `退出` 按钮即可退出程序。

### 选项

设置面板如图：

![each sample output](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190918135907.png)

可将红色开关 `按样本输出` 关闭：针对每一个输入文件会将结果输出到唯一一个结果文件中。

> 输出文件夹不会改变。

为兼容 `Excel` ，默认输出编码格式为 `GBK` ；为获得更广泛的兼容性，可手动修改为 `UTF-8` 。

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
