import React from 'react'

// ** import mui
import {
  InputLabel,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const TambahKunjungan = () => {
  // ** current date
  const [age, setAge] = React.useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  return (
    <Box>
      <Grid item xs={12} sx={{ marginBottom: '50px' }}>
        <Card>
          <CardContent>
            <CardHeader title='Tambah Kunjungan'></CardHeader>
            <Box className='formWrapper' ml={5}>
              <form action='' className='d-flex flex-column gap-2'>
                <Grid className='namaCaleg'>
                  <TextField
                    autoFocus
                    variant='outlined'
                    label='nama caleg'
                    placeholder='Masukkan nama caleg'
                    className='w-50'
                    type='text'
                  />
                </Grid>
                <Grid className='namaRelawanPengunjung d-flex flex-column'>
                  <TextField
                    autoFocus
                    variant='outlined'
                    label='Nama relawan pengunjung'
                    placeholder='Masukkan nama relawan'
                    className='w-50'
                    type='text'
                  />
                </Grid>
                <Grid className='Tanggal Kunjungan d-flex flex-column'>
                  <Typography variant='caption'>Tanggal Kunjungan</Typography>
                  <TextField autoFocus className='w-50' type='date' />
                </Grid>
                <Grid className='statusKunjungan d-flex flex-column'>
                  <Typography variant='caption'>Status</Typography>
                  <Select
                    labelId='demo-simple-select-autowidth-label'
                    id='demo-simple-select-autowidth'
                    value={age}
                    onChange={handleChange}
                    autoWidth
                    label='Age'
                    className='w-50'
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Status 1</MenuItem>
                    <MenuItem value={21}>Status 2</MenuItem>
                    <MenuItem value={22}>Status 3</MenuItem>
                  </Select>
                </Grid>
                <Grid className='catatanKunjungan'>
                  <TextField
                    className='w-50'
                    multiline={true}
                    rows={3}
                    name='CatatanKunjungan'
                    label='Catatan Kunjungan'
                    placeholder='Masukan catatan kunjungan'
                    autoComplete='off'
                    variant='outlined'

                    // value={description}
                    // onChange={e => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid className='fotoKunjungan'>
                  <input style={{ display: 'none' }} id='upload-photo' name='upload-photo' type='file' />
                  <Button className='bg-primary' variant='contained'>
                    <label htmlFor='upload-photo'>Upload Photo kunjungan</label>
                  </Button>
                </Grid>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  )
}

export default TambahKunjungan
