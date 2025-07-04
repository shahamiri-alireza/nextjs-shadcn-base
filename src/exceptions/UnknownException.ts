import { ToastOptions } from "react-hot-toast";

import {
  IExceptionOptions,
  TExceptionDetails,
} from "~/types/exceptions/exception";
import BaseException from "./BaseException";

export default class UnknownException extends BaseException {
  constructor(
    msg: string,
    details: TExceptionDetails = {},
    options?: IExceptionOptions,
    toastOptions?: ToastOptions
  ) {
    super(
      msg,
      details,
      {
        name: "UnknownException",
        sentryLogLevel: "fatal",
        ...options,
      },
      toastOptions
    );
  }
}
