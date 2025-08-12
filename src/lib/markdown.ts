import { marked } from 'marked';
import README from '../commiserations/README.md?raw';
import LICENSE_TEXT from '../commiserations/LICENSE?raw';

export async function getReadme() {
  return marked(README);
}

export async function getLicense() {
  const licenseMarkdown = `# License\n\n\`\`\`\n${LICENSE_TEXT}\n\`\`\``;
  return marked(licenseMarkdown);
} 