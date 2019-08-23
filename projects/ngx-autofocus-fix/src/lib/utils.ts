export type MutablePartial<T> = { -readonly [K in keyof T]+?: T[K] };
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

export function normalizeInputAsBoolean(value: any, smartEmptyCheck: boolean = false): boolean {
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
               || smartEmptyCheck && (
                       value === '' // Notice: opposite default behavior!
                    || value instanceof Array && !value.length
                    || value !== null && typeof value === 'object' && !Object.keys(value).length
                  );

  return !isFalse;
}
