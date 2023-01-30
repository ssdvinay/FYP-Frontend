import {User} from "./user";

export class UserHelper {

  static createUser(document: Document, role: String): User | null {
    let firstName = (document.getElementById('firstName') as HTMLInputElement).value
    let lastName = (document.getElementById('lastName') as HTMLInputElement).value
    let email = (document.getElementById('emailAddress') as HTMLInputElement).value
    let username = (document.getElementById('username') as HTMLInputElement).value
    let phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value
    let address = (document.getElementById('address') as HTMLInputElement).value
    let password = (document.getElementById('password') as HTMLInputElement).value
    let retypePassword = (document.getElementById('retypePassword') as HTMLInputElement).value
    if (password !== retypePassword)
      return null
    return new User(firstName, lastName, username, email, password, phoneNumber, address, role)
  }
}
