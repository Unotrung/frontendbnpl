export interface MessageData {
    reason: MessageReason,
    message: string
}

export enum MessageReason {
    failSelfieScreenShot,
    failFrontIdScreenShot,
    failBackIdScreenShot
}