import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared-modules/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentDate = new Date();
  isAdmin
  userName = ""
  jsonArray:any
  typeOffood
  constructor(private router: Router,
    private apiService: ApiService,private http:HttpClient,
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
    // this.getProducts(1);
  }
  getProducts(type) {
    this.apiService.getAllItems(type).subscribe(response => {
      this.jsonArray = response
    })
  }

  redirectTo(url) {
    this.router.navigate([url])
  }
  deleteItem(object){
    this.http.delete(`http://localhost:8080/api/v1/items/${object.id}`).pipe(
      map((response: Response) => {
        this.snackBar.open("Product deleted successfully", '', {
              duration: 2000,
            });
            this.getProducts(1)
      }))
      .subscribe();

  }

}
