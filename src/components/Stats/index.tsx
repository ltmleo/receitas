import {useEffect, useState, type CSSProperties, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useInView from '@site/src/hooks/useInView';
import useRecipeIndex from '@site/src/hooks/useRecipeIndex';
import {NOTEBOOKS} from '@site/src/data/notebooks';
import styles from './styles.module.css';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Eased count-up; SSR renders the final value so the number is never wrong. */
function CountUp({value, start}: {value: number; start: boolean}) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!start || prefersReducedMotion()) {
      setDisplay(value);
      return undefined;
    }
    let frame = 0;
    const duration = 1600;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    setDisplay(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return <>{display}</>;
}

export default function Stats(): ReactNode {
  const {totals, notebooks} = useRecipeIndex();
  const {ref, inView} = useInView<HTMLElement>({threshold: 0.3});
  const reviewedPct = totals.pages ? Math.round((totals.reviewed / totals.pages) * 100) : 0;

  const items = [
    {value: notebooks.length, total: NOTEBOOKS.length, label: 'cadernos digitalizados'},
    {value: totals.pages, label: 'páginas escaneadas'},
    {value: totals.recipes, label: 'receitas transcritas'},
  ];

  return (
    <section ref={ref} className={clsx(styles.section, inView && styles.in)}>
      <div className="container">
        <div className={styles.grid}>
          {items.map((item, i) => (
            <div
              key={item.label}
              className={styles.card}
              style={{'--i': i} as CSSProperties}>
              <span className={styles.value}>
                <CountUp value={item.value} start={inView} />
                {item.total && <small>/{item.total}</small>}
              </span>
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.progress}>
          <div className={styles.bar}>
            <span>Transcritas pela IA</span>
            <div className={styles.track}>
              <div className={styles.fill} style={{'--pct': '100%'} as CSSProperties} />
            </div>
            <strong>100%</strong>
          </div>
          <div className={styles.bar}>
            <span>Revisadas pela família</span>
            <div className={styles.track}>
              <div
                className={clsx(styles.fill, styles.fillReview)}
                style={{'--pct': `${reviewedPct}%`} as CSSProperties}
              />
            </div>
            <strong>{reviewedPct}%</strong>
          </div>
          <p className={styles.help}>
            A IA às vezes se confunde com a letra da vó. Encontrou algo estranho?
            Em cada página há um link <em>“Editar essa página”</em> — compare com
            a foto original e{' '}
            <Link href="https://github.com/ltmleo/receitas">mande sua correção</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
