import { SignUp } from "@clerk/clerk-react";
const SignUpPage = () => (
  <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <SignUp routing="path" path="/signup" />
  </div>
);
export default SignUpPage;
