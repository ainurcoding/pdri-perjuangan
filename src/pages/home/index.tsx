// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Types Imports
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
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
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const Home = () => {
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

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel id='invoice-status-select'>Jenis Caleg</InputLabel>

                    <Select
                      fullWidth
                      value={statusValue}
                      sx={{ mr: 4, mb: 2 }}
                      label='Jenis Caleg'
                      onChange={handleStatusValue}
                      labelId='invoice-status-select'
                    >
                      <MenuItem value=''>none</MenuItem>
                      <MenuItem value='dpr'>DPR</MenuItem>
                      <MenuItem value='dpd'>DPD</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label='Periode'
                        end={endDateRange as number | Date}
                        start={startDateRange as number | Date}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant='contained' type='submit' sx={{ mr: 4 }}>
                    Cari
                  </Button>
                  <Button type='reset' variant='contained' color='error' onClick={() => reset()}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Kick start your project 🚀'></CardHeader>
            <CardContent>
              <Typography sx={{ mb: 2 }}>All the best for your new project.</Typography>
              <Typography>
                Please make sure to read our Template Documentation to understand where to go from here and how to use our
                template.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='ACL and JWT 🔒'></CardHeader>
            <CardContent>
              <Typography sx={{ mb: 2 }}>
                Access Control (ACL) and Authentication (JWT) are the two main security features of our template and are implemented in the starter-kit as well.
              </Typography>
              <Typography>Please read our Authentication and ACL Documentations to get more out of them.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Home
