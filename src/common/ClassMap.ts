export function classMap(classes: { [key: string]: unknown; }, ...className: (string | undefined)[]) {
  return Object.entries(classes)
    .filter(([, value]) => { return value; })
    .map(([key]) => { return key; })
    .concat(className.filter(value => value !== undefined) as string[])
    .join(' ');
}

export function isDefined(obj?: unknown) {
  return obj !== undefined && obj !== null;
}
