export interface ContextSettings {
  loading: boolean;
  token?: string;
  handleGoogleSignOut: () => void;
  handleGoogleLoginSuccess: (payload: any) => Promise<void>;
  handleGoogleLoginFailure: (error: any) => void;
}
