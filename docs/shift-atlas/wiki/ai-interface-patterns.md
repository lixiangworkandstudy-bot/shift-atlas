# AI Interface Patterns

## 一句话定义

AI 界面模式，指 AI 产品如何把语言、控件、状态、动作和任务编排成可用的交互结构。

## 更完整的定义

AI 界面模式不是某一种固定界面，而是一组判断方式：当用户把一个意图说出来时，系统应该把它保留成自然语言、转成一个控件、拆成多个步骤，还是记住状态并继续推进。

它研究的不是“界面里放了什么”，而是“界面如何决定该让用户看见什么、点什么、改什么，以及下一步怎么继续”。

## 词条定位

这不是“AI 产品长什么样”的审美词条，也不是“把模型接到网页上”的技术词条。它讨论的是：当用户把意图说出来以后，产品应该如何把这句话转化成一个可继续推进的界面。

如果说传统软件主要处理“输入字段和功能按钮”，那么 AI 产品更像在处理“语言到结构”的转译问题。界面不再只是承载内容，而是承载协作过程本身。

## 核心命题

AI Interface Patterns 的核心，不是聊天框，而是交互语法。

这个交互语法回答四个问题：

1. 用户说的话，什么时候应该继续保持自然语言？
2. 模型的回答，什么时候应该变成按钮、表单、预览、编辑器或状态流转？
3. 复杂任务，应该一次展开，还是分步揭示？
4. 界面应该怎样保留上下文，让用户知道自己正在推进哪一步？

## 为什么这个词条重要

- 它决定 AI 产品是停留在“问答窗口”，还是进入真正的工作流
- 它决定用户能否看见进度、控制权和系统状态
- 它决定输出到底是“回答”，还是“可执行的下一步”
- 它是信任设计、agent 协作、记忆系统和评估反馈的前置层

## 概念边界

AI Interface Patterns 关注的是界面如何组织交互，不是视觉风格，也不是模型训练方法。

它关注：

- 聊天何时应当变成控件
- 输出何时应当变成动作
- 界面何时应当保留状态
- 复杂能力如何逐步显露
- 不同任务应该调用什么交互形式

它不主要处理：

- 模型推理细节
- 后端编排框架
- 单纯的页面装饰
- 与 AI 无关的普通信息架构

## 边界怎么判断

如果一个设计问题讨论的是“用户怎么和 AI 发生交互”，它通常属于 AI Interface Patterns。

如果一个设计问题讨论的是“AI 输出什么内容”，但不讨论输出如何被用户接住、修改或继续操作，它还不够构成这个词条。

如果一个设计问题讨论的是“模型本身能不能做到”，那它更接近系统层，不是界面模式。

如果一个设计问题讨论的是“产品在真实场景里能不能落地”，那它更接近应用与市场，也不是界面模式本身。

## 与邻近概念的区别

### 1. 与视觉设计的区别

界面模式关心的是交互结构，不是配色、字体或装饰风格。

换句话说，两个产品可以看起来完全不同，但如果它们都用同样的方式把语言转成动作、状态和控制，它们就在同一个界面模式上。

### 2. 与产品机制的区别

产品机制回答的是系统怎么运转，比如状态流、权限、审批、流程和任务推进。

界面模式回答的是这些机制如何被呈现给用户并被用户操作。

### 3. 与系统逻辑的区别

系统逻辑关注模型、运行时、上下文、编排和成本约束。

界面模式关注的是这些约束如何影响用户看到的交互形态。

### 4. 与通用交互设计的区别

通用交互设计可以不涉及 AI 的不确定性、生成性和上下文依赖。

AI Interface Patterns 必须处理这些新增变量，所以它不是传统 UI 设计的简单平移。

## 词条判断清单

一个内容是否应该被收进 AI Interface Patterns，可以问自己这几个问题：

- 它有没有把语言转成结构化操作？
- 它有没有让输出变成可继续推进的动作？
- 它有没有让用户看见状态或进度？
- 它有没有在复杂任务里做分步展开？
- 它有没有把 AI 的不确定性转成可被管理的交互？

如果这些问题的答案大多是“有”，它通常属于这个词条。

## 这个词条最核心的矛盾

AI Interface Patterns 的核心矛盾，不是“做成聊天还是做成控件”，而是：

**如何在不丢失自然语言优势的前提下，把语言变成可执行的产品结构。**

这意味着它要同时处理两种力量：

- 自然语言带来的开放性、灵活性和低门槛
- 结构化界面带来的可控性、可见性和可执行性

真正成熟的 AI 界面，不是二选一，而是能在两者之间切换。

## 这个词条的结构

这篇总词条下面，最值得拆成独立词条的 5 个概念是：

1. [Chat Becomes Interface](chat-becomes-interface.md)
2. [Responses Become Actions](responses-become-actions.md)
3. [Interface Remembers State](interface-remembers-state.md)
4. [Controls Shift With Task](controls-shift-with-task.md)
5. [Show Complexity Step By Step](show-complexity-step-by-step.md)

这 5 个词条不是同一层级的“同义扩写”，而是分别回答不同的设计判断：

- 入口怎么发生
- 输出怎么落地
- 状态怎么延续
- 控制怎么切换
- 复杂度怎么展开

## Interaction Layer 的基础词条

除了这 5 个主干模式，界面模式下面还有两个更基础的支撑词条，负责解释“用户如何自然进入系统”以及“谁能够顺利进入系统”：

- [Natural Interaction](natural-interaction.md)
- [Accessibility & Inclusion](accessibility-and-inclusion.md)

它们不直接回答界面如何切换，而是回答更底层的问题：

- 用户是否需要先学习一套新的系统语法
- 不同能力、语言和设备条件的人是否都能使用
- 系统是否把自然表达方式保留下来，而不是强迫用户适应机器

## 一个更实用的理解方式

你可以把 AI 界面看成三层：

### 1. 语言层

用户先用自然语言表达意图，系统先理解“要做什么”。

### 2. 结构层

系统把意图转成可操作的结构，例如选项、步骤、草稿、卡片、预览、表单、模式切换。

### 3. 状态层

系统把用户当前在做什么记住，并在下一轮继续接上，而不是每次都重新开始。

如果这三层无法连起来，AI 产品就会停留在“看起来会说话，但没法做事”的状态。

## 设计判断标准

写 AI Interface Patterns 时，可以用下面 5 个标准判断一个界面是不是“真的在做这件事”：

- 信息是否可见：用户能不能看见当前状态、限制和下一步
- 状态是否持续：多轮交互后，界面是否仍记得之前发生了什么
- 输出是否可执行：回答之后，用户能不能直接推进任务
- 控制是否可回退：高风险动作是否有明确的确认、撤销和复核
- 复杂度是否逐步展开：能力是否按时机出现，而不是一开始全堆出来

## 常见误区

- 误区 1：AI 界面就是聊天框
  - 聊天只是入口，不是终点
- 误区 2：把 AI 塞进网页就算 AI 界面设计
  - 真正的问题是交互结构，不是模型是否出现
- 误区 3：界面越自由越好
  - 很多任务需要约束、预设选项和清晰状态
- 误区 4：AI 输出越像人说话越好
  - 对大多数任务来说，可执行性比拟人表达更重要

## 典型案例

- ChatGPT Canvas
- Claude Artifacts
- Cursor
- ChatGPT 插件时代的任务扩展

这些案例共同说明一件事：AI 产品的关键不只是“能回答”，而是“能不能把回答嵌入到任务里”。

## 回链

- 上位结构: [Shift Atlas Concept Tree](../shift-atlas-concept-tree.md)
- 下游词条: [Chat Becomes Interface](chat-becomes-interface.md)
- 下游词条: [Responses Become Actions](responses-become-actions.md)
- 下游词条: [Interface Remembers State](interface-remembers-state.md)
- 下游词条: [Controls Shift With Task](controls-shift-with-task.md)
- 下游词条: [Show Complexity Step By Step](show-complexity-step-by-step.md)
- 下游词条: [Natural Interaction](natural-interaction.md)
- 下游词条: [Accessibility & Inclusion](accessibility-and-inclusion.md)

## 参考来源

- [OpenAI Canvas](https://openai.com/index/introducing-canvas/)
- [Claude Artifacts](https://www.anthropic.com/news/artifacts)
- [Cursor Tab](https://docs.cursor.com/tab/overview)
- [Cloudscape Pattern Abstraction](https://cloudscape.design/patterns/genai/genai-patterns/)
