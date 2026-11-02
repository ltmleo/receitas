import fs from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import type {LoadedContent} from '@docusaurus/plugin-content-docs';

/**
 * Builds a lightweight index of every notebook / page / recipe at build time
 * and exposes it as global data (consumed by the homepage: stats, marquee,
 * "Me surpreenda" button).
 *
 * Reuses the docs plugin output (permalinks, titles) instead of re-deriving
 * routes, so it never drifts from what Docusaurus actually generates.
 */

const UNREVIEWED_MARKER = 'NÃO REVISADO';
const PAGE_RE = /\/page_\d+\.mdx?$/;

export type RecipeIndexNotebook = {
  slug: string;
  title: string;
  permalink: string;
  pages: number;
  reviewed: number;
  recipes: number;
};

export type RecipeIndexData = {
  notebooks: RecipeIndexNotebook[];
  /** Compact list: [recipe title, permalink] */
  recipes: [string, string][];
  totals: {pages: number; reviewed: number; recipes: number};
};

const extractRecipeTitles = (markdown: string): string[] =>
  markdown
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => line.slice(3).replace(/[*_`#]/g, '').trim())
    .filter((title) => title.length > 1 && title.length < 60);

export default function recipeIndexPlugin(context: LoadContext): Plugin {
  return {
    name: 'recipe-index',
    async allContentLoaded({allContent, actions}) {
      const docsContent = allContent['docusaurus-plugin-content-docs']
        ?.default as LoadedContent | undefined;
      const docs = docsContent?.loadedVersions[0]?.docs ?? [];

      const notebooks = new Map<string, RecipeIndexNotebook>();
      const recipes: [string, string][] = [];

      // Notebook landing pages (receitas/<slug>/index.md)
      for (const doc of docs) {
        const rel = doc.source.replace('@site/', '');
        const parts = rel.split('/');
        if (parts.length === 3 && /^index\.mdx?$/.test(parts[2])) {
          notebooks.set(parts[1], {
            slug: parts[1],
            title: doc.title,
            permalink: doc.permalink,
            pages: 0,
            reviewed: 0,
            recipes: 0,
          });
        }
      }

      const pages = docs.filter((doc) => PAGE_RE.test(doc.source));
      const sources = await Promise.all(
        pages.map((doc) =>
          fs.readFile(
            path.join(context.siteDir, doc.source.replace('@site/', '')),
            'utf8',
          ),
        ),
      );

      pages.forEach((doc, i) => {
        const slug = doc.source.replace('@site/', '').split('/')[1];
        const notebook = notebooks.get(slug);
        if (!notebook) return;
        const markdown = sources[i];
        const titles = extractRecipeTitles(markdown);
        notebook.pages += 1;
        notebook.recipes += titles.length;
        if (!markdown.includes(UNREVIEWED_MARKER)) notebook.reviewed += 1;
        titles.forEach((title) => recipes.push([title, doc.permalink]));
      });

      const list = [...notebooks.values()];
      const data: RecipeIndexData = {
        notebooks: list,
        recipes,
        totals: {
          pages: list.reduce((acc, n) => acc + n.pages, 0),
          reviewed: list.reduce((acc, n) => acc + n.reviewed, 0),
          recipes: list.reduce((acc, n) => acc + n.recipes, 0),
        },
      };
      actions.setGlobalData(data);
    },
  };
}
