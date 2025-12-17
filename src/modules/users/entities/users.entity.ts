interface Props {
  id?: string;
  password: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}
export class UserEntity {
  id?: string;
  password: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  constructor(props: Props) {
    const { id, password, email, firstName, lastName } = props;
    this.id = id;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
