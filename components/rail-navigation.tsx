'use client';

type RailNavigationProps = {
  items: { id: string; railLabel: string; eyebrow: string }[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function RailNavigation({ items, activeIndex, onSelect }: RailNavigationProps) {
  return (
    <aside className="rail-nav" aria-label="Навигация по разделам">
      <div className="rail-brand">
        <a
          className="rail-brand-mark rail-brand-link"
          href="https://a2c.by/"
          target="_blank"
          rel="noreferrer"
          aria-label="Перейти на сайт A2 Consulting"
        >
          A2
        </a>
        <div>
          <a className="rail-brand-title rail-brand-link" href="https://wline.by/" target="_blank" rel="noreferrer">
            WestLine
          </a>
          <div className="rail-brand-subtitle">Защита аудита</div>
        </div>
      </div>

      <div className="rail-items">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              type="button"
              className={`rail-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(index)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="rail-index">{item.railLabel}</span>
              <span className="rail-label">{item.eyebrow}</span>
            </button>
          );
        })}
      </div>

      <div className="rail-footer">
        <div>← → / колесо</div>
        <div>режим презентации</div>
      </div>
    </aside>
  );
}
