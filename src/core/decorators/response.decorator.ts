import { SetMetadata } from '@nestjs/common';

export const SKIP_RESP_WRAP_KEY = 'skipResponseWrap';
export const SUCCESS_RESP_MSG_KEY = 'successMessage';

export const SkipResponseWrap = () => SetMetadata(SKIP_RESP_WRAP_KEY, true);
export const SuccessResponseMsg = (message: string) => SetMetadata(SUCCESS_RESP_MSG_KEY, message);
