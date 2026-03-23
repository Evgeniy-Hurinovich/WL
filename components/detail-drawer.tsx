'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { DrillItem } from '@/lib/audit-content';

type DetailDrawerProps = {
  item: DrillItem | null;
  onClose: () => void;
};

export function DetailDrawer({ item, onClose }: DetailDrawerProps) {
  return (
    <AnimatePresence>
      {item ? (
        <>
          <motion.button
            type="button"
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Закрыть детализацию"
          />
          <motion.aside
            className="detail-drawer"
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="drawer-header">
              <div>
                <div className="drawer-eyebrow">{item.eyebrow}</div>
                <h2 className="drawer-title">{item.title}</h2>
              </div>
              <button type="button" className="drawer-close" onClick={onClose}>
                ✕
              </button>
            </div>

            <p className="drawer-summary">{item.summary}</p>

            <div className="drawer-blocks">
              {item.blocks.map((block) => (
                <div key={block.title} className="drawer-block">
                  <h3>{block.title}</h3>
                  <p>{block.text}</p>
                  {block.bullets?.length ? (
                    <ul>
                      {block.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
