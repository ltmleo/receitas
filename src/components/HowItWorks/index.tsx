import type {ReactNode} from 'react';
import Reveal from '@site/src/components/Reveal';
import styles from './styles.module.css';

type Step = {title: string; text: string; icon: ReactNode};

const STEPS: Step[] = [
  {
    title: 'O caderno',
    text: 'Anos de receitas anotadas à mão, com manchas de massa e dicas nas margens.',
    icon: (
      <path d="M10 8 h22 a4 4 0 0 1 4 4 v30 h-22 a4 4 0 0 1 -4 -4 z M14 8 v34 M18 16 h12 M18 22 h12 M18 28 h8" />
    ),
  },
  {
    title: 'A foto',
    text: 'Cada página é escaneada com cuidado para preservar o original.',
    icon: (
      <path d="M6 16 h8 l4 -5 h12 l4 5 h8 v24 h-36 z M24 21 a7 7 0 1 0 0.01 0 M36 20 h2" />
    ),
  },
  {
    title: 'A IA lê',
    text: 'Um modelo de IA transcreve a letra cursiva para texto, com títulos e listas.',
    icon: (
      <path d="M24 6 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3 z M37 30 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5 z M10 32 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1 z" />
    ),
  },
  {
    title: 'A família revisa',
    text: 'Quem conhece a receita corrige o que a IA errou. Toda ajuda é bem-vinda!',
    icon: (
      <path d="M24 40 C 10 30, 6 22, 10 16 C 14 10, 22 12, 24 18 C 26 12, 34 10, 38 16 C 42 22, 38 30, 24 40 Z" />
    ),
  },
];

export default function HowItWorks(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <p className={styles.eyebrow}>do papel para a tela</p>
          <h2 className={styles.heading}>Como as receitas chegam aqui</h2>
        </Reveal>
        <div className={styles.stepsWrap}>
          <svg className={styles.trail} viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
            <path d="M40 20 C 200 -10, 300 50, 500 20 S 800 -10, 960 20" />
          </svg>
          <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 160} className={styles.step}>
                <span className={styles.badge}>
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    {step.icon}
                  </svg>
                  <span className={styles.num}>{i + 1}</span>
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
