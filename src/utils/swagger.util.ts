import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';

export function loadApiSpec() {
  const yamlFile = readFileSync(join(process.cwd(), 'doc/api.yaml'), 'utf8');
  return load(yamlFile);
}
