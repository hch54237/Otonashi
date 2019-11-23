# Otonashi

An MP3 audio codec written in TypeScript / MP3音频编解码器

## 介绍

Otonashi是一个MP3编解码器学习研究项目，目标是使用TypeScript实现一个基本的 MPEG/Audio Layer 3 音频编解码器。仅追求符合标准并打通编解码流程，不追求音质和效率，不追求硬件实现。

## 预备工作

以下是正式开始实现MP3编解码器之前的一些学习探究工作，侧重可交互、可视化、原理验证。

- [MDCT所使用的4种窗口及其转换](https://mikukonai.com/Otonashi/MDCT-windows.html)
- [低通滤波](https://mikukonai.com/Otonashi/LPF.html)
- [分析子带滤波器组](https://mikukonai.com/Otonashi/Filterbank.html)

## 笔记和参考资料

研究笔记：

- [分析子带滤波器组](./documentation/notes/分析子带滤波器组.md)
- [心理声学模型](./documentation/notes/心理声学模型.md)
- [发表在博客上的研究笔记](https://mikukonai.com/#/wiki/MP3%E7%BC%96%E8%A7%A3%E7%A0%81%E5%8E%9F%E7%90%86)

参考资料：

- [ISO/IEC 11172-3 影印版本](./documentation/references/ISO-IEC-11172-3.pdf)
- 其他参考资料请到`documentation/references`目录下查看。

