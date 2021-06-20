import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/shared-modules/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  masterFormGroup: FormGroup
  isEdit = false;
  // jsonArray = [
  //   {
  //     "id": 1,
  //     "foodName": "abc",
  //     "type": 1,
  //     "price": 200.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 2,
  //     "foodName": "xyz",
  //     "type": 1,
  //     "price": 350.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 1,
  //     "foodName": "abc",
  //     "type": 1,
  //     "price": 200.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 2,
  //     "foodName": "xyz",
  //     "type": 1,
  //     "price": 350.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 1,
  //     "foodName": "abc",
  //     "type": 1,
  //     "price": 200.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 2,
  //     "foodName": "xyz",
  //     "type": 1,
  //     "price": 350.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 1,
  //     "foodName": "abc",
  //     "type": 1,
  //     "price": 200.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 2,
  //     "foodName": "xyz",
  //     "type": 1,
  //     "price": 350.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 1,
  //     "foodName": "abc",
  //     "type": 1,
  //     "price": 200.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 2,
  //     "foodName": "xyz",
  //     "type": 1,
  //     "price": 350.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 1,
  //     "foodName": "abc",
  //     "type": 1,
  //     "price": 200.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 2,
  //     "foodName": "xyz",
  //     "type": 1,
  //     "price": 350.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 1,
  //     "foodName": "abc",
  //     "type": 1,
  //     "price": 200.0,
  //     'qty': ''
  //   },
  //   {
  //     "id": 2,
  //     "foodName": "xyz",
  //     "type": 1,
  //     "price": 350.0,
  //     'qty': ''
  //   },
  // ]
  jsonArray:any;
  showOrderDetail = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService,
    public dialogRef: MatDialogRef<AddComponent>, private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.data) {
      this.openEditForm(this.data);
    } else {
      this.formInit();
    }
  }
  getProducts(type) {
    this.apiService.getAllItems(type).subscribe(response => {
      this.jsonArray = response;
      for (let index = 0; index < this.jsonArray.length; index++) {
        const element = this.jsonArray[index];
        element.qty = ''
      }
    })
  }
  openEditForm(data) {
    this.isEdit = true;
    this.formInit();
    this.masterFormGroup.patchValue(data);
  }
  formInit() {
    this.masterFormGroup = this.fb.group({
      itemsArray: ['', Validators.required],
    })
  }
  closeForm(data) {
    this.dialogRef.close({ data: data });
  }

  addItem() {
    console.log(this.masterFormGroup.value);
    let localArray = []
    for (let index = 0; index < this.masterFormGroup.get('itemsArray').value.length; index++) {
      const element = this.masterFormGroup.get('itemsArray').value[index];
      localArray.push({
        "id": element.id,
        "foodName": element.foodName,
        "qty": element.qty,
        "price": element.price
      })
    }
    this.apiService.addOrder(localArray).subscribe(response => {
      this.snackBar.open("Order added successfully", '', {
        duration: 2000,
      });
    })
    this.showOrderDetail = true
  }
  billpaid() {
    this.snackBar.open("Bill paid successfully", '', {
      duration: 2000,
    });
    this.closeForm(this.masterFormGroup.value)
  }
  returnTotal() {
    let array = this.masterFormGroup.get('itemsArray').value;
    let taxTotal = 0;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      let price = 0
      if (element.qty == '1') {
        price = element.price / 2
      } else {
        price = element.price
      }
      taxTotal = taxTotal + price;
    }
    console.log(this.masterFormGroup.get('itemsArray').value);

    return parseFloat(String(taxTotal)).toFixed(2)
  }
}
