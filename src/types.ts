export type Language = 'ar' | 'en';

export type AuthMode = 'login' | 'register';

export type LoginStep = 'phone_input' | 'otp_verification';

export type AppView = 'auth' | 'home';

export interface CountryCode {
  code: string;
  nameAr: string;
  nameEn: string;
  dialCode: string;
  flag: string;
  placeholder: string;
}

export interface UserFormData {
  fullName?: string;
  phoneNumber: string;
  countryCode: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  rememberMe: boolean;
  userType?: 'parent' | 'teacher';
}
