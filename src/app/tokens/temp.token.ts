import { InjectionToken } from "@angular/core";

export const DEFAULT_TEMP: InjectionToken<number> = new InjectionToken<number>('Температура по умолчанию', {
    factory: () => 273
})
