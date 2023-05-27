import React from 'react';
import { Button as MuiButton } from '@mui/material';

type ButtonType = {
  children: string;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  wide?: boolean;
};

export const Button = (props: ButtonType) => {
  return (
    <MuiButton
      variant="contained"
      size="small"
      disabled={props.disabled}
      type={props.type}
      sx={{ ...(props.wide && { px: 4 }) }}
    >
      {props.children}
    </MuiButton>
  );
};
