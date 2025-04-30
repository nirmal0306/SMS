import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticeService, Notice } from 'src/app/services/notice.service';

@Component({
  selector: 'app-notice-details',
  templateUrl: './notice-details.component.html',
  styleUrls: ['./notice-details.component.css']
})
export class NoticeDetailsComponent implements OnInit {
  noticeId!: string;
  notice: Notice = { content: '' };
  updatedContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private noticeService: NoticeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.noticeId = this.route.snapshot.params['id'];
    this.noticeService.getNotices().subscribe(notices => {
      const found = notices.find(n => n._id === this.noticeId);
      if (found) {
        this.notice = found;
        this.updatedContent = found.content;
      }
    });
  }

  updateNotice() {
    this.noticeService.updateNotice(this.noticeId, this.updatedContent).subscribe(() => {
      alert('Notice updated!');
      this.router.navigate(['/list-notice']);
    });
  }

  deleteNotice() {
    if (confirm('Are you sure you want to delete this notice?')) {
      this.noticeService.deleteNotice(this.noticeId).subscribe(() => {
        alert('Notice deleted!');
        this.router.navigate(['/list-notice']);
      });
    }
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
}
