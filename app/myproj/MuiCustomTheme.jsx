import React from 'react';
import { Box, styled } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  height: '250px',
  width: '250px',
  backgroundColor: theme.palette.grey[800] // fallback to grey
}));

export const MuiCustomTheme = () => {
  return (
    <>
      <Box
        sx={{
          height: '250px',
          width: {
            xs: 100,
            sm: 200,
            md: 300,
            lg: 400,
            xl: 500
          },
          bgcolor: 'secondary.main'
        }}
      />
      <StyledBox />
    </>
  );
};
