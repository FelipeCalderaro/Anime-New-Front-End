import type { User } from "./example_types"

export interface ComplexComponentProps {
    title: string
    message?: string
    items?: User[]
    user?: User
    handleClick?: () => void
}