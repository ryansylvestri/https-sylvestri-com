# Lead Autoresponder Sequences

The site now sends a deterministic `plan` object to `LEAD_AUTORESPONDER_WEBHOOK_URL` for every valid lead.

## Webhook payload additions

- `plan.sequenceKey`
- `plan.sequenceLabel`
- `plan.leadTypeLabel`
- `plan.deliveryWindow`
- `plan.primaryCta`
- `plan.email.subject`
- `plan.email.previewText`
- `plan.email.intro`
- `plan.highlights`
- `plan.followUps`
- `plan.operatorNotes`
- optional `plan.magnet`

## Recommended `n8n` usage

1. Receive the webhook from `/api/lead`.
2. Read `plan.sequenceKey` to choose the email branch.
3. If `plan.magnet` exists:
   - deliver the promised guide framing first
   - keep the first CTA aligned to `plan.primaryCta`
4. Schedule the rest of the touches from `plan.followUps`.
5. Persist `requestId`, `leadType`, `leadMagnet`, `source`, and `campaign` on every outbound message.

## Sequence families

- `buyer-guide-sequence`
- `seller-pricing-sequence`
- `valuation-sequence`
- `seller-distress-sequence`
- `investor-sequence`
- `relocation-sequence`
- `ai-systems-sequence`
- `newsletter-sequence`
- `general-routing-sequence`
- `manual-review-sequence`

## Notes

- A lead magnet request appends `__<lead-magnet-value>` to the base `sequenceKey`.
- The app already handles source attribution and request IDs before the webhook fires.
