import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from './account/account-profile';
import { AccountProfileDetails } from './account/account-profile-details';

function UserProfile (){
    return(<>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="lg">
            <Typography
              sx={{ mb: 3 }}
              variant="h4"
            >
              User Profile
            </Typography>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                <AccountProfile />
              </Grid>
              <Grid
                item
                lg={8}
                md={6}
                xs={12}
              >
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>)
}

export default UserProfile;
