import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { UserDashboardComponent } from './features/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { ForgotPasswordRequestComponent } from './features/forgot-password-request/forgot-password-request.component';
import { ResetPasswordVerifyComponent } from './features/reset-password-verify/reset-password-verify.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
import { AdminComponent } from './features/admin-dashboard/admin/admin.component';
import { ListAdminsComponent } from './features/admin-dashboard/admin/list-admins/list-admins.component';
import { SingleAdminComponent } from './features/admin-dashboard/admin/single-admin/single-admin.component';
import { CreateAdminComponent } from './features/admin-dashboard/admin/create-admin/create-admin.component';
import { EditAdminComponent } from './features/admin-dashboard/admin/edit-admin/edit-admin.component';
import { DeleteAdminComponent } from './features/admin-dashboard/admin/delete-admin/delete-admin.component';
import { BookingComponent } from './features/admin-dashboard/booking/booking.component';
import { CreateBookingComponent } from './features/admin-dashboard/booking/create-booking/create-booking.component';
import { DeleteBookingComponent } from './features/admin-dashboard/booking/delete-booking/delete-booking.component';
import { EditBookingComponent } from './features/admin-dashboard/booking/edit-booking/edit-booking.component';
import { ListBookingsComponent } from './features/admin-dashboard/booking/list-bookings/list-bookings.component';
import { SingleBookingComponent } from './features/admin-dashboard/booking/single-booking/single-booking.component';
import { CategoryComponent } from './features/admin-dashboard/category/category.component';
import { CreateCategoryComponent } from './features/admin-dashboard/category/create-category/create-category.component';
import { DeleteCategoryComponent } from './features/admin-dashboard/category/delete-category/delete-category.component';
import { EditCategoryComponent } from './features/admin-dashboard/category/edit-category/edit-category.component';
import { SingleCategoryComponent } from './features/admin-dashboard/category/single-category/single-category.component';
import { ListCategoriesComponent } from './features/admin-dashboard/category/list-categories/list-categories.component';
import { ClientComponent } from './features/admin-dashboard/client/client.component';
import { CreateClientComponent } from './features/admin-dashboard/client/create-client/create-client.component';
import { DeleteClientComponent } from './features/admin-dashboard/client/delete-client/delete-client.component';
import { EditClientComponent } from './features/admin-dashboard/client/edit-client/edit-client.component';
import { ListClientsComponent } from './features/admin-dashboard/client/list-clients/list-clients.component';
import { SingleClientComponent } from './features/admin-dashboard/client/single-client/single-client.component';
import { PaymentComponent } from './features/admin-dashboard/payment/payment.component';
import { CreatePaymentComponent } from './features/admin-dashboard/payment/create-payment/create-payment.component';
import { DeletePaymentComponent } from './features/admin-dashboard/payment/delete-payment/delete-payment.component';
import { EditPaymentComponent } from './features/admin-dashboard/payment/edit-payment/edit-payment.component';
import { ListPaymentsComponent } from './features/admin-dashboard/payment/list-payments/list-payments.component';
import { SinglePaymentComponent } from './features/admin-dashboard/payment/single-payment/single-payment.component';
import { ReviewComponent } from './features/admin-dashboard/review/review.component';
import { CreateReviewComponent } from './features/admin-dashboard/review/create-review/create-review.component';
import { DeleteReviewComponent } from './features/admin-dashboard/review/delete-review/delete-review.component';
import { EditReviewComponent } from './features/admin-dashboard/review/edit-review/edit-review.component';
import { ListReviewsComponent } from './features/admin-dashboard/review/list-reviews/list-reviews.component';
import { SingleReviewComponent } from './features/admin-dashboard/review/single-review/single-review.component';
import { TourComponent } from './features/admin-dashboard/tour/tour.component';
import { CreateTourComponent } from './features/admin-dashboard/tour/create-tour/create-tour.component';
import { DeleteTourComponent } from './features/admin-dashboard/tour/delete-tour/delete-tour.component';
import { EditTourComponent } from './features/admin-dashboard/tour/edit-tour/edit-tour.component';
import { ListToursComponent } from './features/admin-dashboard/tour/list-tours/list-tours.component';
import { SingleTourComponent } from './features/admin-dashboard/tour/single-tour/single-tour.component';
import { UserComponent } from './features/admin-dashboard/user/user.component';
import { CreateUserComponent } from './features/admin-dashboard/user/create-user/create-user.component';
import { DeleteUserComponent } from './features/admin-dashboard/user/delete-user/delete-user.component';
import { EditUserComponent } from './features/admin-dashboard/user/edit-user/edit-user.component';
import { ListUsersComponent } from './features/admin-dashboard/user/list-users/list-users.component';
import { SingleUserComponent } from './features/admin-dashboard/user/single-user/single-user.component';
import { TourListComponent } from './features/tour/tour-list/tour-list.component';
import { ProfileComponent } from './features/user-dashboard/profile/profile.component';
import { AdminLogoutComponent } from './features/admin-dashboard/admin-logout/admin-logout.component';
import { AdminProfileComponent } from './features/admin-dashboard/admin-profile/admin-profile.component';
import { ReviewTourComponent } from './features/user-dashboard/booking/review-tour/review-tour.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'tour', component: TourComponent, children: [
      { path: '', component: TourListComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordRequestComponent },
  { path: 'reset-password/verify', component: ResetPasswordVerifyComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'client/dashboard', component: UserDashboardComponent, children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'bookings', component: BookingComponent },
      // { path: 'bookings', component: BookingComponent, children:[
      //   {path: 'review/:id', component: ReviewTourComponent}
      // ] },
      { path: 'payments', component: PaymentComponent },
      { path: 'reviews', component: ReviewComponent },
      { path: 'logout', component: ReviewComponent },
      // ! { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin/dashboard', component: AdminDashboardComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {path: '', component: AdminProfileComponent},
      {path: 'profile', component: AdminProfileComponent},
      {path: 'logout', component: AdminLogoutComponent},
      {
        path: 'admins', component: AdminComponent, children: [
          { path: 'create', component: CreateAdminComponent },
          { path: 'edit/:id', component: EditAdminComponent },
          { path: 'delete/:id', component: DeleteAdminComponent },
          { path: ':id', component: SingleAdminComponent },
          { path: '', component: ListAdminsComponent },
        ]
      },
      {
        path: 'bookings', component: BookingComponent, children: [
          { path: '', component: ListBookingsComponent },
          { path: ':id', component: SingleBookingComponent },
          { path: 'create', component: CreateBookingComponent },
          { path: 'edit/:id', component: EditBookingComponent },
          { path: 'delete/:id', component: DeleteBookingComponent },
        ]
      },
      {
        path: 'categories', component: CategoryComponent, children: [
          { path: '', component: ListCategoriesComponent },
          { path: ':id', component: SingleCategoryComponent },
          { path: 'create', component: CreateCategoryComponent },
          { path: 'edit/:id', component: EditCategoryComponent },
          { path: 'delete/:id', component: DeleteCategoryComponent },
        ]
      },
      {
        path: 'clients', component: ClientComponent, children: [
          { path: 'create', component: CreateClientComponent },
          { path: 'edit/:id', component: EditClientComponent },
          { path: 'delete/:id', component: DeleteClientComponent },
          { path: ':id', component: SingleClientComponent },
          { path: '', component: ListClientsComponent },
        ]
      },
      {
        path: 'payments', component: PaymentComponent, children: [
          { path: '', component: ListPaymentsComponent },
          { path: ':id', component: SinglePaymentComponent },
          { path: 'create', component: CreatePaymentComponent },
          { path: 'edit/:id', component: EditPaymentComponent },
          { path: 'delete/:id', component: DeletePaymentComponent },
        ]
      },
      {
        path: 'reviews', component: ReviewComponent, children: [
          { path: '', component: ListReviewsComponent },
          { path: ':id', component: SingleReviewComponent },
          { path: 'create', component: CreateReviewComponent },
          { path: 'edit/:id', component: EditReviewComponent },
          { path: 'delete/:id', component: DeleteReviewComponent },
        ]
      },
      {
        path: 'tours', component: TourComponent, children: [
          { path: 'create', component: CreateTourComponent },
          { path: 'edit/:id', component: EditTourComponent },
          { path: 'delete/:id', component: DeleteTourComponent },
          { path: ':id', component: SingleTourComponent },
          { path: '', component: ListToursComponent },
        ]
      },
      {
        path: 'users', component: UserComponent, children: [
          { path: 'create', component: CreateUserComponent },
          { path: 'edit/:id', component: EditUserComponent },
          { path: 'delete/:id', component: DeleteUserComponent },
          { path: ':id', component: SingleUserComponent },
          { path: '', component: ListUsersComponent },
        ]
      },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
