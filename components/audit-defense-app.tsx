'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DetailDrawer } from '@/components/detail-drawer';
import { InsightCard, MetricCard, TagList } from '@/components/cards';
import { RailNavigation } from '@/components/rail-navigation';
import { SectionFrame } from '@/components/section-frame';
import {
  introDrillItems,
  landscapeDrillItems,
  nextStepCards,
  processCards,
  recommendationMatrix,
  riskCards,
  riskMatrix,
  rootCauseCards,
  scenes,
  systemNodes,
  toBeCards,
  type DrillItem,
} from '@/lib/audit-content';

const TRANSITION = { duration: 0.65, ease: [0.22, 1, 0.36, 1] } as const;

export function AuditDefenseApp() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerItem, setDrawerItem] = useState<DrillItem | null>(null);
  const wheelLockRef = useRef(false);

  const clampIndex = useCallback((index: number) => Math.max(0, Math.min(index, scenes.length - 1)), []);

  const goTo = useCallback(
    (nextIndex: number) => {
      setDrawerItem(null);
      setActiveIndex(clampIndex(nextIndex));
    },
    [clampIndex],
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      goTo(activeIndex + direction);
    },
    [activeIndex, goTo],
  );

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 20 || wheelLockRef.current || drawerItem) return;

      wheelLockRef.current = true;
      step(event.deltaY > 0 ? 1 : -1);

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 850);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (drawerItem && event.key === 'Escape') {
        setDrawerItem(null);
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        step(1);
      }

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        step(-1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [drawerItem, step]);

  const activeScene = useMemo(() => scenes[activeIndex], [activeIndex]);

  return (
    <main className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <RailNavigation items={scenes} activeIndex={activeIndex} onSelect={goTo} />

      <div className="viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={TRANSITION}
            className={`scene-stage ${
              activeScene.id === 'intro'
                ? 'scene-stage-intro'
                : activeScene.id === 'process'
                  ? 'scene-stage-process'
                  : activeScene.id === 'landscape'
                    ? 'scene-stage-landscape'
                    : activeScene.id === 'roots'
                      ? 'scene-stage-roots'
                      : activeScene.id === 'tobe'
                        ? 'scene-stage-tobe'
                        : activeScene.id === 'risks'
                          ? 'scene-stage-risks'
                          : activeScene.id === 'next'
                            ? 'scene-stage-next'
                    : ''
            }`}
          >
            {activeScene.id === 'intro' ? <IntroScene onOpen={setDrawerItem} /> : null}
            {activeScene.id === 'process' ? <ProcessScene onOpen={setDrawerItem} /> : null}
            {activeScene.id === 'landscape' ? <LandscapeScene onOpen={setDrawerItem} /> : null}
            {activeScene.id === 'roots' ? <RootCauseScene onOpen={setDrawerItem} /> : null}
            {activeScene.id === 'risks' ? <RisksScene onOpen={setDrawerItem} /> : null}
            {activeScene.id === 'tobe' ? <ToBeScene onOpen={setDrawerItem} /> : null}
            {activeScene.id === 'next' ? <NextStepScene onOpen={setDrawerItem} /> : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="scene-progress">
        <span>{String(activeIndex + 1).padStart(2, '0')}</span>
        <div className="scene-progress-bar">
          <div
            className="scene-progress-fill"
            style={{ width: `${((activeIndex + 1) / scenes.length) * 100}%` }}
          />
        </div>
        <span>{String(scenes.length).padStart(2, '0')}</span>
      </div>

      <DetailDrawer item={drawerItem} onClose={() => setDrawerItem(null)} />
    </main>
  );
}

type SceneProps = {
  onOpen: (item: DrillItem) => void;
};

function IntroScene({ onOpen }: SceneProps) {
  return (
    <SectionFrame eyebrow={scenes[0].eyebrow} title={scenes[0].title} summary={scenes[0].summary} accent="gold">
      <div className="intro-grid">
        <div className="hero-panel premium-panel">
          <div className="hero-badge">A2 Consulting × WestLine</div>
          <h2 className="hero-statement">
            От данных — к уверенности.<br />
            От AS-IS — к целевой архитектуре.
          </h2>
          <p className="hero-copy">
            Бизнес WestLine уже опирается на сквозной процесс закупок и ценообразования. Следующий шаг — перевод его на
            единую управляемую платформу, где инструменты работают как целостный контур, а не как набор разрозненных
            файлов.
          </p>
          <TagList
            items={[
              'От Excel‑центричной модели',
              'К единой управляемой платформе',
              'Сквозной контроль закупок и цен',
              'Снижение операционных рисков',
            ]}
          />
        </div>

        <div className="metric-grid">
          <MetricCard value="7" label="ключевых процессов в единой цепочке" />
          <MetricCard value=">20" label="китайских поставщиков в месячном цикле" />
          <MetricCard value="6" label="закупщиков в сквозном контуре заказа" />
          <MetricCard value="5–6 мес." label="длина критичного цикла поставки" />
        </div>

        <div className="two-column-block">
          {introDrillItems.map((item) => (
            <InsightCard
              key={item.id}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.summary}
              onClick={() => onOpen(item)}
              tone={item.id === 'message' ? 'highlight' : 'default'}
            />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function ProcessScene({ onOpen }: SceneProps) {
  return (
    <SectionFrame eyebrow={scenes[1].eyebrow} title={scenes[1].title} summary={scenes[1].summary} accent="blue">
      <div className="process-scene">
        <div className="process-flow-bar">
          {processCards.map((item, index) => (
            <div key={item.id} className="flow-step">
              <div className="flow-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="flow-name">{item.label}</div>
              {index < processCards.length - 1 ? <div className="flow-link" /> : null}
            </div>
          ))}
        </div>

        <div className="card-grid card-grid-7">
          {processCards.map((item) => (
            <InsightCard
              key={item.id}
              eyebrow={item.eyebrow}
              title={item.label}
              description={item.summary}
              onClick={() => onOpen(item)}
            />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function LandscapeScene({ onOpen }: SceneProps) {
  return (
    <SectionFrame eyebrow={scenes[2].eyebrow} title={scenes[2].title} summary={scenes[2].summary} accent="gold">
      <div className="landscape-grid">
        <div className="network-panel premium-panel">
          <div className="network-core">
            <div className="network-core-ring" />
            <div className="network-core-label">
              <span>Ядро Excel</span>
              <strong>«Все заказы»</strong>
            </div>
          </div>

          <div className="network-orbit">
            {systemNodes.map((node) => (
              <div key={node} className="system-node">
                {node}
              </div>
            ))}
          </div>
        </div>

        <div className="stacked-column">
          {landscapeDrillItems.map((item) => (
            <InsightCard
              key={item.id}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.summary}
              onClick={() => onOpen(item)}
            />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function RootCauseScene({ onOpen }: SceneProps) {
  return (
    <SectionFrame eyebrow={scenes[3].eyebrow} title={scenes[3].title} summary={scenes[3].summary} accent="blue">
      <div className="roots-grid">
        <div className="card-grid">
          {rootCauseCards.map((item) => (
            <InsightCard
              key={item.id}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.summary}
              onClick={() => onOpen(item)}
            />
          ))}
        </div>

        <div className="matrix-panel premium-panel">
          <div className="panel-title">Проблема → Рекомендация → Тип решения</div>
          <div className="matrix-table">
            {recommendationMatrix.map(([problem, recommendation, type]) => (
              <div key={problem} className="matrix-row">
                <div>{problem}</div>
                <div>{recommendation}</div>
                <div>{type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function RisksScene({ onOpen }: SceneProps) {
  return (
    <SectionFrame eyebrow={scenes[4].eyebrow} title={scenes[4].title} summary={scenes[4].summary} accent="gold">
      <div className="risk-grid">
        <div className="card-grid">
          {riskCards.map((item) => (
            <InsightCard
              key={item.id}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.summary}
              onClick={() => onOpen(item)}
              tone={item.id === 'margin-risk' ? 'highlight' : 'default'}
            />
          ))}
        </div>

        <div className="matrix-panel premium-panel">
          <div className="panel-title">Сводка тепловой карты</div>
          <div className="risk-table">
            {riskMatrix.map(([risk, impact, probability]) => (
              <div key={risk} className="matrix-row">
                <div>{risk}</div>
                <div>{impact}</div>
                <div>{probability}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function ToBeScene({ onOpen }: SceneProps) {
  return (
    <SectionFrame eyebrow={scenes[5].eyebrow} title={scenes[5].title} summary={scenes[5].summary} accent="blue">
      <div className="tobe-grid">
        <div className="architecture-panel premium-panel">
          <div className="architecture-column">
            <div className="arch-label">Основа</div>
            <div className="arch-box">Единый слой master data</div>
            <div className="arch-box">Разделение данных: Raw / Calc / Output</div>
          </div>
          <div className="architecture-column">
            <div className="arch-label">Процессы</div>
            <div className="arch-box">Согласования и статусы жизненного цикла</div>
            <div className="arch-box">Автоматический pre-check</div>
          </div>
          <div className="architecture-column">
            <div className="arch-label">Аналитика</div>
            <div className="arch-box">Автопрогноз + исключения</div>
            <div className="arch-box">Карточка ценового решения и отчёт по ошибкам</div>
          </div>
        </div>

        <div className="card-grid">
          {toBeCards.map((item) => (
            <InsightCard
              key={item.id}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.summary}
              onClick={() => onOpen(item)}
            />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

function NextStepScene({ onOpen }: SceneProps) {
  return (
    <SectionFrame eyebrow={scenes[6].eyebrow} title={scenes[6].title} summary={scenes[6].summary} accent="gold">
      <div className="next-grid">
        <div className="card-grid card-grid-4">
          {nextStepCards.map((item) => (
            <InsightCard
              key={item.id}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.summary}
              onClick={() => onOpen(item)}
              tone={item.id === 'step-3' ? 'highlight' : 'default'}
            />
          ))}
        </div>

        <div className="premium-panel close-panel">
          <div className="panel-title">Как завершить встречу</div>
          <blockquote>
            Мы не предлагаем WestLine «еще один инструмент». Мы предлагаем следующий уровень управляемости: от
            операционной модели, завязанной на Excel, — к целевой платформе принятия и исполнения решений.
          </blockquote>
          <TagList
            items={[
              'TO-BE design',
              'Целевая архитектура',
              'Формат пилота',
              'Дорожная карта и экономика',
            ]}
          />
        </div>
      </div>
    </SectionFrame>
  );
}
