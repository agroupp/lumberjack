import { Inject, Injectable } from '@angular/core';

import { lumberjackConfigToken } from '../configuration/lumberjack-config.token';
import { LumberjackConfig } from '../configuration/lumberjack.config';
import { LumberjackLevel } from '../logs/lumberjack-level';
import { LumberjackLog } from '../logs/lumberjack.log';
import { LumberjackTimeService } from '../time/lumberjack-time.service';

import { lumberjackFormatLog } from './lumberjack-format-log';
import { LumberjackLogFormatterResult } from './lumberjack-log-formatter-result';

@Injectable({
  providedIn: 'root',
})
export class LumberjackLogFormatter {
  constructor(@Inject(lumberjackConfigToken) private config: LumberjackConfig, private time: LumberjackTimeService) {}

  formatLog(log: LumberjackLog): LumberjackLogFormatterResult {
    const { format } = this.config;
    let result: LumberjackLogFormatterResult;

    try {
      result = {
        log,
        formattedLog: format(log),
      };
    } catch (formattingError) {
      const formattingErrorLog = this.createFormattingErrorLog(formattingError, log);
      const formattedFormattingError = this.formatFormattingError(formattingErrorLog);

      result = {
        log: formattingErrorLog,
        formattedLog: formattedFormattingError,
      };
    }

    return result;
  }

  private createFormattingErrorLog(formatError: unknown, log: LumberjackLog): LumberjackLog {
    const formattingErrorMessage = (formatError as Error).message || String(formatError);

    return {
      context: 'LumberjackLogFormattingError',
      createdAt: this.time.getUnixEpochTicks(),
      level: LumberjackLevel.Error,
      message: `Could not format message "${log.message}". Error: "${formattingErrorMessage}"`,
    };
  }

  private formatFormattingError(errorEntry: LumberjackLog): string {
    const { format } = this.config;
    let errorMessage = '';

    try {
      errorMessage = format(errorEntry);
    } catch {
      errorMessage = lumberjackFormatLog(errorEntry);
    }

    return errorMessage;
  }
}