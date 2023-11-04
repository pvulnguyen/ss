import Link from 'next/link';
import styles from './url.module.css';

export function Url({label, to}: {label: string; to: string}) {
  return <Link href={to} className={styles.link}>{label}</Link>;
}
