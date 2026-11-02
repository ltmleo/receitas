import type {CSSProperties, ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import Reveal from '@site/src/components/Reveal';
import useRecipeIndex from '@site/src/hooks/useRecipeIndex';
import {NOTEBOOKS, type Notebook} from '@site/src/data/notebooks';
import type {RecipeIndexNotebook} from '@site/plugins/recipe-index';
import styles from './styles.module.css';

function DymoLabel({children}: {children: ReactNode}) {
  return <span className={styles.dymo}>{children}</span>;
}

function Book({
  notebook,
  stats,
}: {
  notebook: Notebook;
  stats?: RecipeIndexNotebook;
}) {
  const cover = useBaseUrl(notebook.cover ?? '');
  const live = Boolean(stats && notebook.cover);
  const style = {'--book-color': notebook.color} as CSSProperties;

  const body = (
    <>
      <div className={styles.book3d}>
        <div className={styles.inside}>
          {live && stats && (
            <>
              <span className={styles.insideOwner}>{notebook.owner}</span>
              <span className={styles.insideStat}>
                <strong>{stats.recipes}</strong> receitas
              </span>
              <span className={styles.insideStat}>
                <strong>{stats.pages}</strong> páginas
              </span>
              <span className={styles.insideCta}>abrir →</span>
            </>
          )}
        </div>
        <div className={styles.cover}>
          <div className={styles.coverFront}>
            {live ? (
              <img src={cover} alt="" loading="lazy" decoding="async" />
            ) : (
              <DymoLabel>{notebook.label}</DymoLabel>
            )}
          </div>
          <div className={styles.coverBack} />
        </div>
        {!live && <span className={styles.stamp}>em breve</span>}
      </div>
      <div className={styles.caption}>
        <span className={styles.owner}>{notebook.owner}</span>
        <span className={styles.kind}>
          {live && stats
            ? `${notebook.label.toLowerCase()} · ${stats.recipes} receitas`
            : 'ainda na gaveta'}
        </span>
      </div>
    </>
  );

  return live && stats ? (
    <Link
      to={stats.permalink}
      className={clsx(styles.book, styles.live)}
      style={style}
      aria-label={`${stats.title} — ${stats.recipes} receitas`}>
      {body}
    </Link>
  ) : (
    <div className={clsx(styles.book, styles.soon)} style={style}>
      {body}
    </div>
  );
}

export default function Bookshelf(): ReactNode {
  const {notebooks} = useRecipeIndex();
  useBrokenLinks().collectAnchor('estante');
  const bySlug = new Map(notebooks.map((n) => [n.slug, n]));

  return (
    <section id="estante" className={styles.section}>
      <div className="container">
        <Reveal>
          <p className={styles.eyebrow}>a estante da família</p>
          <h2 className={styles.heading}>Escolha um caderno</h2>
          <p className={styles.sub}>
            Passe o mouse para espiar por dentro. Os cadernos em cinza ainda
            estão esperando a vez de serem digitalizados.
          </p>
        </Reveal>
        <div className={styles.shelf}>
          {NOTEBOOKS.map((notebook, i) => (
            <Reveal key={notebook.owner + notebook.label} delay={i * 90} variant="tilt" className={styles.slot}>
              <Book
                notebook={notebook}
                stats={notebook.slug ? bySlug.get(notebook.slug) : undefined}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
