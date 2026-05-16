import { useMemo } from 'react';
import { PROB_CONFIG, TIER_ORDER, type ProbLevel } from './constants';
import type { CalculateResponse, ProgrammeResult } from '../../lib/jupas/client/apiTypes';

interface TierStatsGridProps {
  results: ProgrammeResult[];
}

export function TierStatsGrid({ results }: TierStatsGridProps) {
  // Calculate counts for each tier
  const tierCounts = useMemo(() => {
    const counts: Record<ProbLevel, number> = {
      highchance: 0,
      comp: 0,
      bord: 0,
      low: 0,
      unmet: 0,
    };

    for (const r of results) {
      const tier = r.tierKey as ProbLevel;
      if (tier in counts) {
        counts[tier]++;
      }
    }
    return counts;
  }, [results]);

  const tiers: ProbLevel[] = ['highchance', 'comp', 'bord', 'low', 'unmet'];

  return (
    <div className="jpd-tier-stats-container">
      {tiers.map(tier => {
        const config = PROB_CONFIG[tier];
        const count = tierCounts[tier];
        return (
          <div key={tier} className="jpd-tier-stat-card">
            <div className={`jpd-tier-stat-box ${config.className}`}>
              <span className="jpd-tier-stat-label">{config.label}</span>
            </div>
            <div className="jpd-tier-stat-count">{count}</div>
          </div>
        );
      })}
    </div>
  );
}
