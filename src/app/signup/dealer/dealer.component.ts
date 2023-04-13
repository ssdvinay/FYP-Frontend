import {Component, ViewChild} from '@angular/core';
import {UserHelper} from "../../user-helper";
import {RESTAPIService} from "../../apiservice.service";
import {User} from "../../user";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent {
  @ViewChild('fileInput') fileInput: any;
  //private selectedFile: File;
  private selectedFile: File | null = null;


  constructor(private apiService: RESTAPIService, private router: Router) {
  }


  onFileSelected(event: Event): void {
    let file = (event.target as HTMLInputElement).files![0];
    if (!file.type.startsWith('image/')) {
      alert('Selected file is not an image')
      this.fileInput.nativeElement.value = null;
      return;
    }
    this.selectedFile = file;
  }


  signup(event: Event) {
    event.preventDefault()
    let user: User | null = UserHelper.createUser(document, 'DEALER')
    if (user == null) {
      alert('Password do not match')
      return
    }
    if (user.firstName.length == 0 && user.lastName.length == 0) {
      alert('Please enter name')
      return
    }
    if (user.phoneNumber.length == 0) {
      alert('Please provide phone number')
      return;
    }
    if (user.address.length == 0) {
      alert('Please provide showroom address')
      return;
    }
    if (user.password.length == 0) {
      alert('Please enter password')
      return;
    }
    if (this.selectedFile == null) {
      alert('Please upload a showroom picture')
      return;
    }
    if (!this.selectedFile.type.startsWith('image/')) {
      alert('Selected file is not an image')
      return;
    }

    let sct: number[] = []
    if ((document.getElementById('sedan') as HTMLInputElement).checked)
      sct.push(2)
    if ((document.getElementById('suv') as HTMLInputElement).checked)
      sct.push(3)
    if ((document.getElementById('hatchback') as HTMLInputElement).checked)
      sct.push(1)
    user.supportedCarTypes = sct

    let spt: number[] = []
    if ((document.getElementById('tng') as HTMLInputElement).checked)
      spt.push(1)
    if ((document.getElementById('ut') as HTMLInputElement).checked)
      spt.push(3)
    if ((document.getElementById('matte') as HTMLInputElement).checked)
      spt.push(2)
    user.supportedProductTypes = spt

    user.price = (document.getElementById('price') as HTMLInputElement).valueAsNumber

    const formData = new FormData()
    formData.append('file', this.selectedFile)
    formData.append('user', JSON.stringify(user))

    this.apiService.signup(formData).subscribe({
      next: value => {
        alert('Successfully signed up');
        this.router.navigate([''])
      },
      error: (err: HttpErrorResponse) => alert('Unable to signup: ' + err.error.error)
    })
  }
}
