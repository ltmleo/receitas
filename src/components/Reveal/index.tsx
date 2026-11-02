import {useEffect, type CSSProperties, type ReactNode} from 'react';
import clsx from 'clsx';
import useInView from '@site/src/hooks/useInView';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  variant?: 'up' | 'fade' | 'tilt';
};

/**
 * Scroll-triggered entrance animation.
 * Content is only hidden once JS has hydrated (data-reveal-ready on <html>),
 * so no-JS / SSR output is always fully visible.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  variant = 'up',
}: Props) {
  const {ref, inView} = useInView<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-reveal-ready', '');
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(styles.reveal, styles[variant], inView && styles.visible, className)}
      style={{'--reveal-delay': `${delay}ms`} as CSSProperties}>
      {children}
    </div>
  );
}
