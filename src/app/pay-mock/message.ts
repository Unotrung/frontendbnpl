export interface MessageData {
    reason: MessageReason,
    messageTitle: string,
    message: string,
    closeMessage: string
}

export enum MessageReason {
    failSelfieScreenShot,
    failFrontIdScreenShot,
    failBackIdScreenShot,
    failOnCheckCitizenIdAndManualEnterId,
    failOnCheckSelfieAndImageIdCard,
    failOnSentOTP
}