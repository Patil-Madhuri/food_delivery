import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/shared-modules/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  masterFormGroup: FormGroup
  isEdit = false;
  jsonArray = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService,
    public dialogRef: MatDialogRef<AddComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.data) {
      this.openEditForm(this.data);
    } else {
      this.formInit();
    }
  }
  getProducts() {
    this.apiService.getAllItems().subscribe(response => {
      this.jsonArray = response['response'];
      for (let index = 0; index < this.jsonArray.length; index++) {
        const element = this.jsonArray[index];
        element.qty = 1
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
    this.closeForm(this.masterFormGroup.value)

  }

}
