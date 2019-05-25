export class FormSession {
  phone: string;
  mobile: string;
  location: Location;

  constructor() {
    this.phone = '';
    this.mobile = '';
    // tslint:disable: no-use-before-declare
    this.location = new Location();
  }
}

export class Location {
  desc: string;

  constructor() {
    this.desc = '';
  }
}
