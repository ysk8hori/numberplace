import React from 'react';

export default function Cell({ answer }: { answer?: string }) {
  return (
    <div className="box-border border-solid border aspect-square flex justify-center items-center">
      {answer}
    </div>
  );
}
