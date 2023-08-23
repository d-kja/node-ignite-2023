export function extractQueryParams(query: string) {
  return query
    .substring(1)
    .split('&')
    .reduce(
      (queries, item) => {
        const [key, value] = item.split('=')
        queries[key] = value

        return queries
      },
      {} as Record<string, string>,
    )
}
