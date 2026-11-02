import {useMemo, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useRecipeIndex from '@site/src/hooks/useRecipeIndex';
import styles from './styles.module.css';

const PER_ROW = 18;

/** Deterministic sample (SSR-safe: identical on server and client). */
function sample<T>(list: T[], count: number, offset: number): T[] {
  if (list.length === 0) return [];
  const step = Math.max(1, Math.floor(list.length / count));
  return Array.from({length: Math.min(count, list.length)}, (_, i) =>
    list[(offset + i * step) % list.length],
  );
}

function Row({items, reverse}: {items: [string, string][]; reverse?: boolean}) {
  // Content is duplicated so the -50% translate loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className={styles.row}>
      <ul className={clsx(styles.track, reverse && styles.reverse)}>
        {loop.map(([title, permalink], i) => (
          <li key={i} aria-hidden={i >= items.length || undefined}>
            <Link
              to={permalink}
              tabIndex={i >= items.length ? -1 : undefined}
              className={styles.item}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RecipeMarquee(): ReactNode {
  const {recipes} = useRecipeIndex();
  const [top, bottom] = useMemo(
    () => [sample(recipes, PER_ROW, 0), sample(recipes, PER_ROW, 7)],
    [recipes],
  );
  if (recipes.length === 0) return null;

  return (
    <section className={styles.marquee} aria-label="Algumas receitas dos cadernos">
      <Row items={top} />
      <Row items={bottom} reverse />
    </section>
  );
}
