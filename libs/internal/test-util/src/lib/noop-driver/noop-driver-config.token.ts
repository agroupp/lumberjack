import { inject, InjectionToken } from '@angular/core';

import { LogDriverConfig, LogDriverConfigToken } from '@ngworker/lumberjack';

export const NoopDriverConfigToken = new InjectionToken<LogDriverConfig>('No-op driver config', {
  factory: () => inject(LogDriverConfigToken),
});