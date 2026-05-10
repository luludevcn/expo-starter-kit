#!/usr/bin/env node
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = './screenshots';
const DEVICES = [
  { name: 'iPhone-15-Pro-Max', width: 1290, height: 2796 },
  { name: 'iPhone-15', width: 1179, height: 2556 },
  { name: 'iPhone-SE', width: 750, height: 1334 },
  { name: 'Pixel-8-Pro', width: 1008, height: 2244 },
];

async function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { shell: true });
    let stdout = '';
    let stderr = '';
    proc.stdout.on('data', (data) => (stdout += data));
    proc.stderr.on('data', (data) => (stderr += data));
    proc.on('close', (code) => (code === 0 ? resolve(stdout) : reject(stderr)));
  });
}

async function captureScreenshots() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  console.log('Starting screenshot capture...\n');

  for (const device of DEVICES) {
    console.log(`Capturing for ${device.name}...`);
    const outputPath = path.join(SCREENSHOTS_DIR, `${device.name}.png`);

    try {
      await runCommand('npx', [
        'expo',
        'screenshot',
        '--platform',
        'ios',
        '--device',
        device.name,
        '--output',
        outputPath,
      ]);
      console.log(`  ✓ Saved to ${outputPath}`);
    } catch (error) {
      console.log(`  ✗ Failed: ${error.message}`);
    }
  }

  console.log('\nScreenshot capture complete!');
  console.log(`Files saved in: ${SCREENSHOTS_DIR}/`);
}

captureScreenshots().catch(console.error);
