# Controls Shift With Task

## 一句话定义

控件随任务切换，指 AI 产品会根据任务阶段、风险等级和确定性变化，在对话、选项、表单、预览、编辑器、审批和工作区之间切换控制方式。

## 这个词条在说什么

这个词条讨论的不是“界面有多少控件”，而是“控制权如何随着任务推进而重新分配”。

在 AI 产品里，用户一开始往往只有模糊意图，系统就需要用对话、引导问题和示例帮助用户收敛目标。随着任务变得更明确，界面会逐渐切换到更结构化的控件，比如选项、表单、草稿、预览、差异比较和审批。到了执行阶段，控件又会进一步偏向效率、状态可见性和可恢复性。

所以，这个词条关心的是：同一个任务在不同阶段，应该由谁来决定、用什么方式决定、以及决定到什么程度。

## Scope

这个词条适用于那些会经历明显阶段变化的 AI 交互场景，例如：

- 从自然语言探索到结构化配置
- 从生成草稿到人工复核
- 从低风险自动执行到高风险显式确认
- 从一次性对话到持续工作区
- 从单步回答到多步任务编排

它特别适合解释以下产品：

- AI 助手从聊天转向编辑器或工作区
- Agent 产品里的人机协作流程
- 需要审批、回退、复核的高风险操作
- 任务越走越清晰、控件也逐渐收束的产品

## Boundary

这个词条不适用于下面几类情况：

- 只是把界面换成不同视觉风格，但控制权没有变化
- 只是按钮、菜单或布局的静态重排
- 只是权限控制、账号控制或组织级治理，而不是任务中的控制分配
- 只是因为品牌或营销原因而切换控件样式
- 只是 UI 做得更复杂，但没有任务阶段上的理由

换句话说，如果控件变化不能解释为“任务推进导致控制方式变化”，那它就不属于这个词条。

## How to tell

可以用下面几个问题判断一个设计是不是 `Controls Shift With Task`：

- 这个控件变化是不是由任务阶段触发的？
- 这个变化是不是为了降低不确定性、风险或认知负担？
- 用户是否会在不同阶段拥有不同程度的控制权？
- 系统是否会在适当时机收紧、放开或转移控制？
- 如果把整个流程换成单一聊天框，这个设计会明显变差吗？

如果答案大多是“是”，那它基本属于这个词条。

## Why it matters

AI 产品最大的设计难点之一，不是让模型“能做事”，而是让控制权在合适的时间交还给正确的人。

如果控件始终保持一种状态，常见结果就是：

- 任务开始时太结构化，用户很难表达真实意图
- 任务中段太开放，用户不知道下一步该做什么
- 任务进入高风险阶段时，界面又没有足够的确认和复核
- 用户对系统做了什么、接下来会发生什么缺乏预期

控件随任务切换的价值在于：

- 降低用户在不同阶段的认知负担
- 让 AI 能力在合适的结构里落地
- 把自动化速度和人工可控性协调起来
- 让高风险步骤保留人类判断
- 让复杂任务在流程上更可理解、更可回退

## Typical patterns

常见的控件切换模式包括：

1. `先开放，再收束`
- 先让用户用自然语言表达意图，再逐渐引导到结构化参数、选项或审批。

2. `先生成，再编辑`
- 系统先产出草稿，然后交给用户在编辑器中修改、确认或比较差异。

3. `先建议，再执行`
- 系统先给出推荐动作、备选项和风险提示，用户确认后才真正执行。

4. `低风险自动，高风险显式`
- 低风险步骤自动完成，高风险步骤必须经过确认、审批或复核。

5. `任务阶段切换控件容器`
- 同一产品里会在聊天、表单、预览、工作区、侧边栏之间切换，而不是一直停留在一个输入框里。

6. `状态驱动控件显隐`
- 任务状态变化后，系统只显示当前阶段需要的少数控件，避免一次性暴露全部复杂度。

## Common failure modes

这个词条最常见的失败方式有几种：

- `控件不切换`
  - 所有任务都被塞进同一种交互模式里，结果要么太松，要么太紧。

- `切换没有理由`
  - 界面突然变了，但用户看不出为什么变，控制感被打断。

- `切换过于频繁`
  - 每一步都换容器、换交互、换布局，用户需要不断重新学习界面。

- `控制权不匹配风险`
  - 低风险任务却要求过多确认，或者高风险任务却直接自动执行。

- `自动化被伪装成可控`
  - 系统看起来像让用户控制，实际上关键动作早已自动发生。

- `缺少恢复路径`
  - 控件切换后没有撤销、回退、复核或修正机制，用户只能接受结果。

## Related terms

- [Chat Becomes Interface](chat-becomes-interface.md): 讲入口如何从聊天开始。
- [Responses Become Actions](responses-become-actions.md): 讲输出如何进一步变成可执行动作。
- [Show Complexity Step By Step](show-complexity-step-by-step.md): 讲复杂任务如何分阶段显露。
- [Who Decides at Critical Steps](who-decides-at-critical-steps.md): 讲关键节点谁来拍板。
- [Can Users Recover From Mistakes](can-users-recover-from-mistakes.md): 讲错误后如何回退和修正。
- [Privacy & Control](privacy-and-control.md): 讲控制与数据边界的关系。
- [Trustworthy & Reliable AI](trustworthy-and-reliable-ai.md): 讲为什么控制变化必须建立在可信执行之上。

## Backlinks

- 上位词条: [AI Interface Patterns](ai-interface-patterns.md)
- 同层词条: [Natural Interaction](natural-interaction.md)
- 同层词条: [Accessibility & Inclusion](accessibility-and-inclusion.md)

## References

- [Cloudscape Pattern Abstraction](https://cloudscape.design/patterns/genai/genai-patterns/)
- [Cloudscape Shortcut Menus](https://cloudscape.design/patterns/genai/shortcut-menus/)
- [Cloudscape User Authorized Actions](https://cloudscape.design/patterns/genai/user-authorized-actions/)
- [OpenAI Canvas](https://openai.com/index/introducing-canvas/)
- [Anthropic Artifacts](https://www.anthropic.com/news/artifacts)
