# Shift Atlas Concept Tree

This document decomposes the current AI product knowledge graph into a wiki-first concept tree.
The goal is to turn each node into a durable encyclopedia entry, not a loose collection of cards.

## 1. Writing Model

- `Raw source` = articles, papers, codebases, datasets, images stored under `raw/`
- `Wiki entry` = one Markdown page per concept, with definition, context, links, sources, and examples
- `Graph` = links between entries, not the entries themselves
- `Signal` = new product moves, platform shifts, research findings, and important announcements

## 2. Core Structure

### 2.1 Knowledge Ingestion Layer

- Raw materials
  - Articles
  - Papers
  - Codebases
  - Datasets
  - Images
- Source library
  - Stable references worth reading repeatedly
  - Pattern libraries
  - Framework libraries
  - Research archives
- Signal feed
  - Product announcements
  - Platform updates
  - Research updates
  - Market shifts
- Organizer
  - Classify by concept
  - Generate summaries
  - Create back-links
  - Merge repeated signals into durable judgments
- Reading layer
  - Obsidian as the front end
  - Markdown as the storage format
  - Visualization as a view, not the source of truth

### 2.2 Editorial Principle

- Every concept should be written like a wiki entry.
- Every entry should answer:
  - What is it?
  - Why does it matter?
  - What sits above it?
  - What sits below it?
  - What is adjacent to it?
  - What are the best sources?
  - What are the typical examples?
  - What are the common mistakes or misunderstandings?

## 3. Main Concept Tree

### 3.1 AI Interface Patterns

- Chat becomes interface
  - Conversation becomes the entry point for task setup and interface generation
- Responses become actions
  - Output becomes actions, choices, or state changes
- Show complexity step by step
  - Reveal capability progressively instead of all at once
- Interface remembers state
  - Keep progress visible across turns
- Controls shift with task
  - Switch between chat, forms, buttons, and previews based on task shape

### 3.2 Trust & Control

- Confidence & trust cues
  - Confidence, tone, and limitation disclosure
- Who decides at critical steps
  - Explicit ownership of important decisions
- Can users recover from mistakes
  - Undo, repair, and continuation paths
- Visible approval gates
  - Show when permission is required
- Undo and repair
  - Make actions reversible whenever possible
- Users can see control
  - The user should always know where control sits

### 3.3 Agent Workflow

- What to delegate
  - Decide what the agent should do and what the user should keep
- Set scope and next step
  - Explain what the agent can do, will do, and does not yet know
- Where humans re-enter the loop
  - Explicit review and takeover moments
- Visible task handoff
  - Make responsibility transfer legible
- Review before commit
  - Pause before irreversible or external actions
- Human-agent working contract
  - Shared expectations, checkpoints, fallback paths

### 3.4 AI + Education

- AI should support learning, not shortcut it
  - Help thinking, practice, and reflection
- Guide the next learning step
  - Suggest the smallest useful next move
- Feedback should improve understanding
  - Explain why something is wrong and what to do next
- Guided practice instead of full answers
  - Preserve productive struggle
- Teacher stays in the loop
  - Keep educator oversight visible
- Learning needs productive struggle
  - Do not remove all difficulty

### 3.5 Memory Systems

- Knowledge compounds over time
  - Signals and judgments should accumulate
- Retrieve the right context
  - Bring back relevant memory at the right moment
- What deserves to be remembered
  - Selection matters more than accumulation
- Memory beyond this session
  - Durable context across turns
- Review what the system remembers
  - Stored knowledge should be re-checked
- Let memory expire
  - Not everything should stay active forever
- Archive decisions, not articles
  - The durable unit is a judgment

### 3.6 AI Companionship

- Relationships need continuity
  - Tone, memory, and context must stay stable
- Care can become dependency
  - Support can become unhealthy reliance
- Companionship needs boundaries
  - The product must define its relationship limits
- Consistent persona over time
  - Stability in behavior and voice
- Care without emotional overclaim
  - Warmth without pretending to be a human bond
- Companionship as relationship design
  - Long-term relational architecture, not a feature

### 3.7 Gamification Design

- Motivation needs a loop
  - Action, response, progress, return
- Progress must stay visible
  - Effort should become legible progress
- Rewards can distort behavior
  - Rewards may create shallow optimization
- Visible progress loop
  - Keep effort and progress tightly connected
- Gentle return cues
  - Invite the user back without pressure-only design
- Motivation is a system, not a badge
  - Align goals, feedback, reward, and meaning

### 3.8 AI Product Constraints

- What each task gets to see
  - Context routing and selective exposure
- Product limits
  - Latency, cost, reliability, and capability boundaries
- Latency and cost change UX
  - Backend tradeoffs shape interaction design
- Spend context deliberately
  - Context is a limited resource
- Fail gracefully under limits
  - Degrade clearly when the system hits a boundary
- Infrastructure shapes product
  - Runtime choices are product choices

### 3.9 Market & Product Signals

- Product conventions are shifting
  - Track new norms before they harden
- When a platform shift matters
  - Separate meaningful shifts from noise
- Watch conventions before they harden
  - Observe emerging patterns early
- Separate noise from structural change
  - Rank signals by product significance
- Turn signals into product judgment
  - Convert external change into design decisions

### 3.10 Evaluation & Feedback

- What counts as good output
  - Define quality at the product level
- How users notice failure
  - Make errors visible enough to act on
- How feedback changes the system
  - Connect correction to future behavior
- Inline correction
  - Let users fix issues in flow
- Explain the failure
  - Make failure readable
- Products need a quality loop
  - Usage, correction, evaluation, iteration

## 4. Wiki Entry Priority

If this graph is rewritten as a wiki, the first pages to write should be:

1. Chat becomes interface
2. Responses become actions
3. Confidence & trust cues
4. Who decides at critical steps
5. What to delegate
6. Set scope & next step
7. Knowledge compounds over time
8. Retrieve the right context
9. AI should support learning, not shortcut it
10. What counts as good output

## 5. Suggested Link Logic

- `AI Interface Patterns` links forward to `Trust & Control`
- `Trust & Control` links forward to `Agent Workflow`
- `Memory Systems` links into `AI + Education` and `AI Companionship`
- `AI Product Constraints` constrains all other domains
- `Evaluation & Feedback` closes the loop for every domain
- `Market & Product Signals` informs timing, priority, and relevance

## 6. Next Writing Pass

- Pick one concept page
- Give it a strict wiki template
- Add sources
- Add related concepts
- Add examples
- Add common misunderstandings
- Add backlinks to the domain page and sibling pages
