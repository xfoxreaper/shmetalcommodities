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
    street: "Jungfernstieg 1",
    city: "Hamburg",
    country: "Germany",
    postcode: "20354",
  },
  phone: "+49 1939 1945",
  email: "rudi@shcommodities.de",
};
