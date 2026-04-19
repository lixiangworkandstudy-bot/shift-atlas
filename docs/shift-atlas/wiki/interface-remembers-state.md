# Interface Remembers State

## 一句话定义

界面记住状态，指 AI 产品不会把每一轮交互都当成“全新开始”，而是持续保留任务进度、上下文和当前模式。

## 这个词条在说什么

如果没有状态，AI 产品就会不断重复同样的追问：

- 你刚才要做什么？
- 你想保留哪一版？
- 你已经确认过哪一步？

这会让对话看起来流畅，但任务推进很慢。

所以这个词条讨论的是：界面如何把“正在进行的事情”显式保留下来。

## 状态可以包括什么

- 当前任务阶段
- 已选中的选项
- 已编辑的草稿
- 历史版本
- 当前模式
- 还未确认的高风险动作
- 用户偏好或项目上下文

## 为什么重要

当界面记得状态时，用户会感到：

- 这个系统不是从零开始
- 我可以回到上一步
- 我不需要每轮都重述背景
- 复杂任务可以被拆开完成

没有状态记忆，AI 产品通常只能停留在“聊天演示”。

## 设计信号

- 任务进度条或阶段标识
- 草稿自动保留
- 版本历史可回看
- 当前选择一直可见
- 模式切换后仍保留之前的结果

## 常见设计方法

- 把用户关键决定写进界面，而不是只放在对话里
- 把任务拆成可恢复的步骤
- 让系统保存草稿、选择和版本差异
- 在必要时提供撤销、恢复和分支

## 常见误区

- 误区 1：只有长期记忆才算状态
  - 很多时候，当前任务状态比长期记忆更重要
- 误区 2：状态越多越好
  - 过多状态会让用户不知道现在该看哪里
- 误区 3：状态隐藏在模型内部就够了
  - 对用户来说，可见状态比不可见记忆更有价值

## 和其他词条的关系

- [Chat Becomes Interface](chat-becomes-interface.md): 讲入口如何变成结构
- [Responses Become Actions](responses-become-actions.md): 讲结果如何落成可继续推进的动作
- [Controls Shift With Task](controls-shift-with-task.md): 讲状态如何决定控件形态

## 回链

- 上位词条: [AI Interface Patterns](ai-interface-patterns.md)

## 参考来源

- [Generative AI chat](https://cloudscape.design/patterns/genai/generative-AI-chat/)
- [Response regeneration](https://cloudscape.design/patterns/genai/response-regeneration/)
- [What is Memory?](https://help.openai.com/en/articles/8983136)
