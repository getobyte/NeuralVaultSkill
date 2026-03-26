#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const isLocal = args.includes('--local');
const isGlobal = args.includes('--global') || !isLocal;

const customConfigDir = (() => {
  const idx = args.indexOf('--config-dir');
  return idx !== -1 ? args[idx + 1] : null;
})();

const commandsSource = path.join(__dirname, '..', 'nvc-commands');

let claudeDir;
if (customConfigDir) {
  claudeDir = customConfigDir;
} else if (isLocal) {
  claudeDir = path.join(process.cwd(), '.claude');
} else {
  claudeDir = path.join(os.homedir(), '.claude');
}

const commandsDir = path.join(claudeDir, 'commands', 'nvc');

console.log('Installing NeuralVaultSkill...');
console.log(`Location: ${isLocal ? 'local (.claude/)' : 'global (~/.claude/)'}`);
console.log('');

try {
  if (!fs.existsSync(commandsDir)) fs.mkdirSync(commandsDir, { recursive: true });

  const files = fs.readdirSync(commandsSource);
  for (const file of files) {
    const src = path.join(commandsSource, file);
    const dest = path.join(commandsDir, file);
    fs.copyFileSync(src, dest);
  }

  console.log(`Skill installed to: ${commandsDir}`);
  console.log('');
  console.log('NeuralVaultSkill installed successfully.');
  console.log('Open Claude Code and use:');
  console.log('  /nvc:init  — Load project context');
  console.log('  /nvc:end   — Save session checkpoint');
} catch (err) {
  console.error('Installation failed:', err.message);
  process.exit(1);
}
