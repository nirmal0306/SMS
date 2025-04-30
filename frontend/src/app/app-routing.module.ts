import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { AboutComponent } from './about/about.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { AfterAboutComponent } from './after-about/after-about.component';
import { ResidentComponent } from './resident/resident.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAboutComponent } from './admin-about/admin-about.component';
import { AddResidentComponent } from './residents/add-resident/add-resident.component';
import { EditResidentComponent } from './residents/edit-resident/edit-resident.component';
import { ResidentDetailsComponent } from './residents/resident-details/resident-details.component';
import { ResidentsListComponent } from './residents/residents-list/residents-list.component';
import { AddVisitorComponent } from './visitors/add-visitor/add-visitor.component';
import { VisitorsListComponent } from './visitors/visitors-list/visitors-list.component';
import { BookParkingComponent } from './parking/book-parking/book-parking.component';
import { ParkingSlotsComponent } from './parking/parking-slots/parking-slots.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { VisitorLoginComponent } from './visitor-login/visitor-login.component';
import { VisitorAboutComponent } from './visitor-about/visitor-about.component';
import { VisitorHomeComponent } from './visitor-home/visitor-home.component';
import { ResidentLoginComponent } from './resident-login/resident-login.component';
import { AddMaintenanceComponent } from './maintenance/add-maintenance/add-maintenance.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { AddNoticeComponent } from './notices/add-notice/add-notice.component';
import { NoticeDetailsComponent } from './notices/notice-details/notice-details.component';
import { NoticeListComponent } from './notices/notice-list/notice-list.component';
import { ResidentNoticeComponent } from './notices/resident-notice/resident-notice.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FeedbackComponent } from './feedback/feedback/feedback.component';
import { AddComplaintComponent } from './complaints/add-complaint/add-complaint.component';
import { VisitorProfileComponent } from './profile/visitor-profile/visitor-profile.component';
import { ComplaintsListComponent } from './complaints/complaints-list/complaints-list.component';
import { AdminComponent } from './admin/admin.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { MaintenanceListComponent } from './maintenance/maintenance-list/maintenance-list.component';
import { AcceptedRequestsComponent } from './accepted-requests/accepted-requests.component';
import { RejectedRequestsComponent } from './rejected-requests/rejected-requests.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { ResidentEventsComponent } from './events/resident-events/resident-events.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route (Home Page)
  { path: 'home', component: HomeComponent }, // Default route (Home Page)
  { path: 'about', component: AboutComponent }, // About Page
  { path: 'admin-about', component: AdminAboutComponent }, // About Page
  { path: 'register', component: RegisterComponent }, // Register Page
  { path: 'register', component: RegisterComponent }, // Register Page
  { path: 'login', component: LoginComponent }, // Login Page
  { path: 'resident-login', component: ResidentLoginComponent }, // Login Page
  { path: 'after-login', component: AfterLoginComponent }, // Login Page
  { path: 'after-about', component: AfterAboutComponent }, // About Page
  { path: 'admin-home', component: AdminHomeComponent }, // About Page
  { path: 'residents', component: ResidentComponent },
  { path: 'add-resident', component: AddResidentComponent },
  // { path: 'edit-resident', component: EditResidentComponent },
  { path: 'edit-resident', component: EditResidentComponent },
  { path: 'resident-details', component: ResidentDetailsComponent },
  { path: 'list-residents', component: ResidentsListComponent },
  { path: 'add-visitor', component: AddVisitorComponent },
  { path: 'list-visitor', component: VisitorsListComponent },
  { path: 'book-parking', component: BookParkingComponent },
  { path: 'parking-slot', component: ParkingSlotsComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'visitor-login', component: VisitorLoginComponent },
  { path: 'visitor-home', component: VisitorHomeComponent },
  { path: 'visitor-about', component: VisitorAboutComponent },
  { path: 'add-maintenance', component: AddMaintenanceComponent },
  { path: 'maintenance', component: MaintenanceListComponent },
  { path: 'resident-detail', component: UserProfileComponent },
  { path: 'visitor-detail', component: VisitorProfileComponent },
  { path: 'add-notice', component: AddNoticeComponent },
  { path: 'notice', component: ResidentNoticeComponent },
  { path: 'list-notice', component: NoticeListComponent },
  { path: 'notices/details/:id', component: NoticeDetailsComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'events', component: EventsListComponent },
  { path: 'events-list', component: ResidentEventsComponent },
  { path: 'events/details/:id', component: EventDetailsComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'complaint', component: AddComplaintComponent },
  { path: 'list-complaint', component: ComplaintsListComponent },
  { path: 'list-feedback', component: FeedbackListComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'accepted-requests', component: AcceptedRequestsComponent },
  { path: 'rejected-requests', component: RejectedRequestsComponent },
  { path: 'reports', component: ReportsComponent },



  // { path: 'resident-list', component: }
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthService] }, // Dashboard (Protected)
  { path: '**', redirectTo: '' } // Redirect unknown routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
