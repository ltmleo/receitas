/**
 * Shelf configuration. Notebooks with `slug` are live (stats come from the
 * build-time recipe index); notebooks without it are shown as "em breve".
 */
export type Notebook = {
  owner: string;
  label: string;
  color: string;
  slug?: string;
  cover?: string;
};

export const NOTEBOOKS: Notebook[] = [
  {
    owner: 'Vó Elisa',
    label: 'DOCES',
    color: '#1f8a8f',
    slug: 'doces-vo-elisa',
    cover: '/img/covers/doces-vo-elisa.webp',
  },
  {
    owner: 'Vó Elisa',
    label: 'SALGADOS',
    color: '#e5343f',
    slug: 'salgados-vo-elisa',
    cover: '/img/covers/salgados-vo-elisa.webp',
  },
  {owner: 'Vó Cida', label: 'RECEITAS', color: '#b0884a'},
  {owner: 'Bisavó Cidona', label: 'RECEITAS', color: '#6f7f5a'},
  {owner: 'Bisavó Romilda', label: 'RECEITAS', color: '#5d6f8c'},
  {owner: 'Bisavó Gera', label: 'RECEITAS', color: '#8a5a6e'},
];
