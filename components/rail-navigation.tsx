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
        <span className="rail-brand-mark">A2</span>
        <div>
          <div className="rail-brand-title">WestLine</div>
          <div className="rail-brand-subtitle">Audit Defense</div>
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
        <div>← → / wheel</div>
        <div>presentation mode</div>
      </div>
    </aside>
  );
}
