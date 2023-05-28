import React, { useContext } from 'react';
import { AppBar as MUIAppBar, Box, Button, Toolbar, Typography, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import { Adb, Logout } from '@mui/icons-material';
import { navigationActionData } from '../BottomNavigation/BottomNavigation.constants';
import { AppContext } from '../../App';
import { setCookie } from 'typescript-cookie';

type AppBarProps = {};

export const AppBar = (props: AppBarProps) => {
  const isUserLoggedIn = true;
  const isCoachLoggedIn = false;
  const isAdminLoggedIn = false;
  const isNotLoggedIn = false;
  const { isAuthenticated } = useContext(AppContext);

  const handleLogout = () => {
    setCookie('userToken', undefined);
  };

  return (
    <MUIAppBar>
      <Container>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            sx={{ py: 1 }}
          >
            <Box display="flex" alignItems="center">
              <Adb sx={{ display: { mobile: 'none', desktop: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  color: 'inherit',
                  display: { mobile: 'none', desktop: 'flex' },
                  textDecoration: 'none',
                  mr: 2,
                }}
              >
                LiftLife
              </Typography>
              <Box display="flex" sx={{ gap: 1 }}>
                {isNotLoggedIn &&
                  navigationActionData.notLoggedIn.map(item => (
                    <Button key={item.label} variant="contained" disableElevation>
                      {item.label}
                    </Button>
                  ))}
                {isUserLoggedIn &&
                  navigationActionData.userLoggedIn.map(item => (
                    <Button key={item.label} variant="contained" disableElevation>
                      {item.label}
                    </Button>
                  ))}
                {isCoachLoggedIn &&
                  navigationActionData.coachLoggedIn.map(item => (
                    <Button key={item.label} variant="contained" disableElevation>
                      {item.label}
                    </Button>
                  ))}
                {isAdminLoggedIn &&
                  navigationActionData.adminLoggedIn.map(item => (
                    <Button key={item.label} variant="contained" disableElevation>
                      {item.label}
                    </Button>
                  ))}
              </Box>
            </Box>
            {isAuthenticated && (
              <Box>
                <IconButton onClick={handleLogout}>
                  <Logout sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
};
