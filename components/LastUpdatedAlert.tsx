import { Alert, AlertTitle, AlertDescription } from './ui/Alert';
import { LuInfo } from 'react-icons/lu';

interface LastUpdatedAlertProps {
  date: string;
  className?: string;
}

const LastUpdatedAlert: React.FC<LastUpdatedAlertProps> = ({ date, className = '' }) => {
  return (
    <Alert variant="default" className={className}>
      <AlertTitle icon={<LuInfo size={16} />}>
        最後更新
      </AlertTitle>
      <AlertDescription>{date}</AlertDescription>
    </Alert>
  );
};

export default LastUpdatedAlert; 