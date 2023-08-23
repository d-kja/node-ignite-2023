// kinda..
export const deepClone = (item: Record<string, any>) =>
  JSON.parse(JSON.stringify(item))
