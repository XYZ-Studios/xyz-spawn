import React, { useState, createContext, useEffect } from 'react';
import { debugData } from '../utils/debugData';
import Sidebar from '../components/navbar';
import { MantineProvider, Transition } from '@mantine/core';
import HeroText from '../components/intro';
import { useNuiEvent } from '../hooks/useNuiEvent';

debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

const IsNew = createContext<IsNew | null>(null);

interface IsNew {
  setIsSidebarOpen: (isOpen: boolean) => void;
  isNew: boolean;
}

const App: React.FC = () => {
  const [isNew, setNew] = useState(false);

  useNuiEvent<boolean>('IsNew', (value) => {
    setNew(value);
  });

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      {isNew ? <HeroText /> : <Sidebar />}
    </MantineProvider>
  );
};

export default App;
