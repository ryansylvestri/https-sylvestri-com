# Security Audit

## Risks

- live Hostinger publish auth is currently unset
- AI output could produce unsafe claims or fabricated numbers
- duplicate or weak slugs could collide over time

## Mitigations

- enforce deterministic topic rotation
- add date suffix to final slugs
- keep no-fabrication and fair-housing instructions in the prompt
- use app-side dry-run validation before live publish

