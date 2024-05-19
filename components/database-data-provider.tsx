import React, { createContext, useContext, useState, ReactNode } from 'react'

type DatabaseData = {
    user: any
    deck: any
}

interface DataContextType {
    data: DatabaseData | null
    setData: React.Dispatch<React.SetStateAction<DatabaseData | null>>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

interface DataProviderProps {
    initialData: DatabaseData | null
    children: ReactNode
}

export const DatabaseDataProvider: React.FC<DataProviderProps> = ({ initialData, children }) => {
    const [data, setData] = useState<DatabaseData | null>(initialData)

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = (): DataContextType => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('useData must be used within a DataProvider')
    }
    return context
}
