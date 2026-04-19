# Safety & Harm Prevention

## 一句话定义

安全与伤害防护，指 AI 产品要尽量避免把用户带入明显有害、不可逆、或者超出可接受风险边界的结果。

## 这个词条在说什么

在 AI 产品里，“安全”不是抽象的道德口号，而是具体的产品约束。

它关心的是：系统在什么情况下应该停下来、降级、要求确认、拒绝执行，或者改成更保守的行为。

这类设计不是为了让产品什么都做不了，而是为了让产品在高风险时不越线，在低风险时不拖慢用户。

## 范围

这个词条覆盖：

- 有害输出的过滤与拦截
- 高风险任务的限制与确认
- 内容安全
- 操作安全
- 误导、过度承诺和危险建议的防护
- 对明显不确定场景的保守响应

## 边界

它不是“把所有内容都封掉”。

过度保守会让产品失去可用性，甚至逼用户去别处寻找更不受控的工具。

所以这个词条真正关注的是风险分层：哪些情况必须拦住，哪些情况应该提示，哪些情况可以继续但需要更强的可见性。

## 怎么判断

- 高风险请求是否被单独识别
- 系统是否会在必要时停下来而不是盲目继续
- 产品是否把危险动作和普通动作区分开
- 用户是否能理解为什么系统拒绝或降级
- 防护是否影响了低风险任务的正常使用

## 为什么重要

AI 产品一旦能写、能说、能建议、能操作，它就可能在不经意间放大伤害。

因此，安全不是附加功能，而是产品是否能长期成立的前提之一。

## 典型模式

- 高风险场景要求明确确认
- 危险输出被降级为解释或提示
- 模型在不确定时主动停顿或澄清
- 内容安全和动作安全分层处理
- 系统把“不能做什么”说清楚

## 常见失效方式

- 只在极端案例上拦截，却忽略了现实中的灰区
- 为了流畅度而过度放行
- 防护规则过多，结果把正常使用也拦住
- 系统拒绝时不给出可理解的原因

## 相关词条

- [Trustworthy & Reliable AI](trustworthy-and-reliable-ai.md)
- [Who Decides At Critical Steps](who-decides-at-critical-steps.md)
- [Can Users Recover From Mistakes](can-users-recover-from-mistakes.md)

## 回链

- 上位词条: [Trust & Control](../shift-atlas-concept-tree.md)

## 参考来源

- [OpenAI Help Center](https://help.openai.com/)
- [NN/g Artificial Intelligence topic](https://www.nngroup.com/topic/artificial-intelligence/)
- [AI Snake Oil](https://www.aisnakeoil.com/)
