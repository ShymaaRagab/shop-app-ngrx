export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  phone: string;
  name: Name;
  address: Address;
}

export interface Name {
  firstname: string;
  lastname: string;
}

export interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: GeoLocation;
}

export interface GeoLocation {
  lat: string;
  long: string;
}