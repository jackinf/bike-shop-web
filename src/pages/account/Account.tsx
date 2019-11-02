import React from 'react';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../components/Auth/AuthProvider';

interface Props {}

function Account(props: Props) {
  return (
    <div>
      Account

      <AuthContext.Consumer>
        {({tokenMetadata, handleRefreshToken}) => (
          <div>
            {tokenMetadata && (
              <>
                <p style={{wordBreak: 'break-all'}}>
                  Token: {tokenMetadata.token}
                </p>
                <p style={{wordBreak: 'break-all'}}>
                  Refresh token: {tokenMetadata.refreshToken}
                </p>
                <p style={{wordBreak: 'break-all'}}>
                  Expiration date: {`${tokenMetadata.expirationDate}`}
                </p>
                <p>
                  <Button variant="contained" color="primary" onClick={handleRefreshToken}>Refresh token</Button>
                </p>
              </>
            )}
          </div>
        )}
      </AuthContext.Consumer>
    </div>
  );
}

export default Account;
