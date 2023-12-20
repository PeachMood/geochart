import { useState } from 'react';

export default function useKey() {
  const [key] = useState<string>(new Date().getTime().toString());

  return key;
}
