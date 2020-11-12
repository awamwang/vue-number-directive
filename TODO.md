# TODO

## Bug

+ 搜狗输入法
+ 全清空问题

## 特性

+ min/max 支持
+ schema剩余特性, schema优先级更高
+ 一次性检查-parseFloat/Int；在formatter建立后进行检查
+ maxlength
+ formatFullValue
+ sientific - 去掉
+ 更新AllowedTagList、

## 思路

+ _.chunk [...str] 处理分隔符
+ Vue是如何解析expression，如何解析modelPath；有没有第三方的解析器——要不要把解析器单独拿出去呢
+ 文档中使用globalOptions
+ [ts validate](https://www.tslang.cn/docs/handbook/namespaces.html)

## 疑问

+ modelPath会不会出现./[]以外的字符，例如...、?(es2020)，!会有  |   会不会有xx[``s${var}s``]这样的model——ddd.list[`${ddd.key1
+ [xxx](https://github.com/tuchk4/storybook-readme)
