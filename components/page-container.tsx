import { ReactNode } from 'react'


type Props = {
    children: ReactNode
}

export default function PageContainer({ children }: Props) {
    return (
        <main className="p-8">
            {children}
        </main>
    )
}