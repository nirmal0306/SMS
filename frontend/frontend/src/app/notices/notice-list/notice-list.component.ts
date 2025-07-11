import { Component, OnInit } from '@angular/core';
import { NoticeService, Notice } from 'src/app/services/notice.service';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.css']
})
export class NoticeListComponent implements OnInit {
  notices: Notice[] = [];

  constructor(private noticeService: NoticeService) {}

  ngOnInit() {
    this.noticeService.getNotices().subscribe(data => {
      this.notices = data;
    });
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/admin-login'; // Redirect to login
  }
}
