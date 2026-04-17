# GTM Container Checklist

This repo already emits the app-side events. The remaining work is container configuration and publish in GTM.

## App-side events already available

- `page_view`
- `lead_form_view`
- `lead_form_submit`
- `lead_form_success`
- `lead_magnet_download`
- `cta_click_call`
- `cta_click_start_here`

## Key event parameters

- `path`
- `query`
- `leadLane`
- `source`
- `campaign`
- `sourcePath`
- `leadType`
- `leadMagnet`
- `thankYouPage`
- `label`
- `href`

## Container setup

1. Create one GA4 configuration tag or connect the existing property.
2. Create one GA4 event tag per site event above.
3. Map the shared parameters into event parameters for GA4.
4. Create the Meta Pixel base tag and map the conversion events you care about.
5. Add the Clarity base tag if you want GTM to own it instead of the direct app fallback.
6. Publish the container only after Preview confirms the homepage, one lane page, one lead form submit, and the thank-you page.

## Verification loop

1. Open GTM Preview on `/`.
2. Confirm `page_view` fires with `leadLane`.
3. Submit one test lead on a lane page and confirm:
   - `lead_form_view`
   - `lead_form_submit`
   - `lead_form_success`
4. Request one lead magnet and confirm `lead_magnet_download`.
5. Check GA4 DebugView for matching events.
6. Check Meta Pixel Helper for `PageView` and mapped custom events.
7. Check Clarity for a fresh session and any rage-click signal on form surfaces.
