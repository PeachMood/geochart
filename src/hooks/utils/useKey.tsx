import { useState } from 'react';

export default function useKey(): string {
  const [key] = useState<string>(new Date().getTime().toString());

  return key;
}
