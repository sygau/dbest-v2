import { LuInfo, LuTriangleAlert } from 'react-icons/lu';
import { Alert, AlertDescription, AlertTitle } from '../ui/Alert';
import { dailyQuotaFor, type Subject } from '../../lib/grader/constants';

interface Props { remaining: number; subject: Subject }

export default function QuotaBanner({ remaining, subject }: Props) {
  const total = dailyQuotaFor(subject);
  const variant = remaining === 0 ? 'destructive' : remaining === 1 ? 'warning' : 'success';
  const icon = remaining === 0 ? <LuTriangleAlert size={14} /> : <LuInfo size={14} />;

  return (
    <Alert variant={variant} style={{ marginBottom: 12 }}>
      <AlertTitle icon={icon}>
        {remaining > 0 ? `今日剩餘 ${remaining}/${total} 次免費批改` : '今日批改次數已用完'}
      </AlertTitle>
      <AlertDescription style={{ fontSize: 11.5, opacity: .85 }}>
        每日 UTC 0:00（香港時間早上 8 點）重置
      </AlertDescription>
    </Alert>
  );
}
