import { useEffect, useState } from 'react';

const centerStyle = {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};

export function ErrorFallback({ error }) {
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (error?.message && chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
    if (error instanceof TypeError && error.message.includes('Failed to fetch dynamically imported module')) {
      setIsUpdated(true);
    }

    return () => {
      setIsUpdated(false);
    };
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const ViewUpdated = (
    <div style={centerStyle}>
      <p>The system has just been updated. Please refresh the page.</p>
      <button type='button' onClick={handleRefresh}>
        Refresh
      </button>
    </div>
  );

  const ViewError = (
    <div>
      <p>Something went wrong. It appears to be a bug. Please take a screenshot and report it.</p>
      <pre>{error?.message}</pre>
    </div>
  );

  return <div>{isUpdated ? ViewUpdated : ViewError}</div>;
}
