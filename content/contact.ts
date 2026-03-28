export interface ContactConfig {
  address: {
    street: string;
    city: string;
    country: string;
    postcode: string;
  };
  phone: string;
  email: string;
}

export const contact: ContactConfig = {
  address: {
    street: "<!-- PLACEHOLDER: Street address -->",
    city: "Hamburg",
    country: "Germany",
    postcode: "<!-- PLACEHOLDER: Postcode, e.g. 20095 -->",
  },
  phone: "<!-- PLACEHOLDER: +49 XXX XXX XXXX -->",
  email: "<!-- PLACEHOLDER: info@shmetalcommodities.com -->",
};
