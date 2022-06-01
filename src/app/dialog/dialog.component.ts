import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  statusList = ["Trainee" , "Associate" , "Senior"]
  userForm !: FormGroup;
  actionBtn : string = "Save"

  constructor(private formBuilder : FormBuilder, 
    private api : ApiService,
     @Inject(MAT_DIALOG_DATA) public editData : any, 
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      empName : ['', Validators.required],
      department : ['', Validators.required],
      date : ['', Validators.required],
      status : ['', Validators.required],
      experience : ['', Validators.required],
      comment : ['', Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.userForm.controls['empName'].setValue(this.editData.empName);
      this.userForm.controls['department'].setValue(this.editData.department);
      this.userForm.controls['date'].setValue(this.editData.date);
      this.userForm.controls['status'].setValue(this.editData.status);
      this.userForm.controls['experience'].setValue(this.editData.experience);
      this.userForm.controls['comment'].setValue(this.editData.comment)
    }
  }

  addUser(){
    if(!this.editData){
      if(this.userForm.valid){
        this.api.postUser(this.userForm.value)
        .subscribe({
          next:(res)=>{
            alert("User added successfully")
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the user")
          }
        })
      }
    } else{
      this.updateUser()
    }
  }

  updateUser(){
    this.api.putUser(this.userForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
      alert("User updated successfully");
      this.userForm.reset();
      this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating");
      }
    })
  }

}
