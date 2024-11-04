export function classMap(classes: { [key: string]: any }, ...className: (string | undefined)[]) {
  return Object.entries(classes)
    .filter(([_, value]) => { return value; })
    .map(([key]) => { return key; })
    .concat(className.filter(value => value !== undefined) as string[])
    .join(' ');
}

export function isDefined(obj?: any) {
  return obj !== undefined && obj !== null;
}
