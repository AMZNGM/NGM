'use client'

import styles from './Loader.module.css'

export default function Loader({ size = 60, speed = 1.5, className = '' }: { size?: number; speed?: number; className?: string }) {
  const containerStyle = {
    '--uib-size': `${size}px`,
    '--uib-color': 'var(--color-text)',
    '--uib-speed': `${speed}s`,
    '--uib-dot-size': `calc(var(--uib-size) * 0.1)`,
  } as React.CSSProperties

  return (
    <div className={`${styles.container} ${className}`} style={containerStyle}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  )
}
