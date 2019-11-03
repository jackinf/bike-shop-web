import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      margin: '0 auto',
    },
    checkoutButton: {
      marginTop: 10
    }
  }),
);