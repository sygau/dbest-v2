import React from 'react';

interface LastUpdatedAlertProps {
  date: string;
  className?: string;
}

const LastUpdatedAlert: React.FC<LastUpdatedAlertProps> = ({ date, className = '' }) => {
  return (
    <div className={`alert alert-border-primary alert-dismissible fade show ${className}`}>
      <div className="">
        <b>最後更新: </b>{date}
      </div>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      />
    </div>
  );
};

export default LastUpdatedAlert; 