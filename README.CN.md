# AneuFiler

[EN](README.md) | [🇨🇳中文](README.CN.md)

`AneuFiler` 专门用于 `21、18、13和性染色体倍型检测试剂盒（荧光PCR-毛细管电泳法）` 产生数据的分析：

- 使用 [Electron](https://electronjs.org) 框架进行跨平台开发
- 基于 [electron-quick-start](https://github.com/electron/electron-quick-start) 项目搭建用户界面
- 核心算法模块不开源

当前发布版本为 [`v0.0.1`]() ， `Pre-release` 版本的核心算法尚未完善，不建议用于实际生产。

> 版本号发布格式说明：
> 
> 版本号以 `.` 符号分割为 3 个区域： v X.Y.Z
> 
> - X 表示互不兼容的版本号
> - Y 表示重大更新版本号（如增加新的重大功能）
> - Z 表示累积更新、优化、bug修复等版本号

## 软件安装包

目前提供适用于 Windows（64位）和 Mac OS X 系统的发行版。

### Windows

在 Windows 系统下可直接运行 `Portable` 版程序，无需安装。

[Portable 下载链接]()

也可以使用安装版本：双击软件包，安装后即可使用。

[Installer 下载链接]()

### Mac OS

在 Mac OS X 系统下，双击安装包，将软件包移动至 `应用程序` 文件夹内即可使用：

![darwin install](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190916183109.png)

[Mac OS 下载链接]()

## 软件使用

双击已安装的程序图标，即可打开程序窗口：

![main window](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103452.png)

按照提示，将一个或多个文件（下机数据，用默认格式导出）拖拽至提示区域：

![process region](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103506.png)

放开鼠标即可，也可以点击提示区域，然后选择需要处理的文件。

> - 仅支持 `txt` 或 `csv` 格式的输入文件；
> - 点击方式添加文件时，一次只能选择一个文件进行处理。

默认每处理一个输入文件，都仅会对应输出一个结果文件，包含对应输入文件内所有数据的分析结果。

可将红色开关 `按样本输出` 打开：开启此开关后，每个输入文件处理的数据将按样本名输出到以样本名命名的多个文件中：

> 输出文件夹不会改变。

![each sample output](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103522.png)

若点击后未选择任何文件，会进行提示：

![no file selected](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103535.png)

处理结果将会返回至每个输入文件所在的目录：

![process window](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103548.png)

### 查看帮助文档

可点击主界面的橙色 `帮助` 按钮查看帮助文档：

![help](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103610.png)

### 退出程序

点击主界面的蓝色 `退出` 按钮即可退出程序：

![exit](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103623.png)

## 反馈

如在本软件的使用过程中有任何意见或建议，欢迎 [提出]()，也可以 [点这里]() 查看留言。

## 参与

如果您想要参与本软件的开发，或有意为本项目贡献一份力量，却不知如何开始，可以参考 [这里](https://opensource.guide/zh-cn/) 。

## License

[GNU GPLv3](LICENSE.md)
