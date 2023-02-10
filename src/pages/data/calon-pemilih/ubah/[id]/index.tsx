import React from 'react'

// ** import mui
import { Grid, Card, CardContent, CardHeader, TextField, Button, Box, Typography } from '@mui/material'

const UbahCalonPemilih = () => {
  return (
    <Box>
      <Grid item xs={12} sx={{ marginBottom: '50px' }}>
        <Card>
          <CardContent>
            <CardHeader title='Ubah Calon Pemilih'></CardHeader>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: '50px' }}>
        <Card>
          <CardContent>
            <CardHeader title='Data Kunjungan'></CardHeader>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  )
}

export default UbahCalonPemilih