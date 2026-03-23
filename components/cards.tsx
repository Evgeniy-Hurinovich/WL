import { ReactNode } from 'react';

type MetricCardProps = {
  value: string;
  label: string;
  note?: string;
};

export function MetricCard({ value, label, note }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
      {note ? <div className="metric-note">{note}</div> : null}
    </div>
  );
}

type InsightCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
  onClick?: () => void;
  tone?: 'default' | 'highlight';
  footer?: ReactNode;
};

export function InsightCard({
  eyebrow,
  title,
  description,
  onClick,
  tone = 'default',
  footer,
}: InsightCardProps) {
  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      {...(onClick
        ? {
            type: 'button' as const,
            onClick,
          }
        : {})}
      className={`insight-card ${tone}`}
    >
      {eyebrow ? <div className="insight-eyebrow">{eyebrow}</div> : null}
      <div className="insight-title">{title}</div>
      <div className="insight-description">{description}</div>
      {footer ? <div className="insight-footer">{footer}</div> : null}
      {onClick ? <div className="insight-action">Подробнее ↗</div> : null}
    </Wrapper>
  );
}

type TagListProps = {
  items: string[];
};

export function TagList({ items }: TagListProps) {
  return (
    <div className="tag-list">
      {items.map((item) => (
        <span key={item} className="tag-pill">
          {item}
        </span>
      ))}
    </div>
  );
}
