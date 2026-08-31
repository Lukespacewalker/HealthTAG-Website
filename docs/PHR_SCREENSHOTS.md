# PHR screenshot provenance

Reviewed: 2026-08-31.

The five screenshots in `src/assets/phr/` were captured from `https://phr.healthtag.io` with BrowserOS Neo. The site owner supplied and authorized the public demonstration account for this task and confirmed that it contains synthetic data.

## Captured routes

| Asset | Product route |
| --- | --- |
| `phr-overview-redacted.png` | `/user/console/overview` |
| `phr-medications-redacted.png` | `/user/console/medications` |
| `phr-special-reports-redacted.png` | `/user/console/spacial-report` |
| `phr-hospital-connections-redacted.png` | `/user/console/datasources` |
| `phr-biological-age-redacted.png` | `/user/console/bioage` |

## Redaction

Before capture, the browser covered the full account-identity strip with an opaque panel. It also replaced the demonstration name, user identifier, phone number, email address, patient identifier, and blockchain wallet address in the page DOM. The screenshots do not publish the demonstration PIN or login URL.

The visible clinical values are synthetic demonstration data. A screenshot confirms the interface and the content shown by that account only. It does not establish a production deployment, a live hospital connection, or the behavior of every patient account.
