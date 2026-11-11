"use client";

import { trackEvent } from "../../analytics-events";
import { WINDOWS_DOWNLOAD_LABEL } from "../../download";

export default function DownloadButton({ location, className }: { location: string; className: string }) {
  return (
    <a
      href="/download"
      data-cursor
      className={className}
      onClick={() => trackEvent("download_click", { location })}
    >
      {WINDOWS_DOWNLOAD_LABEL}
    </a>
  );
}
