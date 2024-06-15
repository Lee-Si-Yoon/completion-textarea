# completion-textarea

## Specs

- [ ] selection event + right click context menu
  - [ ] input: selected area text + full context
  - [ ] output: chat interface + line stretch
- [ ] virtual cursor
  - [ ] input: current position
  - [ ] output: overlay icon(opens context menu)
- [ ] recommendation
  - [ ] input: user input + custom triggers(e.g. after letter "=" OR if no additional input for 2sec)
  - [ ] output: dimmed recommendation, on custom key event(default tab keyPress) extend value and reset trigger
- [ ] line count + line focus

## Demos

- [ ] vercel AI SDK
- [ ] langchain

## P1

```mermaid
flowchart TD

initialize
loading{"loading"}

inputText["user inputs text"]
inputAfterFetch{"user inputs"}

requestData["request generated data"]

userInputWithGenerated["renders user input + generated data"]
userInputReplaced["user input = user input + generated data"]

inputText --"with debounce"--> requestData

requestData --> loading
loading -->|Error| showError
loading -->|Inputs something| initialize
loading -->|No additional input for N ms| userInputWithGenerated

userInputWithGenerated --> inputAfterFetch
inputAfterFetch -->|Tab| userInputReplaced
inputAfterFetch -->|Other| initialize

userInputReplaced --> initialize
```

- [ ] implement above flow
  - [x] focus trap when tab is input
- [ ] support debounce related props
- [ ] support uncontrolled mode

## P2

- [ ] support autosize
- [ ] support custom styling
- [ ] support outer ref

## P3

- [ ] custom loading state
