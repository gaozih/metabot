import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const SCRIPT = path.join(REPO_ROOT, 'scripts', 'pack-github-release.sh');
const OUT_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'metabot-github-release-test-'));
const TARBALL = path.join(OUT_DIR, 'metabot-runtime.tgz');
const INSTALLER = path.join(OUT_DIR, 'install.sh');
const CHECKSUMS = path.join(OUT_DIR, 'SHA256SUMS');

beforeAll(() => {
  execFileSync('bash', [SCRIPT], {
    env: { ...process.env, METABOT_GITHUB_RELEASE_OUTPUT_DIR: OUT_DIR },
    stdio: 'pipe',
  });
}, 60_000);

afterAll(() => fs.rmSync(OUT_DIR, { recursive: true, force: true }));

describe('GitHub release package', () => {
  it('writes the stable public release asset layout', () => {
    expect(fs.statSync(TARBALL).size).toBeGreaterThan(1024);
    expect(fs.statSync(INSTALLER).mode & 0o111).not.toBe(0);
    expect(fs.readFileSync(CHECKSUMS, 'utf-8')).toMatch(/^[a-f0-9]{64}[ ]{2}metabot-runtime\.tgz\n$/);
  });

  it('points the public installer at GitHub Releases instead of localhost core', () => {
    const source = fs.readFileSync(INSTALLER, 'utf-8');
    expect(source).toContain('https://github.com/xvirobotics/metabot/releases/latest/download/metabot-runtime.tgz');
    expect(source).not.toContain('TARBALL_URL="$CORE_URL/install/latest.tgz"');
  });

  it('ships a runtime-only manifest whose declared workspaces all exist', () => {
    const packageJson = JSON.parse(execSync(`tar xOf ${JSON.stringify(TARBALL)} package.json`, { encoding: 'utf-8' }));
    const listing = execSync(`tar tzf ${JSON.stringify(TARBALL)}`, { encoding: 'utf-8' });
    for (const workspace of packageJson.workspaces as string[]) {
      expect(listing).toContain(`${workspace}/package.json`);
    }
  });
});
