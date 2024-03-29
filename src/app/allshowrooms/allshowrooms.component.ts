import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {Role, Util} from "../util";
import {ShowroomFilters} from "../showroom-filters";
import {Showroom} from "../showroom";
import {CustomerApiService} from "../customer-api-service";
import {ShowroomSharedService} from "../showroom-shared-service";

@Component({
  selector: 'app-allshowrooms',
  templateUrl: './allshowrooms.component.html',
  styleUrls: ['./allshowrooms.component.css']
})
export class AllshowroomsComponent implements OnInit {
  dealers: any
  latitude: number = 0
  longitude: number = 0

  constructor(private apiService: CustomerApiService, private router: Router, private showroomSharedService: ShowroomSharedService) {
    Util.getCurrentLocation((lat: number, long: number) => {
      this.latitude = lat
      this.longitude = long
    })
  }

  getDistance(showRoom: Showroom): number {
    return +Util.getDistanceFromLatLonInKm(
      this.latitude,
      this.longitude,
      showRoom.dealer.latitude,
      showRoom.dealer.longitude
    ).toFixed(2)
  }

  getAllDealers() {
    let minPrice = (document.getElementById('min-price') as HTMLInputElement).valueAsNumber
    let maxPrice = (document.getElementById('max-price') as HTMLInputElement).valueAsNumber
    if (isNaN(minPrice)) minPrice = 0
    if (isNaN(maxPrice)) maxPrice = 10000

    if (maxPrice < minPrice) {
      alert('Min Price cannot be greater than Max Price')
      return
    }

    let sct: number[] = []
    if ((document.getElementById('sedan') as HTMLInputElement).checked)
      sct.push(2)
    if ((document.getElementById('suv') as HTMLInputElement).checked)
      sct.push(3)
    if ((document.getElementById('hatchback') as HTMLInputElement).checked)
      sct.push(1)

    let spt: number[] = []
    if ((document.getElementById('transparent') as HTMLInputElement).checked)
      spt.push(1)
    if ((document.getElementById('ultra-thick') as HTMLInputElement).checked)
      spt.push(3)
    if ((document.getElementById('matte') as HTMLInputElement).checked)
      spt.push(2)

    let showroomFilters = new ShowroomFilters(minPrice, maxPrice, sct, spt);

    let maxDistance = (document.getElementById('distance') as HTMLInputElement).valueAsNumber
    if (isNaN(maxDistance)) maxDistance = 100

    this.apiService.getAllShowrooms(showroomFilters).subscribe({
        next: (value: HttpResponse<Showroom[]>) => {
          this.dealers = value
          this.dealers = this.dealers.filter((sr: Showroom) => this.getDistance(sr) <= maxDistance)
        },
        error: err => Util.handleUnauthorized(err, this.router, Role.Customer),
      }
    )
  }

  openGoogleMaps(showRoom: Showroom) {
    Util.openGoogleMaps(showRoom.dealer.latitude, showRoom.dealer.longitude)
  }

  ngOnInit(): void {
    this.getAllDealers()
  }

  createBooking(showroom: Showroom) {
    this.showroomSharedService.showRoom = showroom
    this.router.navigate(['/customer/booking'])
  }
}
