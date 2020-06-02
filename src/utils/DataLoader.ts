export function loadDataFromSource(
  source: (
    processor: (sourceName: string) => (input: string, index?: number) => void
  ) => void,
  processor: (sourceName: string) => (input: string, index?: number) => void
) {
  source(processor)
}