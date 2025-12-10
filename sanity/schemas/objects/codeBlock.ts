import { defineType } from 'sanity';

export default defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash/Shell', value: 'bash' },
          { title: 'Dart', value: 'dart' },
          { title: 'Swift', value: 'swift' },
          { title: 'Kotlin', value: 'kotlin' },
          { title: 'SQL', value: 'sql' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Plain Text', value: 'text' },
        ],
      },
      initialValue: 'javascript',
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: 'Optional filename to display above the code block',
    },
    {
      name: 'highlightLines',
      title: 'Highlight Lines',
      type: 'string',
      description: 'Comma-separated line numbers to highlight (e.g., "1,3,5-7")',
    },
  ],
  preview: {
    select: {
      language: 'language',
      filename: 'filename',
      code: 'code',
    },
    prepare({ language, filename, code }) {
      return {
        title: filename || `Code (${language || 'text'})`,
        subtitle: code?.substring(0, 50) + '...',
      };
    },
  },
});
