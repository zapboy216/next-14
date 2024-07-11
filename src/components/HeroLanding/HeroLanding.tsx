import React, { ReactNode } from 'react';
import styles from './HeroLanding.module.css';

interface HeroLandingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const HeroLanding: React.FC<HeroLandingProps> = ({ title, subtitle, children }) => {
  return (
    <div className={styles.heroLanding}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
        {children}
      </div>
    </div>
  );
};

export default HeroLanding;
