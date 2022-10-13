import { useState } from 'react'
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material'

const SelectRole = () => {
    const [error, setError] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    return (
        <form>
            <FormControl error={error} style={{ width: '200px' }}>
                <InputLabel htmlFor="role">Select Age</InputLabel>
                <Select
                    name="role"
                    value={selectedValue}
                    onChange={e => setSelectedValue(e.target.value)}>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
                {error && <FormHelperText>Select a value</FormHelperText>}
            </FormControl>
            <br />
        </form>
    )
}
export default SelectRole
