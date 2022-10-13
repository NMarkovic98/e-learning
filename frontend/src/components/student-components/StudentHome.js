import * as React from 'react'

import Box from '@mui/material/Box'

import {
    Card,
    InputAdornment,
    CardContent,
    Typography,
    CardMedia,
    Select,
    InputLabel,
    CardHeader,
    Divider,
    Button,
    CircularProgress,
} from '@mui/material'
import { Helmet } from 'react-helmet'
import { useState, useEffect } from 'react'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";

import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'


const SearchBar = ({ setSearchQuery }) => (
    <form
        style={{
            height: '70px',
        }}>
        <TextField
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <SearchIcon style={{ fill: 'blue' }} />
                    </InputAdornment>
                ),
            }}
            sx={{
                '&.MuiTextField-root input': {
                    height: '30px',
                    minHeight: '30px',
                    width: {
                        xs: '100%',
                        sm: '200px',
                        md: '200px',
                        lg: '200px',
                        xl: '200px',
                    },
                },
                '@media screen and (max-width: 1000px)': {
                    marginBottom: '10%',
                },
            }}
            fullWidth
            id="search-bar"
            className="text"
            onInput={e => {
                setSearchQuery(e.target.value)
            }}
            placeholder="Search..."
            size="small"
        />
    </form>
)

export default function StudentHome() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('-')
    const [loadiong, setLoading] = useState(false)
    const [coursesLoadiong, setCoursesLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [moreLoaded, setMoreLoaded] = useState(false)
    const [filteredCourses, setFilteredCourses] = useState([])
    const search = window.location.search
    const params = new URLSearchParams(search)
    const categoryParam = params.get('category')
    const [recentCourses, setRecentCourses] = useState([])

    const useStyles = makeStyles(theme => ({
      
        menu: {
          height: 300
        }
      }));
      const classes = useStyles();
    const loadMoreCourses = () => {
        setMoreLoaded(true)
    }
    const loadLessCourses = () => {
        setMoreLoaded(false)
    }

    const onChangeCategory = e => {
        setCategory(e.target.value)
    }

    useEffect(async () => {
        setLoading(true)
        await axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listCourses`,
            )
            .then(course => {
                setCourses(course.data.response)
            })

        await axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCategories`,
            )
            .then(response => {
                setCategories(response.data.categories)
                response.data.categories.filter(category => {
                    if (category.name === categoryParam) {
                        setCategory(category.category_id)
                    }
                })
            })
        setLoading(false)
    }, [])

    useEffect(() => {
        setCategory('-')
        if (searchQuery !== '') {
            const filtered = courses.filter(course => {
                if (
                    course.name.includes(searchQuery) ||
                    course.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    course.name
                        .toUpperCase()
                        .includes(searchQuery.toUpperCase())
                ) {
                    return course
                }
            })

            setFilteredCourses(filtered)
        }
    }, [searchQuery])

    useEffect(async () => {
        if (category !== '-') {
            setCoursesLoading(true)
            await axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/getCoursesByCategory/${category}`,
                )
                .then(course => {
                    setCourses(course.data.courses)
                })
            setCoursesLoading(false)
        } else {
            setCoursesLoading(true)
            await axios
                .get(
                    `${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/listCourses`,
                )
                .then(course => {
                    setCourses(course.data.response)
                })
            setCoursesLoading(false)
        }
    }, [category])

    const proceedToCourseHandler = e => {
        const recentCourses = localStorage.getItem('recentCourses')

        const checkerArray = localStorage
            .getItem('recentCourses')
            ?.split(',')
            .filter(course => course !== 'null')
        if(checkerArray !== null){
        if (!checkerArray?.includes(e.target.id.toString())) {
            localStorage.setItem(
                'recentCourses',
                recentCourses + ',' + e.target.id,
            )
        }
    }
        navigate(`/student/courses/${e.target.id}`)
    }

    if (loadiong) {
        return <CircularProgress />
    }

    return (
        <Box display="flex" flexDirection="column">
         
            <Box justifyContent="center" display="flex" flexDirection="column">
                <Box
                    sx={{
                        '@media screen and (max-width: 1000px)': {
                            alignItems: 'center',
                            flexDirection: 'column',
                        },
                    }}
                    minWidth="90vw"
                    display="flex"
                    justifyContent="space-between">
                    {courses ? (
                        <Box
                            sx={{
                                paddingTop: {
                                    xs: '50px',
                                    sm: '50px',
                                    md: '50px',
                                    lg: '0',
                                    xl: '0',
                                },
                                paddingLeft: {
                                    md: '20px',
                                },
                                '@media screen and (max-width: 1000px)': {
                                    paddingBottom: '0',
                                    marginBottom: '3%',
                                },
                            }}
                            pb={7}>
                            <Typography variant="h3">
                                {courses.length > 0
                                    ? `Choose over ${courses.length} courses`
                                    : 'There are no available courses yet'}
                            </Typography>
                        </Box>
                    ) : (
                        <CircularProgress />
                    )}
                    <Box
                        sx={{
                            flexDirection: {
                                sm: 'row',
                                xs: 'column',
                                md: 'row',
                                lg: 'row',
                                lg: 'row',
                            },
                            width: {
                                xs: '100%',
                            },
                            paddingRight: {
                                xs: '50px',
                            },
                            paddingLeft: {
                                xs: '50px',
                            },
                            paddingTop: {
                                xs: '50px',

                                md: '50px',
                                lg: '0',
                                xl: '0',
                            },
                        }}
                        display="flex"
                        flex="1"
                        justifyContent="space-around">
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                        <FormControl sx={{ marginBottom: '5%' }}>
                            <InputLabel>Categories</InputLabel>
                            <Select
                                         MenuProps={{ className: classes.menu }}

                                sx={{ minWidth: '200px' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Categories"
                                onChange={onChangeCategory}>
                                <MenuItem value={'-'}>{'-'}</MenuItem>
                                {categories.map(categoryObj => {
                                    return (
                                        <MenuItem
                                            key={categoryObj.name}
                                            value={categoryObj.category_id}>
                                            {categoryObj.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                {!coursesLoadiong ? (
                    <Box
                        display="flex"
                        pl={`${courses.length < 6 ? '90px' : ''}`}
                        flexWrap={'wrap'}
                        justifyContent={`${
                            courses.length < 6 ? '' : 'space-around'
                        }`}
                        sx={{
                            '@media screen and (max-width: 1000px)': {
                                justifyContent: 'center',
                            },
                            padding: {
                                md: 0,
                                sm: 0,
                                xs: 0,
                                lg: `${courses.length < 6 ? '50px' : 0}`,
                                xl: `${courses.length < 6 ? '50px' : 0}`,
                            },
                        }}
                        height="auto">
                        {searchQuery === '' &&
                            courses.map((course, index) => {
                                if (index < 6) {
                                    return (
                                        <Box mb={3} mr={8} key={index}>
                                            <Card
                                                sx={{
                                                    maxWidth: 300,
                                                    maxHeight: 470,
                                                    minHeight: 470,
                                                    transition: '0.3s',
                                                    boxShadow:
                                                        'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        boxShadow:
                                                            '0 16px 70px -12.125px rgba(0,0,0,0.3)',
                                                    },
                                                }}>
                                                <CardHeader
                                                  
                                                    subheader={new Date(
                                                        course.created_at,
                                                    ).toDateString()}
                                                />
                                                <CardMedia
                                                    sx={{
                                                        paddingTop: '10px',
                                                    }}>
                                                    <img
                                                        width="300px"
                                                        height="200px"
                                                        alt="za malo da se ucita"
                                                        src={`${
                                                            process.env
                                                                .REACT_APP_BACKEND_URL
                                                        }:${
                                                            process.env
                                                                .REACT_APP_BACKEND_PORT
                                                        }/storage/picture/${
                                                            course.picture ? (
                                                                course.picture
                                                            ) : (
                                                                <CircularProgress />
                                                            )
                                                        }`}
                                                    />
                                                </CardMedia>
                                                <CardContent
                                               
                                                    sx={{
                                                        
                                                        textAlign: 'left',
                                                        padding: '20px',
                                                    }}>
                                                    <Typography
                                                    sx={{minHeight:"80px"}}
                                                        className={
                                                            'MuiTypography--heading'
                                                        }
                                                        variant={'h4'}
                                                        gutterBottom>
                                                        {course.name}
                                                    </Typography>
                                                    <Typography
                                                        className={
                                                            'MuiTypography--subheading'
                                                        }
                                                        variant="h6">
                                                        {course.description
                                                            .length > 60
                                                            ? course.description.slice(
                                                                  0,
                                                                  60,
                                                              ) + '...'
                                                            : course.description}
                                                    </Typography>
                                                    <Divider light />
                                                    <Button
                                                        onClick={
                                                            proceedToCourseHandler
                                                        }
                                                        id={course.course_id}
                                                        sx={{
                                                            marginTop: '10px',
                                                        }}
                                                        variant="contained"
                                                        color="secondary">
                                                        Join Course
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    )
                                }
                            })}
                        {searchQuery !== '' &&
                            filteredCourses.map((course, index) => {
                                if (index < 6) {
                                    return (
                                        <Box mb={3} mr={3} key={index}>
                                            <Card
                                                sx={{
                                                    maxWidth: 300,
                                                    maxHeight: 470,
                                                    minHeight: 470,
                                                    transition: '0.3s',
                                                    boxShadow:
                                                        'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        boxShadow:
                                                            '0 16px 70px -12.125px rgba(0,0,0,0.3)',
                                                    },
                                                }}>
                                                <CardHeader
                                                    
                                                    subheader={new Date(
                                                        course.created_at,
                                                    ).toDateString()}
                                                />
                                                <CardMedia
                                                    sx={{
                                                        paddingTop: '10px',
                                                    }}>
                                                    <img
                                                        width="300px"
                                                        height="200px"
                                                        alt="za malo da se ucita"
                                                        src={`${
                                                            process.env
                                                                .REACT_APP_BACKEND_URL
                                                        }:${
                                                            process.env
                                                                .REACT_APP_BACKEND_PORT
                                                        }/storage/picture/${
                                                            course.picture ? (
                                                                course.picture
                                                            ) : (
                                                                <CircularProgress />
                                                            )
                                                        }`}
                                                    />
                                                </CardMedia>
                                                <CardContent
                                                    sx={{
                                                        textAlign: 'left',
                                                        padding: '20px',
                                                        
                                                    }}>
                                                    <Typography
                                                    sx={{minHeight:"80px"}}
                                                    
                                                        className={
                                                            'MuiTypography--heading'
                                                        }
                                                        variant={'h4'}
                                                        gutterBottom>
                                                        {course.name}
                                                    </Typography>
                                                    <Typography
                                                        className={
                                                            'MuiTypography--subheading'
                                                        }
                                                        variant="h6">
                                                         {course.description
                                                            .length > 40
                                                            ? course.description.slice(
                                                                  0,
                                                                  40,
                                                              ) + '...'
                                                            : course.description}
                                                    </Typography>
                                                    <Divider light />
                                                    <Button
                                                        onClick={
                                                            proceedToCourseHandler
                                                        }
                                                        id={course.course_id}
                                                        sx={{
                                                            marginTop: '10px',
                                                        }}
                                                        variant="contained"
                                                        color="secondary">
                                                        Join Course
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    )
                                }
                            })}
                    </Box>
                ) : (
                    <CircularProgress />
                )}
                {moreLoaded && (
                    <Box
                        display="flex"
                        flexWrap={'wrap'}
                        alignSelf="flex-start"
                        justifyContent={`${
                            courses.length % 2 !== 0
                                ? 'space-around'
                                : 'flex-start'
                        }`}
                        sx={{
                            '@media screen and (max-width: 1000px)': {
                                justifyContent: 'center',
                            },
                        }}>
                        {searchQuery === '' &&
                            courses.map((course, index) => {
                                if (index > 5) {
                                    return (
                                        <Box
                                            pl={courses.length !== 0 ? 2 : 0}
                                            mb={3}
                                            mr={courses.length !== 0 ? 10.3 : 2}
                                            key={index}>
                                            <Card
                                                sx={{
                                                    maxWidth: 300,
                                                    maxHeight: 470,
                                                    minHeight: 470,
                                                    transition: '0.3s',
                                                    boxShadow:
                                                        'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        boxShadow:
                                                            '0 16px 70px -12.125px rgba(0,0,0,0.3)',
                                                    },
                                                }}>
                                                <CardHeader
                                                    
                                                    subheader={new Date(
                                                        course.created_at,
                                                    ).toDateString()}
                                                />
                                                <CardMedia
                                                    sx={{
                                                        paddingTop: '10px',
                                                    }}>
                                                    <img
                                                        width="300px"
                                                        height="200px"
                                                        alt="za malo da se ucita"
                                                        src={`${
                                                            process.env
                                                                .REACT_APP_BACKEND_URL
                                                        }:${
                                                            process.env
                                                                .REACT_APP_BACKEND_PORT
                                                        }/storage/picture/${
                                                            course.picture ? (
                                                                course.picture
                                                            ) : (
                                                                <CircularProgress />
                                                            )
                                                        }`}
                                                    />
                                                </CardMedia>
                                                <CardContent
                                                    sx={{
                                                        textAlign: 'left',
                                                        padding: '20px',
                                                        
                                                    }}>
                                                    <Typography
                                                    sx={{minHeight:"80px"}}
                                                        className={
                                                            'MuiTypography--heading'
                                                        }
                                                        variant={'h4'}
                                                        gutterBottom>
                                                        {course.name}
                                                    </Typography>
                                                    <Typography
                                                        className={
                                                            'MuiTypography--subheading'
                                                        }
                                                        variant="h6">
                                                         {course.description
                                                            .length > 60
                                                            ? course.description.slice(
                                                                  0,
                                                                  60,
                                                              ) + '...'
                                                            : course.description}
                                                    </Typography>
                                                    <Divider light />
                                                    <Button
                                                        onClick={
                                                            proceedToCourseHandler
                                                        }
                                                        id={course.course_id}
                                                        sx={{
                                                            marginTop: '10px',
                                                        }}
                                                        variant="contained"
                                                        color="secondary">
                                                        Join Course
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    )
                                }
                            })}
                        {searchQuery !== '' &&
                            filteredCourses.map((course, index) => {
                                if (index > 5) {
                                    return (
                                        <Box
                                            pl={courses.length !== 0 ? 3 : 0}
                                            mb={3}
                                            mr={courses.length !== 0 ? 6 : 3}
                                            key={index}>
                                            <Card
                                                sx={{
                                                    maxWidth: 300,
                                                    maxHeight: 470,
                                                    minHeight: 470,
                                                    transition: '0.3s',
                                                    boxShadow:
                                                        'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        boxShadow:
                                                            '0 16px 70px -12.125px rgba(0,0,0,0.3)',
                                                    },
                                                }}>
                                                <CardHeader
                                                    title={course.name}
                                                    subheader={new Date(
                                                        course.created_at,
                                                    ).toDateString()}
                                                />
                                                <CardMedia
                                                    sx={{
                                                        paddingTop: '10px',
                                                    }}>
                                                    <img
                                                        width="300px"
                                                        height="200px"
                                                        alt="za malo da se ucita"
                                                        src={`${
                                                            process.env
                                                                .REACT_APP_BACKEND_URL
                                                        }:${
                                                            process.env
                                                                .REACT_APP_BACKEND_PORT
                                                        }/storage/picture/${
                                                            course.picture ? (
                                                                course.picture
                                                            ) : (
                                                                <CircularProgress />
                                                            )
                                                        }`}
                                                    />
                                                </CardMedia>
                                                <CardContent
                                                    sx={{
                                                        textAlign: 'left',
                                                        padding: '20px',
                                                    }}>
                                                    <Typography
                                                    sx={{minWidth:"80px"}}
                                                        className={
                                                            'MuiTypography--heading'
                                                        }
                                                        variant={'h4'}
                                                        gutterBottom>
                                                        {course.name}
                                                    </Typography>
                                                    <Typography
                                                        className={
                                                            'MuiTypography--subheading'
                                                        }
                                                        variant="h6">
                                                        {course.description}
                                                    </Typography>
                                                    <Divider light />
                                                    <Button
                                                        onClick={
                                                            proceedToCourseHandler
                                                        }
                                                        id={course.course_id}
                                                        sx={{
                                                            marginTop: '10px',
                                                        }}
                                                        variant="contained"
                                                        color="secondary">
                                                        Join Course
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    )
                                }
                            })}
                    </Box>
                )}
            </Box>
            {searchQuery === '' &&
                category === '-' &&
                !moreLoaded &&
                courses.length > 0 &&
                courses.length > 6 && (
                    <Box
                        mt={3}
                        mb={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Button
                            onClick={loadMoreCourses}
                            variant="contained"
                            color="info">
                            Load more
                        </Button>
                    </Box>
                )}
            {searchQuery === '' &&
                category === '-' &&
                moreLoaded &&
                courses.length > 0 &&
                courses.length > 6 && (
                    <Box
                        mt={3}
                        mb={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center">
                        <Button
                            onClick={loadLessCourses}
                            variant="contained"
                            color="warning">
                            Load less
                        </Button>
                    </Box>
                )}
        </Box>
    )
}
