export function loadDataFromSource(
  source: (processor?: (input: string) => void) => void,
  processor: (input: string) => void
) {
  source(processor)
}