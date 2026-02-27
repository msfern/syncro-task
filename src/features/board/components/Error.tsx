'use client';

export const BoardError = ({ error }: { error: Error }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-bold text-2xl">
        Something went wrong with the board
      </h1>
      <p className="text-gray-500 text-sm">Error: {error.message}</p>
      <button
        onClick={() => {
          window.location.reload();
        }}
        type="button"
      >
        Reload
      </button>
    </div>
  );
};

export default BoardError;
