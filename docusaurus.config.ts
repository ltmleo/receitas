import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Minhas Receitas de família',
  tagline: 'Receitas escaneadas de cadernos de receitas de família e digitalizadas utilizando Inteligência Artificial',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ltmleo.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/receitas',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ltmleo', // Usually your GitHub org/user name.
  projectName: 'receitas', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br'],
  },
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&display=swap',
      type: 'text/css',
    },
  ],
  headTags: [
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
    {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}},
  ],
  plugins: ['./plugins/recipe-index.ts'],
  themes: [
      [
        require.resolve("@easyops-cn/docusaurus-search-local"),
        /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
        ({
          hashed: true,
          docsRouteBasePath: ["/"],
          docsDir: ["receitas"],
          indexBlog: false,
          language: ["pt", "en"],
        }),
      ],
  ],
  presets: [
    [
      'classic',
      {
        gtag: {
          trackingID: 'G-714QFE3V9G',
          anonymizeIP: true,
        },
        blog: false,
        docs: {
          sidebarPath: './sidebars.ts',
          path: './receitas',
          routeBasePath: '/',
          editUrl: 'https://github.com/ltmleo/receitas/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: '@site/static/img/social-card.png',
    navbar: {
      title: 'Receitas',
      logo: {
        alt: 'Receitas Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Cadernos',
          position: 'left',
          items: [
            {label: 'Doces · Vó Elisa', to: '/receitas/doces-vo-elisa'},
            {label: 'Salgados · Vó Elisa', to: '/receitas/salgados-vo-elisa'},
          ],
        },
        {
          href: 'https://ltmleo.github.io/blog/',
          label: '@ltmleo',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Receitas',
          items: [
            {
              label: 'Doces · Vó Elisa',
              to: '/receitas/doces-vo-elisa',
            },
            {
              label: 'Salgados · Vó Elisa',
              to: '/receitas/salgados-vo-elisa',
            },
          ],
        },
        {
          title: 'Info',
          items: [
            {
              label: 'Saiba mais sobre esse projeto',
              href: 'https://ltmleo.github.io/blog/projects/receitas/',
            },
            {
              label: 'Leia meu blog',
              href: 'https://ltmleo.github.io/blog/blog',
            },
          ],
        },
        {
          title: 'Colabore',
          items: [
            {
              label: 'Sugerir uma correção',
              href: 'https://github.com/ltmleo/receitas',
            },
          ],
        },
      ],
      copyright: `Receita de vó não se perde, se passa adiante. © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
