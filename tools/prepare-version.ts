import { execSync } from 'child_process';
import { libRoot } from './common';

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
const gitVers = getGitVersions();

const isLocalVerPublished = publicVers.some(v => _compareVersion(v, localVer));
if (isLocalVerPublished) {
  incrementVersion();
}


function incrementVersion(type: keyof Version = 'patch'): void {
  const newVer = execSync(`npm version ${type}`);
  const tag = `v${newVer}`;
  execSync(`git add package.json package-lock.json`);
  execSync(`git commit -m 'CI: New version ${newVer}'`);
  execSync(`git tag -a ${tag} -m 'new version: ${tag}'`);
}

function getLocalVersion(): Version | undefined {
  return _parseVersion(require(libRoot('package.json')).version);
}

function getPublicVersions(): Version[] {
  const output = execSync('npm view . versions --json');
  const allVersions = JSON.parse(output.toString());

  return allVersions
    .map((v: string) => _parseVersion(v))
    .filter(Boolean);
}

function getGitVersions(): Version[] {
  const output = execSync(`git tag -l 'v*'`);

  return String(output)
    .split('\n')
    .slice(0, -1)
    .map((v: string) => _parseVersion(v))
    .filter(Boolean) as Version[];
}

function _parseVersion(strVersion: StrVersion): Version | undefined {
  const res = strVersion.match(/^v?(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/);
  if (!res || !res.groups) { return; }

  return {
    major: +res.groups.major,
    minor: +res.groups.minor,
    patch: +res.groups.patch,
  };
}

function _compareVersion(a?: Version, b?: Version): boolean {
  return !!(a && b)
    && a.major === b.major
    && a.minor === b.minor
    && a.patch === b.patch
    ;
}
