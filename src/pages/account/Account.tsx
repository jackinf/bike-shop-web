import React from 'react';
import { AuthContext } from '../../components/Auth/AuthProvider';

interface Props {}

function Account(props: Props) {
  return (
    <div>
      Account

      <AuthContext.Consumer>
        {({token}) => (
          <p style={{wordBreak: 'break-all'}}>
            {token}
          </p>
        )}
      </AuthContext.Consumer>
    </div>
  );
}

export default Account;
