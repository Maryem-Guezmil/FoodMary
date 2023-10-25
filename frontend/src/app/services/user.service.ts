import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IuserLogin } from '../shared/Interfaces/IuserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IuserRegister } from '../shared/Interfaces/Iuserregister';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //to expose user data outside of user service
  // <User> => type
  //new User() => initial value
  /*behvioursubject has read and write mode inside it but we won't anything 
outside of the serveice to write anything inside the subj,
so we just need to expose the user obs that is infact user subject that is converted to obs*/
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStoarge()
  );
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    //userObservable is th only read only version of userSubj
    this.userObservable = this.userSubject.asObservable();
  }
  public get CurrentUser ():User{
    return this.userSubject.value;
  }
  //u cannot create a new instance from an interface
  login(userLogin: IuserLogin): Observable<User> {
    // u wanna send http req to server to user login url
    //<useR>=> return type : we wanna get user from the server
    /*we gonna use pipe bc if u use subscribe the return type will be suspscription not obs
    but the case u want only tap the result without changing it's value+without breaking the flow of obs,
    u can pipe ur obs with tap function(part of rxjs) where his next member ll handle the happy reslt..*/
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          //update user subj tq we r gettein new user from server
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to FoodMary ${user.name}!`,
            'Login Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        },
      })
    );
  }

  register(userRegiser: IuserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to the Foodmary ${user.name}`,
            'Register Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        },
      })
    );
  }

  logout() {
    // the newt value of user subj should be empty user
    this.userSubject.next(new User());
    localStorage.removeItem('user');
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  private getUserFromLocalStoarge(): User {
    const userJson = localStorage.getItem('user');
    //parse user json and convert it to userobj
    if (userJson) return JSON.parse(userJson) as User;
    //new empty user
    return new User();
  }
}
