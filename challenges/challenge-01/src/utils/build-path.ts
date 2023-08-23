export function buildPath(path: string) {
  const paramRegex = /:([a-z]+)/gi
  const queryRegex = '(?<query>\\?(.*))?'

  // prettier-ignore
  const pathWithParams = path.replaceAll(paramRegex, '(?<$1>[a-zA-Z0-9-_]+)')

  return new RegExp(`^${pathWithParams}${queryRegex}$`)
}
