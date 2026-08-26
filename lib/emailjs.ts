import moment from "moment-timezone";

/**
 * EmailJS wiring for the contact form.
 *
 * The IDs come from the environment and nothing is hard-coded, so rotating the
 * EmailJS account is a Vercel settings change rather than a commit, and the
 * repo carries no account identifiers.
 *
 * Note what this does *not* buy: `NEXT_PUBLIC_*` values are inlined into the
 * client bundle at build time, and the send happens in the browser, so all
 * three are still readable by anyone who opens devtools. EmailJS is designed
 * that way — the key it calls "public" is public — so abuse is prevented in
 * the dashboard, not here: see the checklist in README.md (domain allowlist +
 * rate limiting). Never put an EmailJS *private* key in a NEXT_PUBLIC_ var.
 *
 * Each variable is read as a whole `process.env.X` expression because that is
 * the literal Next.js substitutes at build time; destructuring `process.env`
 * or looking a name up dynamically yields `undefined` in the browser.
 */
export interface EmailjsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

/** `null` when any of the three variables is missing or empty. */
export const emailjsConfig: EmailjsConfig | null = (() => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) return null;

  return { serviceId, templateId, publicKey };
})();

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

  // The stock EmailJS template prints a {{time}} line under the sender's
  // name. It is not a variable EmailJS fills in — unsent, it renders blank.
  time: moment().tz("Africa/Johannesburg").format("D MMM YYYY, HH:mm"),

  to_name: "Siyabonga",
});
