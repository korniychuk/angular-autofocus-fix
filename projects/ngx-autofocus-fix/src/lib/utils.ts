export function normalizeBoolean(value: any): boolean {
  const isFalse = value === false
               || value === null
               || value === undefined
               || value === 0
               || value === 'false'
               || value === 'null'
               || value === 'undefined'
               || value === '0'
               || isNaN(value);

  return !isFalse;
}
