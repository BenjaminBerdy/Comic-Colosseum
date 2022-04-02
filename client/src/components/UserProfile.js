import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from './account/account-profile';
import { AccountProfileDetails } from './account/account-profile-details';
import AppBanner from "./AppBanner";


function UserProfile (){
    return(
      <div>
            <AppBanner/><br/>
            <h1>User Profile Page</h1>

        </div>
    )
}

export default UserProfile;
