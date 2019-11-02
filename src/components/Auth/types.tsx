export interface ContextSettings {
  loading: boolean;
  emailLoginInProgress: boolean;
  token?: string;
  tokenMetadata?: TokenMetadata;
  errorInfo?: ErrorInfo | null;
  clearErrorInfo: () => void;
  handleEmailLogin: (email: string, pass: string) => void;
  handleLogout: () => void;
  handleRefreshToken: () => void;
  handleGoogleLoginSuccess: (payload: any) => Promise<void>;
  handleGoogleLoginFailure: (error: any) => void;
}

export interface ErrorInfo {
  code: string;
  message: string;
}

export interface TokenMetadata {
  token: string;
  refreshToken: string;
  expirationDate: any;
}