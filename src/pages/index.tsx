import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Hero from '@site/src/components/Hero';
import RecipeMarquee from '@site/src/components/RecipeMarquee';
import Bookshelf from '@site/src/components/Bookshelf';
import HowItWorks from '@site/src/components/HowItWorks';
import Stats from '@site/src/components/Stats';
import Reveal from '@site/src/components/Reveal';
import useInView from '@site/src/hooks/useInView';
import clsx from 'clsx';

import styles from './index.module.css';

function Closing() {
  const {ref, inView} = useInView<HTMLElement>({threshold: 0.6});
  return (
    <section ref={ref} className={clsx(styles.closing, inView && styles.drawn)}>
      <Reveal variant="fade">
        <blockquote className={styles.quote}>
          Receita de vó não se perde,
          <br />
          se passa adiante.
          <svg viewBox="0 0 60 50" aria-hidden="true">
            <path d="M30 46 C 10 32, 2 22, 8 12 C 14 2, 26 6, 30 16 C 34 6, 46 2, 52 12 C 58 22, 50 32, 30 46 Z" />
          </svg>
        </blockquote>
      </Reveal>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero />
      <main>
        <RecipeMarquee />
        <Bookshelf />
        <HowItWorks />
        <Stats />
        <Closing />
      </main>
    </Layout>
  );
}
