/**
 *
 * @param path
 *  - type: string
 *  - example: /users/:id/groups/:groupId
 *  - return: /users/([a-zA-Z0-9\-_]+)/groups/([a-zA-Z0-9\-_]+)
 */

export const buildRoutePath = (path: string) => {
  // Regex to find the parameters such as ':id'
  const parametersRegex = /:([a-z]+)/gi

  // Replace the preset ':id' with valid regex to find available groups
  const pathWithParameters = path.replaceAll(
    parametersRegex,
    // prettier-ignore
    '(?<$1>[a-zA-Z0-9\-_]+)',
  )

  // transform string '/users/([a-zA-Z0-9\-_]+)' into an actual regex
  const pathRegex = new RegExp(`^${pathWithParameters}(?<query>\\?(.*))?$`)
  return pathRegex
}
