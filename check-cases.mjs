import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
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

const files = walk('./src');
let hasError = false;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const importRegex = /import.*?from\s+['"](.*?)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.')) {
      const dir = path.dirname(f);
      let resolved = path.join(dir, importPath);
      
      let found = false;
      const exts = ['.ts', '.tsx', '.css', '/index.ts', '/index.tsx', ''];
      
      for (const ext of exts) {
         const testPath = resolved + ext;
         if (fs.existsSync(testPath)) {
             try {
               const realPath = fs.realpathSync.native(testPath);
               const basename = path.basename(testPath);
               const realBasename = path.basename(realPath);
               if (basename !== realBasename) {
                  console.log(`CASE MISMATCH in ${f}: imported '${importPath}' resolved to ${basename}, actual file is ${realBasename}`);
                  hasError = true;
               }
             } catch (e) {}
             found = true;
             break;
         }
      }
    }
  }
});
if (!hasError) console.log('All imports case-correct.');
