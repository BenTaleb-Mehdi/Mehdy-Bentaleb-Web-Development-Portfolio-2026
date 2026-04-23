import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';

const mappings = [
  { from: /\bbg-background\b/g, to: 'bg-black' },
  { from: /\btext-foreground\b/g, to: 'text-white' },
  { from: /\bbg-foreground\b/g, to: 'bg-white' },
  { from: /\btext-background\b/g, to: 'text-black' },
  { from: /\bborder-border\b/g, to: 'border-zinc-900' },
  { from: /\bbg-muted\b/g, to: 'bg-zinc-900' },
  { from: /\btext-muted-foreground\b/g, to: 'text-zinc-500' },
  { from: /\bfrom-background\b/g, to: 'from-black' },
  { from: /\bto-background\b/g, to: 'to-black' },
  { from: /\bvia-background\b/g, to: 'via-black' },
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(SRC_DIR);
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  mappings.forEach(map => {
    newContent = newContent.replace(map.from, map.to);
  });
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
  }
});

console.log(`Updated ${changedCount} files successfully.`);
