import { SignIn } from "@clerk/clerk-react";
const LoginPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <SignIn routing="path" path="/login" theme="dark" />
  </div>
);
export default LoginPage;
