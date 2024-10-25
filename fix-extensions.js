const fs = require('fs');
const path = require('path');

const directory = './dist';

fs.readdirSync(directory).forEach(file => {
  if (file.endsWith('.js')) {
    const filePath = path.join(directory, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Adiciona .js nas importações que não têm a extensão
    content = content.replace(/from '(.*)';/g, (match, p1) => {
      if (!p1.endsWith('.js')) {
        return `from '${p1}.js';`;
      }
      return match;
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed imports in ${file}`);
  }
});
