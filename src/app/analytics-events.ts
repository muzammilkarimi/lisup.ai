"use client";

import { sendGAEvent } from "@next/third-parties/google";

type AnalyticsValue = string | number | boolean;

export function trackEvent(eventName: string, params: Record<string, AnalyticsValue> = {}) {
  sendGAEvent("event", eventName, params);
}
