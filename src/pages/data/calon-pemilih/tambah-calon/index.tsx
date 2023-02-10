// ** React Imports
import * as React from 'react'

// ** Next imports
import Link from 'next/link'

//** Mui imports */
import {
  Card,
  CardContent,
  Grid,
  Paper,
  Box,
  TextField,
  CardHeader,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  tableCellClasses,
  styled
} from '@mui/material'

import { makeStyles } from '@mui/material'

const TambahCalonPemilih = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    [`&.${Button}`]: {
      backgroundColor: '#5B9BD5'
    }
  }))

  // for table section
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#5B9BD5',
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }))

  function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein }
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ]

  type AppProps = {
    message: string
  }
  // end of for table section

  return (
    <Box>
      <Grid item xs={12} sx={{ marginBottom: '50px' }}>
        <Card>
          <CardContent>
            <CardHeader title='Tambah calon pemilih'></CardHeader>
            <Grid container style={{ gap: 15 }} ml={5}>
              <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  sx={{ width: '30%' }}
                  size='small'
                  id='outlined-password-input'
                  label='Nama'
                  type='text'
                  autoComplete='current-password'
                />
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  sx={{ width: '30%' }}
                  size='small'
                  id='outlined-password-input'
                  label='NIK'
                  type='text'
                  autoComplete='current-password'
                />
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  sx={{ width: '30%' }}
                  multiline={true}
                  rows={3}
                  name='Alamat'
                  label='Alamat'
                  placeholder='Alamat'
                  autoComplete='off'
                  variant='outlined'

                  // value={description}
                  // onChange={e => setDescription(e.target.value)}
                />
              </Grid>
              <Grid container display={'flex'} m={5}>
                <Grid xs={2} sm={2} md={2} lg={2} xl={2}>
                  <input style={{ display: 'none' }} id='upload-photo' name='upload-photo' type='file' />
                  <Button
                    className='bg-primary'
                    variant='contained'
                    sx={{ width: '100px', height: '50px', fontSize: '14px' }}
                  >
                    <label htmlFor='upload-photo'>Upload Photo</label>
                  </Button>
                </Grid>
                <Grid xs={2} sm={2} md={2} lg={2} xl={2}>
                  <input style={{ display: 'none' }} id='upload-ktp' name='upload-ktp' type='file' />
                  <Button
                    className='bg-primary'
                    variant='contained'
                    sx={{ width: '100px', height: '50px', fontSize: '14px' }}
                  >
                    <label htmlFor='upload-photo'>Upload KTP</label>
                  </Button>
                </Grid>
              </Grid>
              <Grid container justifyContent={'flex-end'} mr={5}>
                <Button className='bg-primary' variant='contained' size='small'>
                  Tambah
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <CardHeader title={'Data Kunjungan'}></CardHeader>
            <Grid container ml={5} style={{ gap: 15 }}>
              <Grid className='button-to-tambahkunjungan'>
                <Button className='bg-primary' variant='contained' size='small'>
                  <Link className='textDecorationNone text-white' href='/data/calon-pemilih/tambah-kunjungan'>
                    Tambah Kunjungan
                  </Link>
                </Button>
              </Grid>
              <Grid className='table-tambahkunjungan'>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>No</StyledTableCell>
                        <StyledTableCell align='right'>Nama Caleg</StyledTableCell>
                        <StyledTableCell align='right'>Nama Relawan</StyledTableCell>
                        <StyledTableCell align='right'>Status</StyledTableCell>
                        <StyledTableCell align='right'>Catatan Kunjungan</StyledTableCell>
                        <StyledTableCell align='right'>Tanggal Kunjungan</StyledTableCell>
                        <StyledTableCell align='right'>Foto Kunjungan</StyledTableCell>
                        <StyledTableCell align='right'>
                          <Grid display={'flex'} justifyContent='center'>
                            <p>Aksi</p>
                          </Grid>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component='th' scope='row'>
                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell align='right'>{row.calories}</StyledTableCell>
                          <StyledTableCell align='right'>{row.fat}</StyledTableCell>
                          <StyledTableCell align='right'>{row.carbs}</StyledTableCell>
                          <StyledTableCell align='right'>{row.protein}</StyledTableCell>
                          <StyledTableCell align='right'>{row.protein}</StyledTableCell>
                          <StyledTableCell align='right'>{row.protein}</StyledTableCell>
                          <StyledTableCell align='right'>
                            <Grid display={'flex'}>
                              <Button className='detail'>
                                <Link href='/data/calon-pemilih/detail'>
                                  <i className='bi bi-eye-fill clrBlue'></i>
                                </Link>
                              </Button>
                              <Button className='edit '>
                                <i className='bi bi-pencil-fill clrYellow'></i>
                              </Button>
                              <Button className='delete '>
                                <i className='bi bi-trash-fill clrDanger'></i>
                              </Button>
                            </Grid>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Box>
  )
}

export default TambahCalonPemilih
