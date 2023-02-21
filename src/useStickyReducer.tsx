import useStickyState from './useStickyState';

/**
 * An implementation of the React useReducer pattern with persistent storage to localStorage. If an initialization function is provided, it we be called on any saved state before initialization.
 *
 * @param {function} reducer a function that takes a state as a first argument and a dispatch action as a second argument and returns a transformed state value
 * @param {(string|number|object|boolean|undefined|null)} defaultValue The default value to use if there was nothing saved previously
 * @param {string} key The key for storing the value in localStorage
 * @param {function} [initialization] An optional function to be applied to the saved state before initialization
 */
export default function useStickyReducer<T extends SaveableData, A>(
  reducer: (state: T, action: A) => T,
  defaultValue: T,
  key: string,
  initializer?: (saved: T) => T
): [T, (action: A) => void] {
  const [state, unsafeSetState] = useStickyState<T>(
    defaultValue,
    key,
    initializer
  );
  function adjustState(action: A) {
    unsafeSetState((oldState) => {
      const newState = reducer(oldState, action);
      return newState;
    });
  }
  return [state, adjustState];
}
