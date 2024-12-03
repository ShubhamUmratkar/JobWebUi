// admin.model.ts
export interface Admin {
  id: number; // Admin's unique ID
  name: string; // Admin's name
  mobileNo: string; // Admin's mobile number
  username: string; // Admin's username
  password: string; // Admin's password (Note: Avoid storing sensitive info like password in frontend)
  email: string; // Admin's email
}
