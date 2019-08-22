export function normalizeBoolean(value: any, smartEmptyCheck: boolean = false): boolean {
  const isFalse = value === false
               || value === null
               || value === undefined
               || value === 0
               || value === 'false'
               || value === 'null'
               || value === 'undefined'
               || value === '0'
               || (typeof value === 'number' && isNaN(value))
               || value === 'NaN'
    // @todo: 'autofocus'
               || smartEmptyCheck && (
                       value === '' // Notice: opposite default behavior!
                    || value instanceof Array && !value.length
                    || value !== null && typeof value === 'object' && !Object.keys(value).length
                  );

  return !isFalse;
}
