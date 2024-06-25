export const noop = () => {};

export function assert(
  condition: unknown,
  error: Error | string = new Error(),
): asserts condition {
  if (!condition) {
    const assertionError = typeof error === 'string' ? new Error(error) : error;

    throw assertionError;
  }
}
