// ** Next Import
import Link from 'next/link'
import { GetStaticProps } from 'next/types'

// ** Axios import
import axios from 'axios'

// ** React Imports
import { useState, useEffect, forwardRef } from 'react'
import * as React from 'react'
// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Types Imports
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Page Header Props
import PageHeader from 'src/@core/components/page-header'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Interface } from 'readline'

interface Post {
  id: number
  nama_calon: string
  nama_caleg: string
  relawan_pengunjung: string
  provinsi: string
  kab_kota: string
  kec: string
  kel: string
  RT: number
  RW: number
  catatan_kunjungan: string
  tanggal_kunjungan_terakhir: string
}

interface Props {
  posts: Post[]
}

const defaultValues = {
  newPassword: '',
  currentPassword: '',
  confirmNewPassword: ''
}

const schema = yup.object().shape({
  currentPassword: yup.string().min(8).required(),
  newPassword: yup
    .string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
    )
    .required(),
  confirmNewPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
})

/* eslint-disable */
/* eslint-enable */

const CalonPemilih = ({ posts }: Props) => {
  const [dataCaleg, setDataCaleg] = useState([])

  // fetch from PDRI fake data
  useEffect(() => {
    fetch('http://localhost:8080/calon_pemilih')
      .then(response => response.json())
      .then(
        (data) => 
        setDataCaleg(data)
        )
      .catch(error => console.error(error))
  }, [])
  // ** State
  const [dates, setDates] = useState<Date[]>([])
  const [statusValue, setStatusValue] = useState<string>('')
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [startDateRange, setStartDateRange] = useState<DateType>(null)

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(schema) })

  const handleStatusValue = (e: SelectChangeEvent) => {
    setStatusValue(e.target.value)
  }

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  // fake id
  const id: number = 1

  return (
    <DatePickerWrapper>
      {/* {JSON.stringify(dataCaleg)} */}
      <Grid container spacing={6}>
        <PageHeader title='Data calon Pemilih'></PageHeader>
        {/* Form section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid display={'flex'}>
                <Grid container spacing={2} sx={{ width: 1 }}>
                  <Grid item container rowSpacing={4} xs={12} sm={6} md={2} lg={2} xl={2}>
                    <Grid item sx={{ width: '100%', height: '25%' }}>
                      <TextField id='outlined-basic' label='Nama Caleg' variant='outlined' size='small' />
                    </Grid>
                    <Grid item sx={{ width: '100%', height: '25%' }}>
                      <TextField id='outlined-basic' label='Nama Relawan  ' variant='outlined' size='small' />
                    </Grid>
                  </Grid>
                  <Grid item container rowSpacing={4} xs={12} sm={6} md={2} lg={2} xl={2}>
                    <Grid item sx={{ width: '100%', height: '25%' }}>
                      <TextField id='outlined-basic' label='Provinsi' variant='outlined' size='small' />
                    </Grid>
                    <Grid item sx={{ width: '100%', height: '25%' }}>
                      <TextField id='outlined-basic' label='Kab/kota' variant='outlined' size='small' />
                    </Grid>
                  </Grid>
                  <Grid item container rowSpacing={4} xs={12} sm={6} md={2} lg={2} xl={2}>
                    <Grid item sx={{ width: '100%', height: '25%' }}>
                      <TextField id='outlined-basic' label='Kecamatan' variant='outlined' size='small' />
                    </Grid>
                    <Grid item sx={{ width: '100%', height: '25%' }}>
                      <TextField id='outlined-basic' label='kelurahan' variant='outlined' size='small' />
                    </Grid>
                  </Grid>
                  <Grid item container rowSpacing={4} xs={12} sm={6} md={2} lg={2} xl={2}>
                    <Grid item sx={{ width: '100%', height: '25%' }}>
                      <TextField id='outlined-basic' label='RT' variant='outlined' size='small' />
                    </Grid>
                    <Grid item sx={{ width: '100%', height: '25%' }}>
                      <TextField id='outlined-basic' label='RW' variant='outlined' size='small' />
                    </Grid>
                  </Grid>
                  <Grid item container rowSpacing={0} xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Grid item sx={{ width: '50%', height: 'max-content' }}>
                      <Button className='bg-primary' size='small' variant='contained' type='submit' sx={{ mr: 4 }}>
                        Cari
                      </Button>
                    </Grid>
                    <Grid item sx={{ width: '50%', height: 'max-content' }}>
                      <Button
                        className='btnDanger'
                        size='small'
                        type='reset'
                        variant='contained'
                        color='error'
                        onClick={() => reset()}
                      >
                        Reset
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* table and add data section */}
        <Grid item xs={12}>
          <Card>
            <Grid sx={{ width: 1, m: '20px' }}>
              <Button className='bg-primary' size='small' type='reset' variant='contained' color='info'>
                <Link style={{ textDecoration: 'none', color: 'white' }} href='/data/calon-pemilih/tambah-calon'>
                  Tambah
                </Link>
              </Button>
            </Grid>
            <Box ml={5} className='table-responsive '>
              <table className='table w-max-content'>
                <thead>
                  <tr className='tableBlue bg-primary'>
                    <th>No</th>
                    <th>Nama Calon</th>
                    <th>Nama Caleg</th>
                    <th>Relawan Pengunjung</th>
                    <th>Provinsi</th>
                    <th>Kab / Kota</th>
                    <th>Kecamatan</th>
                    <th>Keluarahan</th>
                    <th>RT</th>
                    <th>RW</th>
                    <th>Catatan Kunjungan</th>
                    <th>Tanggal Kunjungan Terakhir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  { dataCaleg.map((data:Post , index:number) => (
                    <tr key={index}>
                    <td>1</td>
                    <td>{data.nama_calon}</td>
                    <td>{data.nama_caleg}</td>
                    <td>{data.relawan_pengunjung}</td>
                    <td>{data.provinsi}</td>
                    <td>{data.kab_kota}</td>
                    <td>{data.kec}</td>
                    <td>{data.kel}</td>
                    <td>{data.RT}</td>
                    <td>{data.RW}</td>
                    <td>{data.catatan_kunjungan}</td>
                    <td>{data.tanggal_kunjungan_terakhir}</td>
                    <td>
                      <Box className='d-flex gap-2'>
                      <Link href='/'>
                        test
                      </Link>
                      <Link href='/'>
                        test
                      </Link>
                      <Link href='/'>
                        test
                      </Link>
                      </Box>
                    </td>
                  </tr>
                  ))}
                  
                </tbody>
              </table>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

// export const getStaticProps = async () => {
//   const res = await axios.get<Post[]>('http://localhost:8080/calon_pemilih');
//   const posts = res.data;

//   return {
//     props: {
//       posts,
//     },
//   }
// }

export default CalonPemilih
