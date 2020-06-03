export function loadDataFromSource<T>(
  source: (processor: T) => void,
  processor: T
) {
  source(processor)
}