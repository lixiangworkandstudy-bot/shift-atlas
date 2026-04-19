# Chat Becomes Interface

## 一句话定义

聊天不再只是文本问答的入口，而是任务启动、界面生成和状态切换的起点。

## 这个词条在说什么

在传统聊天产品里，用户输入一句话，系统返回一段话。
在 AI 产品里，这个链路越来越不够用。

当任务边界逐渐清晰时，产品应该把语言转成更结构化的界面：按钮、卡片、草稿、表单、预览、模式切换、任务列表。

所以这个词条研究的不是“聊天按钮长什么样”，而是：

- 对话在什么时刻应该升级为界面
- 哪些信息适合继续用自然语言表达
- 哪些信息应该被提炼成可点击、可编辑、可回退的结构

## 典型发生时机

### 1. 意图已经明确

用户已经说清要做什么，不需要系统再反复追问。

### 2. 任务有多个步骤

当一件事不再是“一次回答”能完成时，聊天应该让位给步骤式结构。

### 3. 用户需要看见中间结果

如果任务中存在草稿、预览、差异、版本、审批，聊天框就不够了。

### 4. 系统开始承担“协作”而不只是“回答”

一旦 AI 要参与组织内容、推进流程或管理状态，对话就会转成工作界面。

## 设计信号

下面这些信号通常说明“聊天正在变成界面”：

- 出现固定的任务卡或模式选择
- 出现可编辑草稿，而不是纯文本回复
- 出现建议动作、下一步按钮、确认按钮
- 出现工作区、预览区、历史区分栏
- 出现模式切换，例如 chat / canvas / workspace

## 常见设计方法

- 先用聊天收集模糊意图，再把结果转成结构化任务
- 当任务稳定后，固定出更适合的界面容器
- 让聊天保留解释和协商功能，把执行留给结构化区域
- 让模型先提议结构，再让用户确认或调整结构

## 常见误区

- 误区 1：任何输入框都叫聊天
  - 输入框只是载体，关键是它后面接了什么结构
- 误区 2：聊天越长越好
  - 很多时候，聊天越长只代表系统还没把问题结构化
- 误区 3：界面切换会破坏体验
  - 如果切换对应任务阶段，反而会减少认知负担

## 和其他词条的关系

- [Responses Become Actions](responses-become-actions.md): 讲输出怎么变成操作
- [Interface Remembers State](interface-remembers-state.md): 讲状态如何在对话之外延续
- [Controls Shift With Task](controls-shift-with-task.md): 讲控件如何随着任务变化

## 回链

- 上位词条: [AI Interface Patterns](ai-interface-patterns.md)

## 参考来源

- [Generative AI chat](https://cloudscape.design/patterns/genai/generative-AI-chat/)
- [Artifact previews](https://cloudscape.design/patterns/genai/artifact-previews/)
- [OpenAI Canvas](https://openai.com/index/introducing-canvas/)
