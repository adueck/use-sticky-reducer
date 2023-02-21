# use-sticky-reducer

Custom hooks to persist React state on browser with the [useState](https://beta.reactjs.org/reference/react/useState) and [useReducer](https://beta.reactjs.org/reference/react/useReducer) patterns

[Blog Post](https://adueck.github.io/blog/persisting-state-in-react-with-typescript-and-use-reducer/)

## Installation

In your React project folder, run:

```bash
yarn add use-sticky-reducer
```

```bash
npm install use-sticky-reducer
```

This is an ES2022 module and **requires Node 18 or later**.

## 💻 Example

```tsx
// App.tsx

import { useStickyReducer } from './useStickyReducer';

// these are the actions for modifying the state that are allowed
type Action = 'increment' | 'double' | 'reset';

// this is a function that takes the state and handles a given Action
// giving us a new state
function reducer(state: number, action: Action): number {
  if (dispatch === 'increment') {
    return state + 1;
  }
  if (dispatch === 'double') {
    return state * 2;
  }
  if (dispatch === 'reset') {
    return 0;
  }
}

export default function App() {
  const [count, dispatch] = useStickyReducer<number, Action>(
    reducer,
    0,
    'my-key',
    (saved: number) => saved - 2
  );
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => dispatch('increment')}>Increment</button>
      <button onClick={() => dispatch('double')}>Double</button>
      <button onClick={() => dispatch('reset')}>Reset</button>
    </div>
  );
}
```

## 📚 Usage

### useStickyReducer

```ts
import { useStickyReducer } from "use-sticky-reducer";

...

const [state, dispatch] = useStickyState(reducer, defaultValue, storageKey, initialization);
```

| Property       | Description                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| reducer        | Reducer function                                                                                                                                               |
| defaultValue   | The default value used if storageKey was not previously set                                                                                                    |
| storageKey     | Unique string key used to persist data, using your browser's built in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API |
| initialization | OPTIONAL function to transform saved state on hook initialization                                                                                              |

### useStickyState

```ts
import { useStickyState } from "use-sticky-reducer";

...

const [state, setState] = useStickyState(defaultValue, storageKey, initialization);
```

| Property       | Description                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultValue   | The default value used if storageKey was not previously set                                                                                                    |
| storageKey     | Unique string key used to persist data, using your browser's built in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API |
| initialization | OPTIONAL function to transform saved state on hook initialization                                                                                              |

## With SSR

**This package is meant for client-side, browser use**. When used in SSR (server-side rendering) it will not fetch the saved state from localStorage, and default the the regular useState or useReducer behavior.
