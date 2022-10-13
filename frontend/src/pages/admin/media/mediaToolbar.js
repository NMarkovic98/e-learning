import React from 'react'

import {
    GridToolbarExport,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid'

import { GridToolbarQuickFilter } from '@mui/x-data-grid'

import { Box } from '@mui/material'

function MediaToolbar() {
    return (
        <Box>
            <Box
                sx={{
                    padding: '10px 10px 10px 10px',
                    display: 'flex',
                    flexDirection: {
                        xl: 'row',
                        lg: 'row',
                        md: 'row',
                        sm: 'column-reverse',
                        xs: 'column-reverse',
                    },
                    justifyContent: 'space-between',
                }}>
                <Box pr={5} sx={{ diplay: 'flex' }}>
                    <GridToolbarColumnsButton
                        sx={{
                            fontSize: {
                                sm: '7px',
                                xs: '7px',
                                lg: '10px',
                                xl: '10px',
                                xxl: '10px',
                            },
                            marginRight: {
                                sm: '',
                                xs: '',
                                md: '10px',
                                lg: '10px',
                                xl: '10px',
                                xxl: '10px',
                            },
                        }}
                    />
                    <GridToolbarFilterButton
                        sx={{
                            fontSize: {
                                sm: '7px',
                                xs: '7px',
                                lg: '10px',
                                xl: '10px',
                                xxl: '10px',
                            },
                            marginRight: {
                                sm: '',
                                xs: '',
                                md: '10px',
                                lg: '10px',
                                xl: '10px',
                                xxl: '10px',
                            },
                        }}
                    />
                    <GridToolbarDensitySelector
                        sx={{
                            fontSize: {
                                sm: '7px',
                                xs: '7px',
                                lg: '10px',
                                xl: '10px',
                                xxl: '10px',
                            },
                            marginRight: {
                                sm: '',
                                xs: '',
                                md: '10px',
                                lg: '10px',
                                xl: '10px',
                                xxl: '10px',
                            },
                        }}
                    />
                    <GridToolbarExport
                        sx={{
                            fontSize: {
                                sm: '7px',
                                xs: '7px',
                                lg: '10px',
                                xl: '10px',
                                xxl: '10px',
                            },
                            marginRight: {
                                sm: '',
                                xs: '',
                                md: '10px',
                                lg: '10px',
                                xl: '10px',
                                xxl: '10px',
                            },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: {
                            sm: '100%',
                            xs: '100%',
                            md: '200px',
                            lg: '200px',
                            xl: '200px',
                            xxl: '200px',
                        },
                    }}
                    pr={4}>
                    <GridToolbarQuickFilter
                        sx={{
                            marginBottom: {
                                sm: '10px',
                                xs: '10px',
                                md: '',
                                lg: '',
                                xl: '',
                                xxl: '',
                            },
                            fontSize: '10px',
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
export default MediaToolbar
