import * as React from 'react';
import Switch from '@mui/joy/Switch';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function ExampleTrackChild() {
  const [isActive, setIsActive] = React.useState(true);

  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
      <Switch
        checked={isActive}
        onChange={(event) => setIsActive(event.target.checked)}
        slotProps={{
          track: {
            children: isActive ? (
              <Typography component="span" level="inherit" sx={{ m:'8px',color: '#EEEEEE' }}>
                Active
              </Typography>
            ) : (
              <Typography component="span" level="inherit" sx={{ m:'8px',color: '#15144E' }}>
                Inactive
              </Typography>
            ),
          },
          thumb: {
            children: isActive ? (
              <Typography component="span" level="inherit" sx={{ color: '#15144E' }}>
                Inactive
              </Typography>
            ) : (
              <Typography component="span" level="inherit" sx={{color: '#EEEEEE' }}>
                Active
              </Typography>
            ),
          },
        }}
        sx={{
          '--Switch-thumbSize': '50%',
          '--Switch-trackWidth': '100%',
          '--Switch-trackHeight': '2%',
          '--Switch-thumbHeight': '100%',
          '--Switch-thumbBackground': isActive ? '#EEEEEE' : '#15144E',
          '--Switch-trackBackground': isActive ? '#15144E' : '#EEEEEE',
          width: '100%',
          '& .MuiSwitch-track': {
            backgroundColor: isActive ? '#15144E' : '#EEEEEE',
          },
          '& .MuiSwitch-thumb': {
            backgroundColor: isActive ? '#EEEEEE' : '#15144E',
          },
          '@media (max-width: 600px)': {
            '--Switch-trackHeight': '30px',
            '--Switch-thumbSize': '50%',
          },
        }}
      />
    </Stack>
  );
}