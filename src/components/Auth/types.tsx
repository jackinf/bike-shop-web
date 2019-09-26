export interface ContextSettings {
  loading: boolean;
  emailLoginInProgress: boolean;
  token?: string;
  errorInfo?: ErrorInfo | null;
  clearErrorInfo: () => void;
  handleEmailLogin: (email: string, pass: string) => void;
  handleLogout: () => void;
  handleGoogleLoginSuccess: (payload: any) => Promise<void>;
  handleGoogleLoginFailure: (error: any) => void;
}

export interface ErrorInfo {
  code: string;
  message: string;
}