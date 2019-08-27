import { libRoot, run } from './common';

/** @example v1.0.12 */
type StrVersion = string;

interface Version {
  major: number;
  minor: number;
  patch: number;
}

process.chdir(libRoot());

const localVer = getLocalVersion();
const publicVers = getPublicVersions();

const isLocalVerPublished = publicVers.some(v => _compareVersion(v, localVer));
if (isLocalVerPublished) {
  const v = incrementVersion(localVer);
  gitPush();
  console.log('Version updated: ', _formatVersion(v));
} else {
  console.log('Current version is actual');
}

function gitPush() {
  run(`git push --no-verify`);
  run(`git push --no-verify --tags`);
}

function incrementVersion(prevVer: Version, type: keyof Version = 'patch'): Version {
  const newStrVer = run(`npm version ${type}`).toString().trim();
  const prevStrVer = _formatVersion(prevVer);
  run(`git add package.json package-lock.json`);
  run(`git commit -m 'Update package version: ${prevStrVer} -> ${newStrVer}'`);
  run(`git tag -a ${newStrVer} -m 'new version: ${newStrVer}'`);

  return _parseVersion(newStrVer);
}

function getLocalVersion(): Version | undefined {
  return _parseVersion(require(libRoot('package.json')).version);
}

function getPublicVersions(): Version[] {
  const output = run('npm view . versions --json');
  const allVersions = JSON.parse(output.toString());

  return allVersions
    .map((v: string) => _parseVersion(v))
    .filter(Boolean);
}

// function getGitVersions(): Version[] {
//   const output = run(`git tag -l 'v*'`);
//
//   return String(output)
//     .split('\n')
//     .slice(0, -1)
//     .map((v: string) => _parseVersion(v))
//     .filter(Boolean) as Version[];
// }

function _parseVersion(strVersion: StrVersion): Version | undefined {
  const res = strVersion.match(/^v?(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/);
  if (!res || !res.groups) { return; }

  return {
    major: +res.groups.major,
    minor: +res.groups.minor,
    patch: +res.groups.patch,
  };
}

function _formatVersion(v: Version): StrVersion {
  return `v${v.major}.${v.minor}.${v.patch}`;
}

function _compareVersion(a?: Version, b?: Version): boolean {
  return !!(a && b)
    && a.major === b.major
    && a.minor === b.minor
    && a.patch === b.patch
    ;
}
