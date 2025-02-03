import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';

const LoginProgressCard = ({ loading }) => {
    return (
        <Card sx={{ maxWidth: 300, p: 2, textAlign: 'center' }}>
            <CardContent>
                <Stack spacing={2} alignItems="center">
                    <Typography variant="h6">{loading ? 'Checking credentials' : 'Welcome'}</Typography>
                    {loading && <CircularProgress size="3rem" />}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default LoginProgressCard;