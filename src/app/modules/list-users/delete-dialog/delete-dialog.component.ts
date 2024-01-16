import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  contentText!: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { id: number }, private userService: UserService) {
    this.contentText = `Would you like to delete user with id: ${this.data.id}?`
  }

  deleteUser() {
    this.userService.deleteUser(this.data.id).subscribe();
    this.dialogRef.close();
    this.userService.getUsers().subscribe();
  }
}
