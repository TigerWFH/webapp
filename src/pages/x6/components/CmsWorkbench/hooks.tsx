import { useState } from 'react';

export function useConfigState(): any[] {
  const [name, setName] = useState('default');

  return [name, setName];
}
