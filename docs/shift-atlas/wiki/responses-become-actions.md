# Responses Become Actions

## 一句话定义

AI 的响应不一定是长文本，它可以直接变成动作、选择、状态更新或下一步任务。

## 这个词条在说什么

很多早期 AI 产品默认把“响应”理解成一段解释性文本。
但真正进入任务场景后，用户通常需要的不是更多文字，而是下一步可以做什么。

所以这个词条关心的是：模型输出如何从“描述”变成“行动结构”。

## 响应可以变成什么

- 一个明确的按钮
- 一个选择列表
- 一个可编辑草稿
- 一个任务步骤
- 一个状态变化提示
- 一个预览区里的结果
- 一个带约束的建议，而不是纯开放文本

## 为什么重要

如果响应永远只是段落，用户会经历三个问题：

1. 要自己重新解读输出
2. 要自己决定下一步做什么
3. 要自己把文字翻译成操作

这会让 AI 产品看起来“很聪明”，但实际很难用。

## 设计信号

一个产品越接近这个词条，通常越会出现这些特征：

- 响应底部直接给操作按钮
- 系统把结果拆成可选项而不是一整段答案
- 输出区和操作区分离
- 用户可以对响应直接编辑、接受、拒绝或继续分支

## 常见设计方法

- 把回答分成“解释层”和“执行层”
- 让模型先给出结构化提议，再让用户确认
- 对高频动作做成固定控件，而不是每次都生成新文案
- 让输出里的关键对象可以被直接点选、引用或修改

## 常见误区

- 误区 1：动作一定要更像按钮才算动作
  - 有时状态更新、草稿生成、差异展示本身就是动作
- 误区 2：输出越完整越好
  - 完整文本不等于可执行
- 误区 3：动作越多越强
  - 过多动作会掩盖真正的下一步

## 和其他词条的关系

- [Chat Becomes Interface](chat-becomes-interface.md): 讲入口怎么转成结构
- [Controls Shift With Task](controls-shift-with-task.md): 讲动作如何落在不同控件上
- [Interface Remembers State](interface-remembers-state.md): 讲动作发生后状态如何保留

## 回链

- 上位词条: [AI Interface Patterns](ai-interface-patterns.md)

## 参考来源

- [Cloudscape Artifact Previews](https://cloudscape.design/patterns/genai/artifact-previews/)
- [Cloudscape User Authorized Actions](https://cloudscape.design/patterns/genai/user-authorized-actions/)
- [Cloudscape Response Regeneration](https://cloudscape.design/patterns/genai/response-regeneration/)
