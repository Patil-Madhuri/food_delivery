import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared-modules/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentDate = new Date();
  isAdmin
  userName = ""
  jsonArray = []

  constructor(private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  addNew(data?) {
    const dialog = this.dialog.open(AddComponent, {
      width: '40%',
      data: data ? data : null,
    });
    dialog.afterClosed().subscribe(res => {
      console.log("res", res);
      // if (res.data !== true) {
      //   let localArray = []
      //   for (let index = 0; index < res.data.itemsArray.length; index++) {
      //     const element = res.data.itemsArray[index];
      //     localArray.push({
      //       "id": element.id,
      //       "foodName": element.foodName,
      //       "qty": element.qty,
      //       "price": element.price
      //     })
      //   }
      //   this.apiService.addOrder(localArray).subscribe(response => {
      //     this.snackBar.open("Order added successfully", '', {
      //       duration: 2000,
      //     });
      //     this.getProducts()
      //   })
      // } else {
      //   console.log("normal close");
      // }
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.apiService.getAllItems().subscribe(response => {
      this.jsonArray = response['response'];
    })
  }

  redirectTo(url) {
    this.router.navigate([url])
  }

}
