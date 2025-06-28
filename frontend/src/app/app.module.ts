import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // <-- Add this import
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { AfterAboutComponent } from './after-about/after-about.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ResidentComponent } from './resident/resident.component';
import { AdminAboutComponent } from './admin-about/admin-about.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { ResidentsListComponent } from './residents/residents-list/residents-list.component';
import { AddResidentComponent } from './residents/add-resident/add-resident.component';
import { EditResidentComponent } from './residents/edit-resident/edit-resident.component';
import { ResidentDetailsComponent } from './residents/resident-details/resident-details.component';
import { MaintenanceListComponent } from './maintenance/maintenance-list/maintenance-list.component';
import { AddMaintenanceComponent } from './maintenance/add-maintenance/add-maintenance.component';
import { BillingComponent } from './billing/billing/billing.component';
import { PaymentComponent } from './billing/payment/payment.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { NoticeListComponent } from './notices/notice-list/notice-list.component';
import { AddNoticeComponent } from './notices/add-notice/add-notice.component';
import { NoticeDetailsComponent } from './notices/notice-details/notice-details.component';
import { ComplaintsListComponent } from './complaints/complaints-list/complaints-list.component';
import { AddComplaintComponent } from './complaints/add-complaint/add-complaint.component';
import { FeedbackComponent } from './feedback/feedback/feedback.component';
import { ParkingSlotsComponent } from './parking/parking-slots/parking-slots.component';
import { BookParkingComponent } from './parking/book-parking/book-parking.component';
import { VisitorsListComponent } from './visitors/visitors-list/visitors-list.component';
import { AddVisitorComponent } from './visitors/add-visitor/add-visitor.component';
import { ChatComponent } from './chat/chat/chat.component';
import { MessageComponent } from './chat/message/message.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { DownloadReportComponent } from './reports/download-report/download-report.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { AdminProfileComponent } from './profile/admin-profile/admin-profile.component';
import { SettingsComponent } from './settings/settings/settings.component';
import { EditVisitorComponent } from './visitors/edit-visitor/edit-visitor.component';
import { VisitorLoginComponent } from './visitor-login/visitor-login.component';
import { VisitorHomeComponent } from './visitor-home/visitor-home.component';
import { VisitorAboutComponent } from './visitor-about/visitor-about.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ResidentLoginComponent } from './resident-login/resident-login.component';
import { ResidentNoticeComponent } from './notices/resident-notice/resident-notice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { VisitorProfileComponent } from './profile/visitor-profile/visitor-profile.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { AcceptedRequestsComponent } from './accepted-requests/accepted-requests.component';
import { RejectedRequestsComponent } from './rejected-requests/rejected-requests.component';
import { ResidentEventsComponent } from './events/resident-events/resident-events.component';
import { VisitorPurposeComponent } from './visitor-purpose/visitor-purpose.component';
import { PurposeListComponent } from './purpose-list/purpose-list.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'after-login', component: AfterLoginComponent },
  { path: 'resident-login', component: ResidentLoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'after-about', component: AfterAboutComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'events-list', component: EventsListComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AfterLoginComponent,
    AboutComponent,
    AfterAboutComponent,
    AdminHomeComponent,
    ResidentComponent,
    AdminAboutComponent,
    ForgotPasswordComponent,
    AdminLoginComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    ResidentsListComponent,
    AddResidentComponent,
    EditResidentComponent,
    ResidentDetailsComponent,
    MaintenanceListComponent,
    AddMaintenanceComponent,
    BillingComponent,
    PaymentComponent,
    EventsListComponent,
    AddEventComponent,
    EventDetailsComponent,
    NoticeListComponent,
    AddNoticeComponent,
    NoticeDetailsComponent,
    ComplaintsListComponent,
    AddComplaintComponent,
    FeedbackComponent,
    ParkingSlotsComponent,
    BookParkingComponent,
    VisitorsListComponent,
    AddVisitorComponent,
    ChatComponent,
    MessageComponent,
    ReportsComponent,
    DownloadReportComponent,
    UserProfileComponent,
    AdminProfileComponent,
    SettingsComponent,
    EditVisitorComponent,
    VisitorLoginComponent,
    VisitorHomeComponent,
    VisitorAboutComponent,
    ResidentLoginComponent,
    ResidentNoticeComponent,
    ChatbotComponent,
    VisitorProfileComponent,
    FeedbackListComponent,
    AcceptedRequestsComponent,
    RejectedRequestsComponent,
    ResidentEventsComponent,
    VisitorPurposeComponent,
    PurposeListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
