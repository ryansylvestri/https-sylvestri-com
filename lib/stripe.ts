import "server-only";

import Stripe from "stripe";

export function getStripeServerClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return null;

  return new Stripe(secretKey);
}

export function isPaidFeatureEnabled() {
  return process.env.FEATURE_PAID === "true";
}
