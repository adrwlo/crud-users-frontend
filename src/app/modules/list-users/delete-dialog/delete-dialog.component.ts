import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  contentText!: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { id: number }, private userService: UserService, private matSnackBar: MatSnackBar,) {
    this.contentText = `Would you like to delete user with id: ${this.data.id}?`
  }

  deleteUser() {
    this.userService.deleteUser(this.data.id).subscribe(() => {});
    this.openSnackBar('Success', `Deleted user with id: ${this.data.id}!`);
    this.closeDialog(true);
  }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, { duration: 2000 });
  }

  closeDialog(deleted: boolean) {
    this.dialogRef.close(deleted);
  }
}
