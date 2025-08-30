import { BiChat, BiX } from 'react-icons/bi';

interface ChatDisabledProps {
  message?: string;
}

export default function ChatDisabled({ 
  message = 'Chat Temporarily Unavailable'
}: ChatDisabledProps) {
  return (
    <div className="chat-disabled-container">
      <div className="card border-warning border-2">
        <div className="card-body text-center p-5">
          {/* Message */}
          <h2 className="text-warning mb-4">
            {message}
          </h2>

          {/* Back to Home */}
          <div className="mt-4">
            <a 
              href="/" 
              className="btn btn-primary"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '25px',
                padding: '0.75rem 2rem'
              }}
            >
              Back to home
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-disabled-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        @media (max-width: 768px) {
          .chat-disabled-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
} 