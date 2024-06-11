# completion-textarea

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
  - [ ] focus trap when tab is input
- [ ] support debounce related props
- [ ] support uncontrolled mode

## P2

- [ ] support autosize
- [ ] support custom styling
- [ ] support outer ref

## P3

- [ ] custom loading state
