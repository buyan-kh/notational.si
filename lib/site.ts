export const site = {
  name: "notational",
  domain: "notational.si",
  contactEmail: "hello@notational.si",
};

export const mailto = (subject: string) =>
  `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}`;
