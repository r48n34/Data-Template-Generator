export interface MsgTypes {
    type: string
    data: {
        data: Record<string, string>[]
        name: string
    }
}