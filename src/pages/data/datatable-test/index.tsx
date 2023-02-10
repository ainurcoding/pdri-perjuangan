// ** React Import
import React from 'react'
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridRowId } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import IconifyIcon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import DataTable from 'react-data-table-component'
import axios from 'axios'

// ** Store & Actions Import
import { useDispatch, useSelector } from 'react-redux'

// Calon Pemilih Data Interface
interface CPData {
  id: number
  nama_calon: string
  nama_caleg: string
  relawan_pengunjung: string
  provinsi: string
  kab_kota: string
  kec: string
  kel: string
  RW: number
  RT: number
  catatan_kunjungan: string
  tanggal_kunjungan_terakhir: string
}

const index = () => {
  const [calonPemilih, setCPData] = useState<CPData>()
  const [search, setSearch] = useState<string>("")
  const [filteredCalonPemilih, setFilteredCP] = useState<string>("")

  const getCPData = async () => {
    await fetch('http://localhost:8080/calon_pemilih')
      .then(response => response.json())
      .then(
        (data) => 
        setCPData(data)
        )
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getCPData()
  }, [])

  
  const columns = [
    {
      name: "Nama Calon",
      selector: (row: { nama_calon: any }) => row.nama_calon,
      sortable: true,
    },
    {
      name: "Nama Caleg",
      selector: (row: { nama_caleg: any}) => row.nama_caleg
    },
    {
      name: "Relawan Pengunjung",
      selector: (row: { relawan_pengunjung: string }) => row.relawan_pengunjung
    },
    {
      name: "Provinsi",
      selector: (row: {provinsi: string}) => row.provinsi
    },
    {
      name: "Kabupaten/Kota",
      selector: (row: {kab_kota: string}) => row.kab_kota
    },
    {
      name: "Kecamatan",
      selector: (row: {kec: string}) => row.kec
    },
    {
      name: "Kelurahan",
      selector: (row: {kel: string}) => row.kel
    },
    {
      name: "RT",
      selector: (row: {RT: number}) => row.RT 
    },
    {
      name: "RW",
      selector: (row: {RW: number}) => row.RW
    },
    {
      name: "Catatan Kunjungan",
      selector: (row: {catatan_kunjungan: string}) => row.catatan_kunjungan
    },
    {
      name: "Tanggal Kunjungan Terakhir",
      selector: (row: {tanggal_kunjungan_terakhir: string}) => row.tanggal_kunjungan_terakhir
    },

  ]

  return <>
  <DataTable
      title="Data Calon Pemilih"
      columns={columns}
      data={calonPemilih}
      pagination
      fixedHeader
      fixedHeaderScrollHeight='400px'
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      action={
        <button className='btn btn-info btn-sm'></button>
      }
      subHeader
      // subHeaderComponent={
      //   <input type="text" placeholder='Search here' className='w-25 form-control' value={search} onChange={(e) => setSearch(e.target.value)} />
      // }
    // subHeaderAlign="cemter" // center/left/right
    />
  </>
}

export default index
