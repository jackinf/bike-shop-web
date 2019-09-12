export interface ContextSettings {
  token?: string;
  handleGoogleSignOut: () => void;
  handleGoogleLoginSuccess: (payload: any) => Promise<void>;
  handleGoogleLoginFailure: (error: any) => void;
}