import { HttpInterceptorFn } from '@angular/common/http';
import { LoginResponse } from '../models/idp/Login';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  parsedResponse: LoginResponse;
  req = req.clone({
    
    setHeaders: {
      // 'Content-Type': 'application/json',
      'x-api-key': 'cd3509e4-9848-4f70-9047-ce26bdd367ag',
      'x-partner-key': 'P10001'
    }
  });
  let loginResponse = localStorage.getItem('currentUser') ?? "";
  if (loginResponse) {
    
   const parsedResponse = JSON.parse(loginResponse);
     if (parsedResponse.tokenInfo && parsedResponse.tokenInfo.accessToken) {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${parsedResponse.tokenInfo.accessToken}`
        }
      });
    
  }
}
  return next(req);
};
