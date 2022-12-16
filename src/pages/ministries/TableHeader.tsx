
import Link from 'next/link'


import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { GridRowId } from '@mui/x-data-grid'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, selectedRows, handleFilter } = props

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Select
        size='small'
        displayEmpty
        defaultValue=''
        sx={{ mr: 4, mb: 2 }}
        disabled={selectedRows && selectedRows.length === 0}
        renderValue={selected => (selected.length === 0 ? 'Actions' : selected)}
      >
        <MenuItem disabled>Actions</MenuItem>
        <MenuItem value='Delete'>Delete</MenuItem>
        <MenuItem value='Edit'>Edit</MenuItem>
        <MenuItem value='Send'>Send</MenuItem>
      </Select>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search Ministry'
          sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2 }} component={Link} variant='contained' href='#'>
          Create Ministry
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
