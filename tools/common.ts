import * as path from 'path';

export const libName = 'ngx-autofocus-fix';
export const root = path.join.bind(path, __dirname, '..');
export const libRoot = root.bind(path, 'projects', libName);
