import { ReactNode } from 'react';

type SectionFrameProps = {
  eyebrow: string;
  title: string;
  summary: string;
  accent?: 'gold' | 'blue';
  children: ReactNode;
};

export function SectionFrame({ eyebrow, title, summary, accent = 'gold', children }: SectionFrameProps) {
  return (
    <section className="scene-shell">
      <div className="scene-header">
        <div className={`scene-eyebrow ${accent}`}>{eyebrow}</div>
        <h1 className="scene-title">{title}</h1>
        {summary.trim() ? <p className="scene-summary">{summary}</p> : null}
      </div>
      <div className="scene-content">{children}</div>
    </section>
  );
}
