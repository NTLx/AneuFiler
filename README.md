# AneuFiler

[EN](README.md) | [🇨🇳中文](README.CN.md)

`AneuFiler` was used for "21, 18, 13 and sex chromosome genotype test kit" data analysis specifically:

- Based on [Electron](https://electronjs.org)
- Based on [element-plus](https://github.com/element-plus/element-plus) and [Vue3.0](https://github.com/vuejs/core) project
- core algorithm was not open source

Current release is [`v0.6.0`](https://github.com/NTLx/AneuFiler/releases/tag/v0.6.0), `Pre-release` was not recommended for actual production.

> Version introduction:
>
> For example: v X.Y.Z
>
> - X: means incompatible version
> - Y: indicates a major update version number (such as adding a new major feature)
> - Z: indicates cumulative version, optimization, bug fix, etc.

## Installation

Suitable for Mac OS X (x64 platform) and Windows.

> The package for Windows is ia32, will be functional both x86 and x64 platform;
>
> The package for Windows is x64, only runs on x64 platform. 


### Windows

`Portable` package can run without installation.

[Download Portable for win](https://github.com/NTLx/AneuFiler/releases/download/v0.6.0/AneuFiler.v0.6.0.Win_Portable.exe)

> [Download mirror](http://cloud.cubicise.com:10081/s/yRdWpmNkiMMpRtq) for China user.

### Mac OS

Move app to `Application` :

![darwin install](https://lx-public-pic.oss-cn-shanghai.aliyuncs.com/PicGo/20190917162246.png)

[Download for Mac OS](https://github.com/NTLx/AneuFiler/releases/download/v0.3.1/AneuFiler.v0.3.1.MacOS.dmg)

> [Download mirror](http://cloud.cubicise.com:10081/s/sWapR877m26Jfoc) for China user.

## Usage

### Main window

![main window](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-10-27_11-07-50.png)

Drag file(s) to process region (means `文件处理区`), or just click this region to select a file.

> input file format: only support `txt` and `csv`

By default, the result file(s) will be output to the dir where the input file comes from.

#### Help Manual

Under networking conditions, You may press the orange button `帮助` to check manual, it will simply open a browser window which link to this page.

#### Download sample information file

Press the blue button `模版` to download sample template file.

#### Upload sample information file window

![new window](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-10-27_11-08-33.png)

### Settings

Several settings was offered in `设置面板` , defaut settings should be like this:

![each sample output](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-10-27_11-08-01.png)

The default output file format is "GBK" in the windows environment.

By default, `开启按样本输出` is turned off. If you want to output by sample (the samples for the input file will be output to different result files according to different sample names), please enable this switch.

The default output file type contains only `结果文件`. To output result file(s) and report file(s), please select the `结果文件+报告文件` option.After select the `结果文件+报告文件` option,the software interface is shown in the figure below:

![new window1](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-10-27_12-43-43.png)

After uploading the GeneMapper off-machine data file, the tab page automatically jumps to the next tab page `样本信息数据上传`, click the upload button `上传`, and the report file can be output normally (the report file will be automatically generated in the result file folder).

 If you only want to output report file(s), please select the `报告文件` option.After select the `报告文件` option,the software interface is shown in the figure below:

 ![new window2](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-10-27_12-45-25.png)

 And click `上传` upload button to upload sample Information table, then the report file will be outputed normally(the report file will be automatically generated in the folder of the result file).


### Settings for output report files 

You can choose a specific report file template style. If you need a  report style, please inform the developer in advance.

> The output dir will not change.

### Log

The log panel is as shown.

![log](https://cdn.jsdelivr.net/gh/Letmeouted/PCPicture/Snipaste_2023-09-26_09-15-30.png)

## Feedback

Welcome to [open issue](https://github.com/NTLx/AneuFiler/issues/new/choose) on this project to help us make improve for this software, or you can see the [existing issues](https://github.com/NTLx/AneuFiler/issues).

## More Feature

Suggest a new feature by [FeatHub](https://feathub.com/NTLx/AneuFiler)

[![Feature Requests](https://cloud.githubusercontent.com/assets/390379/10127973/045b3a96-6560-11e5-9b20-31a2032956b2.png)](https://feathub.com/NTLx/AneuFiler)

[![Feature Requests](https://feathub.com/NTLx/AneuFiler?format=svg)](https://feathub.com/NTLx/AneuFiler)

## Participate

Want to contribute to this project but do not know how/where to start? Please check [Open Source Guides](https://opensource.guide/).

## License

[GNU GPLv3](LICENSE.md)
