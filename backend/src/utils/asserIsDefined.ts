export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (!val) {
    throw Error(`Expected 'val' to bed defined, but received ${val}`);
  }
}
