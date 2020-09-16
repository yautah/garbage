# - QGargabe

> 垃圾问问微信小程序，基于腾讯云开发。语音快速检索垃圾分类,多城市支持。

## 项目依赖

- 小程序的 MobX [wechat-miniprogram/mobx](https://github.com/wechat-miniprogram/mobx)
- 小程序的 MobX 绑定辅助库 [wechat-miniprogram/mobx-miniprogram-bindings](https://github.com/wechat-miniprogram/mobx-miniprogram-bindings)
- 小程序的接口 Promise [wechat-miniprogram/miniprogram-api-promise](https://github.com/wechat-miniprogram/miniprogram-api-promise)
- 富文本解析 [jin-yufeng/Parser](https://github.com/jin-yufeng/Parser)

## 项目结构
本小程序采用基于云开发的原生开发，用到了云数据库存储数据，使用云函数和小程序端进行数据交互。

### 整体架构图如下：
![ ](http://mmbiz.qpic.cn/mmbiz_png/IHCgvD5IgkBrRNuTJZg4haPjywFibXm6ficQmjXbRo4iaI6icmro2kxEf1cqLkLFxghgucvNMQjCttoF4JMOiavicpBw/0?wx_fmt=png)


### 云函数端

使用tcb-router路由分发，代码结构更利于功能路由的规划，未来功能模块的横向展开。

### 小程序端

引入mobx支持，划分为vm层（mobx store，page+wxml）以及service层，结构清晰，易于扩展，同时mobx store的存在，也让多page、多组件之间的通讯变的简单。

小程序端架构如下：

![ ](http://mmbiz.qpic.cn/mmbiz_png/IHCgvD5IgkBrRNuTJZg4haPjywFibXm6fiaKG8EF0lo6M5ssEKibDCeO3ZVIXxnxQPYpiciaWnFibyFqMic829wrIG3LA/0?wx_fmt=png)



效果截图

![ ](http://mmbiz.qpic.cn/mmbiz_png/IHCgvD5IgkBrRNuTJZg4haPjywFibXm6fDX3tibKp86ta7poxicN2v61r5abiceHxu2tewic7fcGP1ic3wiahVXkicricuw/0?wx_fmt=png)    

![ ](http://mmbiz.qpic.cn/mmbiz_png/IHCgvD5IgkBrRNuTJZg4haPjywFibXm6fZmiaHFoR9mD7jMb65d0ImEsGSIS2VmCEd60TojRm7gycyZo7xLicExwg/0?wx_fmt=png)
     

![ ](http://mmbiz.qpic.cn/mmbiz_png/IHCgvD5IgkBrRNuTJZg4haPjywFibXm6fRzicDoDEQSFspQ5ic3ia6dj8MaxtkSjtuM52QRDJc2txAcC3iaAWU7tQMg/0?wx_fmt=png)

作品体验二维码

![ ](http://mmbiz.qpic.cn/mmbiz_png/IHCgvD5IgkBrRNuTJZg4haPjywFibXm6fsT3GiaMliaZnTUa0Q5r87g2YGALUeQiczaV8InX2ibNiaM7GB6np65oPk6g/0?wx_fmt=png)


功能演示
腾讯视频：https://v.qq.com/x/page/f3152chjcwu.html


## 部署教程

点击 [deployment.md](https://github.com/yautah/garbage/blob/master/deployment.md) 查看部署教程

## 开源许可

《垃圾问问》的源代码基于 `GPL-3.0` 协议全网开源，可用于商业用途，如果您使用了《垃圾问问》的源代码，那么您的项目必须遵守 `GPL-3.0` 协议进行全网开源，点击 [LICENSE](https://github.com/yautah/garbage/blob/master/LICENSE) 查看许可协议
