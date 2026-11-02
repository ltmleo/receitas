import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useRecipeIndex from '@site/src/hooks/useRecipeIndex';
import styles from './styles.module.css';

function Pot() {
  return (
    <svg
      className={styles.pot}
      viewBox="0 0 260 240"
      aria-hidden="true"
      focusable="false">
      <g className={styles.steamGroup}>
        <path className={styles.steam} d="M95 92 C 80 76, 110 64, 95 46 C 82 30, 106 20, 96 4" />
        <path className={styles.steam} d="M130 88 C 115 72, 145 60, 130 42 C 117 26, 141 16, 131 0" />
        <path className={styles.steam} d="M165 92 C 150 76, 180 64, 165 46 C 152 30, 176 20, 166 4" />
      </g>
      <g className={styles.lid}>
        <ellipse cx="130" cy="112" rx="92" ry="12" />
        <rect x="118" y="94" width="24" height="10" rx="5" />
      </g>
      <path
        className={styles.potBody}
        d="M42 122 H218 V188 C218 212 200 226 176 226 H84 C60 226 42 212 42 188 Z"
      />
      <path className={styles.potHandle} d="M42 140 C 20 140, 20 168, 42 168" />
      <path className={styles.potHandle} d="M218 140 C 240 140, 240 168, 218 168" />
      <path className={styles.potStripe} d="M42 150 H218" />
      <path className={styles.heart} d="M130 196 c -6 -8 -18 -4 -14 6 c 3 6 14 12 14 12 s 11 -6 14 -12 c 4 -10 -8 -14 -14 -6 z" />
    </svg>
  );
}

const DOODLES = [
  // whisk
  'M12 2 C 6 8, 6 16, 12 22 C 18 16, 18 8, 12 2 Z M12 2 V 30 M9 6 C 8 12, 10 18, 12 22 M15 6 C 16 12, 14 18, 12 22',
  // wheat
  'M12 30 V 4 M12 8 C 6 6, 6 2, 6 2 C 10 2, 12 6, 12 8 M12 8 C 18 6, 18 2, 18 2 C 14 2, 12 6, 12 8 M12 15 C 6 13, 6 9, 6 9 C 10 9, 12 13, 12 15 M12 15 C 18 13, 18 9, 18 9 C 14 9, 12 13, 12 15',
  // spoon
  'M12 2 C 6 2, 5 12, 12 13 C 19 12, 18 2, 12 2 Z M12 13 V 30',
  // egg
  'M12 3 C 5 3, 3 18, 5 23 C 7 29, 17 29, 19 23 C 21 18, 19 3, 12 3 Z',
  // star / sparkle
  'M12 4 L 14 11 L 21 13 L 14 15 L 12 22 L 10 15 L 3 13 L 10 11 Z',
  // heart
  'M12 26 C 4 19, 2 13, 5 9 C 8 5, 12 8, 12 11 C 12 8, 16 5, 19 9 C 22 13, 20 19, 12 26 Z',
];

function Doodles() {
  return (
    <div className={styles.doodles} aria-hidden="true">
      {DOODLES.map((d, i) => (
        <svg key={i} className={clsx(styles.doodle, styles[`d${i}`])} viewBox="0 0 24 32">
          <path d={d} />
        </svg>
      ))}
    </div>
  );
}

function SurpriseButton(): ReactNode {
  const {recipes} = useRecipeIndex();
  const history = useHistory();
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    if (rolling || recipes.length === 0) return;
    setRolling(true);
    const [, permalink] = recipes[Math.floor(Math.random() * recipes.length)];
    window.setTimeout(() => history.push(permalink), 650);
  };

  return (
    <button
      type="button"
      onClick={roll}
      className={clsx(styles.btn, styles.btnGhost, rolling && styles.rolling)}>
      <span className={styles.dice} aria-hidden="true">
        🎲
      </span>
      Me surpreenda
    </button>
  );
}

export default function Hero(): ReactNode {
  const {totals} = useRecipeIndex();
  return (
    <header className={styles.hero}>
      <Doodles />
      <div className={clsx('container', styles.inner)}>
        <div className={styles.copy}>
          <p className={styles.kicker}>do caderno da vó para a sua cozinha</p>
          <h1 className={styles.title}>
            Receitas de{' '}
            <span className={styles.highlight}>
              família
              <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 16 C 60 6, 120 4, 170 10 S 260 20, 296 8" />
              </svg>
            </span>
          </h1>
          <p className={styles.lead}>
            Cadernos de receitas escritos à mão, escaneados página por página e
            transcritos com Inteligência Artificial — para que nenhum sabor se
            perca com o tempo.
          </p>
          <div className={styles.actions}>
            <Link to="#estante" className={clsx(styles.btn, styles.btnPrimary)}>
              Abrir os cadernos
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
            <SurpriseButton />
          </div>
          <p className={styles.note}>
            <svg viewBox="0 0 60 40" aria-hidden="true">
              <path d="M54 34 C 38 36, 14 30, 10 8 M10 8 L 4 17 M10 8 L 17 14" />
            </svg>
            {totals.recipes} receitas em {totals.pages} páginas!
          </p>
        </div>
        <div className={styles.art}>
          <Pot />
        </div>
      </div>
    </header>
  );
}
