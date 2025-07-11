import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.css']
})
export class AddNoticeComponent {
  content: string = '';

  constructor(private noticeService: NoticeService, private router: Router) {}

  addNotice() {
    if (!this.content.trim()) {
      alert('Notice content cannot be empty.');
      return;
    }
    if (this.content.trim()) {
      this.noticeService.createNotice(this.content).subscribe(() => {
        alert('Notice added!');
        this.router.navigate(['/list-notice']);
      });
    }
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
}
