# AneuFiler

[EN](README.md) | [🇨🇳中文](README.CN.md)

`AneuFiler` was used for 21, 18, 13 and sex chromosome genotype test kit data analysis specifically:

- Based on [Electron](https://electronjs.org)
- Based on [electron-quick-start](https://github.com/electron/electron-quick-start) project
- core algorithm was not open source

Current release is [`v0.0.1`](), `Pre-release` was not recommended for actual production.

> Version introduction:
> 
> For example: v X.Y.Z
> 
> - X: means incompatible version
> - Y: indicates a major update version number (such as adding a new major feature)
> - Z: indicates cumulative version, optimization, bug fix, etc.

## Installation

Suitable for Windows x64 and Mac OS X.

### Windows

`Portable` package can run without installation.

[Download Portable for win]()

or use installer instead.

[Download Installer for win]()

### Mac OS

Move app to `Application` :

![darwin install](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190916183109.png)

[Download for Mac OS]()

## Usage

Main window:

![main window](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103452.png)

Drag file(s) to process region (background could turn blue) to process, or just click this region to select a file:

![process region](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103506.png)

> - only support `txt` or `csv`

By default, one result file will be generate according to a input file.

Switch the button `按样本输出` to red will generate result by sample names, the output dir will not change.

![each sample output](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103522.png)

If not choose any file after click the process region, it will be display like this:

![no file selected](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103535.png)

The result will be output to the dir which the input file comes from:

![process window](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103548.png)

### Help doc

You may press the orange button `帮助` to check manual:

![help](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103610.png)

### Exit

Press the blue button `退出` could exit the software:

![exit](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190912103623.png)

## Feedback

Welcome to [open issue]() on this project to help us make improve for this software, or you can see the [existing issues]().

## Participate

Want to contribute to this project but do not know how/where to start? Please check [Open Source Guides](https://opensource.guide/).

## License

[GNU GPLv3](LICENSE.md)
