import { useNavigate } from 'react-router-dom';
import { StateMessage } from '@/components/feedback/StateMessage';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
      <StateMessage
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
        action={{ label: 'Back to home', onClick: () => navigate('/') }}
      />
    </div>
  );
}
