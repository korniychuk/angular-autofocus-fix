import * as path from 'path';
import { execSync } from 'child_process';

export const libName = 'ngx-autofocus-fix';
export const root = path.join.bind(path, __dirname, '..');
export const libRoot = root.bind(path, 'projects', libName);

export function run(command: string): Buffer {
  console.log(`> ${command}`);
  return execSync(command);
}
