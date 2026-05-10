const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function readConfig(argv) {
  const args = parseArgs(argv);
  if (!args.config) {
    throw new Error('Missing --config <path-to-deck-build.json>');
  }
  const configPath = path.resolve(process.cwd(), args.config);
  const configDir = path.dirname(configPath);
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return { config, configPath, configDir, args };
}

function resolveFromConfig(configDir, maybePath) {
  if (!maybePath) return maybePath;
  return path.isAbsolute(maybePath) ? maybePath : path.resolve(configDir, maybePath);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function fileUrl(filePath) {
  return `file:///${filePath.replace(/\\/g, '/').replace(/ /g, '%20')}`;
}

function padSlide(n) {
  return String(n).padStart(2, '0');
}

module.exports = {
  ensureDir,
  fileUrl,
  padSlide,
  parseArgs,
  readConfig,
  resolveFromConfig,
};
