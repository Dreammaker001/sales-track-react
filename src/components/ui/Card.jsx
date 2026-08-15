/**
 * Kartu permukaan putih dengan radius & shadow konsisten.
 */
export default function Card({ children, className = '', ...rest }) {
  return (
    <div className={`rounded-md bg-surface shadow-card ${className}`} {...rest}>
      {children}
    </div>
  )
}
