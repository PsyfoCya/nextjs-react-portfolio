/**
 * EmailJS wiring for the contact form.
 *
 * All three values are public by design — EmailJS identifies the account with
 * a *public* key and the send happens straight from the browser, so there is
 * no secret to leak here. They stay overridable via env vars so the IDs can be
 * rotated on Netlify without a code change, and fall back to the values the
 * site already shipped with so an unconfigured deploy keeps working.
 *
 * Because anyone can read these out of the bundle, abuse is prevented on the
 * EmailJS side rather than in this file: see the dashboard checklist in
 * README.md (domain allowlist + rate limiting).
 */
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_ekwydfj",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_j7rrh0n",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "QGhpJXJQYGvV8ZiUL",
};

export interface ContactFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Expands the four fields the form collects into every variable name an
 * EmailJS template is likely to reference.
 *
 * This is the fix for the most common "the form submits but the email is
 * blank" failure: `sendForm` posts each input under its `name` attribute, so a
 * template written against the stock `{{from_name}}` / `{{reply_to}}` sample
 * silently renders empty when the inputs are called `name` / `email`. Sending
 * the aliases too means the template resolves whichever convention it happens
 * to use, and unused variables are simply ignored.
 */
export const toTemplateParams = (fields: ContactFields) => ({
  // As named in the markup.
  name: fields.name,
  email: fields.email,
  subject: fields.subject,
  message: fields.message,

  // EmailJS' own sample templates.
  from_name: fields.name,
  from_email: fields.email,
  reply_to: fields.email,
  title: fields.subject,

  // The other convention their docs use.
  user_name: fields.name,
  user_email: fields.email,
  user_subject: fields.subject,
  user_message: fields.message,

  to_name: "Siyabonga",
});
