import { Component, OnInit } from '@angular/core';
import { NoticeService,Notice } from 'src/app/services/notice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resident-notice',
  templateUrl: './resident-notice.component.html',
  styleUrls: ['./resident-notice.component.css']
})
export class ResidentNoticeComponent implements OnInit {
  notices: Notice[] = [];
  name: string = '';
  email: string | null = '';

  constructor(private noticeService: NoticeService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.noticeService.getNotices().subscribe(data => {
      this.notices = data;
    });
    if (this.email) {
      this.http.get<any>(`http://localhost:5000/resident/${this.email}`).subscribe(
        (data) => {
          this.name = data.name;
        },
        (error) => {
          console.error('Failed to fetch resident details:', error);
        }
      );
    }
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove token from storage
    window.location.href = '/resident-login'; // Redirect to login
  }
}
