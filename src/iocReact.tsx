import React, {ReactNode, useContext} from 'react';
import {Container, interfaces} from 'inversify';

const InversifyContext = React.createContext<{ container: Container | null }>({container: null});

export const InversifyProvider = ({container, children}: { container: Container, children: ReactNode }) => {
    return (
        <InversifyContext.Provider value={{container}}>
            {children}
        </InversifyContext.Provider>
    )
}

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
    const { container } = useContext(InversifyContext);
    if (!container) { throw new Error(); }
    return container.get<T>(identifier);
};
