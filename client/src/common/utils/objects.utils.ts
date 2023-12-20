function flattenObjectWithPrefix(o: any, target = {}, prefix: string = ""): object {
  if (typeof o === "object") 
    Object.keys(o).forEach(key => {
      flattenObjectWithPrefix(o[key], target, prefix? `${prefix}.${key}` : key)
    })
  else {
    target[prefix] = o;
  }
  return target;
}

export function flattenObject(o: object): object {
  return flattenObjectWithPrefix(o);
}