import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {DealerApiService} from "../dealer-api-service";
import {Response} from "../response";
import {Role, Util} from "../util";
import {AppStrings} from "../app-strings";
import {UpdateDto} from "../update-dto";

@Component({
  selector: 'app-edit-dealer-details',
  templateUrl: './edit-dealer-details.component.html',
  styleUrls: ['./edit-dealer-details.component.css']
})
export class EditDealerDetailsComponent implements OnInit {

  @ViewChild('fileInput') fileInput: any;
  //private selectedFile: File;
  private selectedFile: File | null = null;
  user: any
  imageUrl: string = '\'http://localhost:8080\' + \'/customer/image/\' + item.dealer.id + \'/\' + item.dealer.showroomPicture';


  constructor(private apiService: DealerApiService, private router: Router) {
  }

  async ngOnInit() {
    if (localStorage.getItem(AppStrings.dealerEmailOrUserName) == null) {
      alert('Your session is expired. Pleae log in.')
      this.router.navigate(['/dealer/login'])
      return
    }
    await this.apiService.getDealerDetails().subscribe({
        next: (value: HttpResponse<Response<UpdateDto>>) => {
          this.user = value.body;
          this.imageUrl = 'http://localhost:8080' + '/dealer/image/' + this.user.id + '/' + this.user.showroomPicture;
          return this.user;
        },
        error: err => Util.handleUnauthorized(err, this.router, Role.Dealer),
      }
    )
  }

  onFileSelected(event: Event): void {
    let file = (event.target as HTMLInputElement).files![0];
    if (!file.type.startsWith('image/')) {
      alert('Selected file is not an image')
      this.fileInput.nativeElement.value = null;
      return;
    }
    this.selectedFile = file;
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(file);
  }

  update(event: Event) {
    event.preventDefault()
    let firstName = (document.getElementById('firstName') as HTMLInputElement).value
    let lastName = (document.getElementById('lastName') as HTMLInputElement).value
    let email = (document.getElementById('emailAddress') as HTMLInputElement).value
    let username = (document.getElementById('username') as HTMLInputElement).value
    let phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value
    let address = (document.getElementById('address') as HTMLInputElement).value
    let password = (document.getElementById('password') as HTMLInputElement).value
    let retypePassword = (document.getElementById('retypePassword') as HTMLInputElement).value
    let user = new UpdateDto(this.user.id, firstName, lastName, username, email, password, phoneNumber, address, "");
    if (password !== retypePassword) {
      alert('Password do not match')
      return
    }
    if (user.firstName!.length == 0 && user.lastName!.length == 0) {
      alert('Please enter name')
      return
    }
    if (user.phoneNumber!.length == 0) {
      alert('Please provide phone number')
      return;
    }
    if (user.address!.length == 0) {
      alert('Please provide showroom address')
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
    if (this.selectedFile != null)
      formData.append('file', this.selectedFile)
    formData.append('user', JSON.stringify(user))

    this.apiService.update(formData).subscribe({
      next: value => {
        alert('Successfully updated details');
        if (password.length == 0) {
          this.router.navigate(['/dealer/homepage'])
        } else {
          localStorage.removeItem(AppStrings.dealerEmailOrUserName)
          localStorage.removeItem(AppStrings.dealerPassword)
          alert('You changed password. Please login again!')
          this.router.navigate(['/dealer/login'])
        }
      },
      error: (err: HttpErrorResponse) => alert('Unable to update details: ' + err.error.error)
    })
  }
}
