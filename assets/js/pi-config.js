/* PUBLIC settings only — never put Supabase service keys or Turnstile secrets here.
 * Do not set enabled:true until Edge Function, DB, legal approval and tests pass.
 * Example endpoint after verification:
 * https://yxwbxlsjglutlgfqybxb.supabase.co/functions/v1/submit-pi-lead
 */
window.NOYES_PI_CONFIG = Object.freeze({
  enabled: true,
  endpoint: 'https://yxwbxlsjglutlgfqybxb.supabase.co/functions/v1/submit-pi-lead',
  turnstileSiteKey: '0x4AAAAAAFrk78W-Ny-Cr7tW',
  calendlyUrl: 'https://calendly.com/omar-noyesassociateslaw/30min'
});
