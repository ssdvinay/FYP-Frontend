import {Component, OnInit} from '@angular/core';
import {RESTAPIService} from "../apiservice.service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {Util} from "../util";
import {ShowroomFilters} from "../showroom-filters";
import {Showroom} from "../showroom";

@Component({
  selector: 'app-allshowrooms',
  templateUrl: './allshowrooms.component.html',
  styleUrls: ['./allshowrooms.component.css']
})
export class AllshowroomsComponent implements OnInit {
  dealers: any

  constructor(private apiService: RESTAPIService, private router: Router) {
  }

  getAllDealers() {
    let minPrice = (document.getElementById('min-price') as HTMLInputElement).valueAsNumber
    let maxPrice = (document.getElementById('max-price') as HTMLInputElement).valueAsNumber
    if (isNaN(minPrice)) minPrice = 0
    if (isNaN(maxPrice)) maxPrice = 10000

    let sct: number[] = []
    if ((document.getElementById('sedan') as HTMLInputElement).checked)
      sct.push(2)
    if ((document.getElementById('suv') as HTMLInputElement).checked)
      sct.push(3)
    if ((document.getElementById('hatchback') as HTMLInputElement).checked)
      sct.push(1)
    if (sct.length == 0) sct = [1, 2, 3]
    let spt: number[] = []
    if ((document.getElementById('transparent') as HTMLInputElement).checked)
      spt.push(1)
    if ((document.getElementById('ultra-thick') as HTMLInputElement).checked)
      spt.push(3)
    if ((document.getElementById('matte') as HTMLInputElement).checked)
      spt.push(2)
    if (spt.length == 0) spt = [1, 2, 3]
    let showroomFilters = new ShowroomFilters(minPrice, maxPrice, sct, spt);
    this.apiService.getAllShowrooms(showroomFilters).subscribe({
        next: (value: HttpResponse<Showroom[]>) => {
          this.dealers = value
        },
        error: err => Util.handleUnauthorized(err, this.router),
      }
    )
  }

  ngOnInit(): void {
    this.getAllDealers()
  }
}
