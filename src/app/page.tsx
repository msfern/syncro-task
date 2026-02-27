import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Board from '@/features/board/components/Board';
import { BoardError } from '@/features/board/components/Error';

export default function Home() {
  return (
    <ErrorBoundary errorComponent={BoardError}>
      <Board />
    </ErrorBoundary>
  );
}
