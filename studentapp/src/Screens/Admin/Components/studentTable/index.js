import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider, Grid, IconButton, InputBase } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import EditStudent from './editStudent';
// import { getAllStudent } from '../../../../Redux/actions/studentAction';
import { useDispatch } from 'react-redux';
//Api
import Api from '../../../../Redux/apiConfig';

//date
import moment from 'moment';


//Dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';



//Icons
import PreviewIcon from '@mui/icons-material/Preview';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
//Style
import style from "./style.module.css"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#133b65",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function CustomizedTables(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setTotalStudentCount } = props;

    //dialog
    const [open, setOpen] = React.useState(false);
    const [studentDetail, setStudentDetail] = useState({});

    const handleClickOpen = (student) => {
        setOpen(true);
        setStudentDetail(student);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [allStudents, setAllStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchName, setsearchName] = useState('');

    const getAllStudent = async () => {
        try {
            const allStudentData = await Api.get(`students/student_view`);
            const fetchData = allStudentData?.data;
            if (fetchData.message === 'Success') {
                setAllStudents(fetchData.data);
                setFilteredStudents(fetchData.data); // Initialize filtered students with all data
                setTotalStudentCount(fetchData.data.length);
            } else {
                console.error('Data not fetching');
            }
        } catch (error) {
            console.error('Error fetching student data', error);
        }
    }
    useEffect(() => {
        getAllStudent();
    }, []);

    const handleSearch = (event) => {
        const search = event.toLowerCase();
        const filtered = allStudents.filter(item =>
            item.firstName && item.firstName.toLowerCase().includes(search)
        );
        setFilteredStudents(filtered); // Update the filtered students state
    }


    // const getAllStudent = async () => {
    //     try {
    //         const allStudentData = await Api.get(`students/student_view`);
    //         const fetchData = allStudentData?.data;
    //         if (fetchData.message === 'Success') {
    //             setAllStudents(fetchData.data);
    //         } else {
    //             console.error('Data not fetching')
    //         }
    //     } catch (error) {
    //         console.error('error fetching student data', error);
    //     }

    // }

    const deleteStudent = async (studentId) => {
        try {
            const obj = {
                Id: studentId
            }
            const StudentData = await Api.post(`students/student_delete`, obj);
            const fetchData = StudentData?.data;
            if (fetchData?.message) {
                getAllStudent();
                handleClose();
            } else {
                console.error('Data not fetching')
            }
        } catch (error) {
            console.error('error fetching student data', error);
        }

    }

    //pagination
    const [page, setPage] = useState(1);
    const itemPerPage = 10;
    const handlePageChange = (event, value) => {
        setPage(value)
    }
    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const currentPageData = filteredStudents.slice(startIndex, endIndex);


    //edit model
    const [editOpen, setEditOpen] = useState(false);
    const [updateStudent, setUpdateStudent] = useState({});
    const handleEdit = (value) => {
        setEditOpen(true)
        setUpdateStudent(value)
    }


    return (
        <Paper sx={{ width: '100%' }}>
            <Grid className={style.tableFilter}>
                <h3>All Students</h3>
                <Grid style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Student..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={(e) => setsearchName(e.target.value)}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton onClick={() => handleSearch(searchName)} type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>

            <TableContainer sx={{ maxHeight: 440 }}>

                <Table sx={{ minWidth: 10 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left" className={style.tableTitle}>index</StyledTableCell>
                            <StyledTableCell align="left" className={style.tableTitle}>Reg. No.</StyledTableCell>
                            <StyledTableCell align="left" className={style.tableTitle}>Name</StyledTableCell>
                            <StyledTableCell align="left" className={style.tableTitle}>DOB</StyledTableCell>
                            <StyledTableCell align="left" className={style.tableTitle}>Education</StyledTableCell>
                            <StyledTableCell align="left" className={style.tableTitle}>Branch</StyledTableCell>
                            <StyledTableCell align="left" className={style.tableTitle}>PassYear</StyledTableCell>
                            <StyledTableCell align="left" className={style.tableTitle}>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {filteredStudents.length === 0 ? (
                        <TableRow>
                            <StyledTableCell align='center'>No student records</StyledTableCell>
                        </TableRow>
                    ) : (
                        <TableBody>
                            {currentPageData.map((row, index) => (
                                <StyledTableRow hover role="checkbox" tabIndex={-1}>
                                    <StyledTableCell component="th" scope="row" className={style.tableTitle}>
                                        {index}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" className={style.tableTitle}>
                                        {row.regdNo}
                                    </StyledTableCell>
                                    <StyledTableCell align="left" className={style.tableTitle}>
                                        {`${row.firstName} ${row.middleName ? row.middleName + ' ' : ''}${row.lastName}`}
                                    </StyledTableCell>
                                    <StyledTableCell align="left" className={style.tableTitle}>
                                        {moment(row.dob).format('MMMM D, YYYY')}
                                    </StyledTableCell>
                                    <StyledTableCell align="left" className={style.tableTitle}>
                                        {row.education}
                                    </StyledTableCell>
                                    <StyledTableCell align="left" className={style.tableTitle}>
                                        {row.branch}
                                    </StyledTableCell>
                                    <StyledTableCell align="left" className={style.tableTitle}>
                                        {moment(row.passYear).format('YYYY')}
                                    </StyledTableCell>
                                    <StyledTableCell align="left" className={style.tableTitle}>

                                        <PreviewIcon style={{ color: "#179903", width: "25%", cursor: "pointer" }}
                                            onClick={() => navigate(`/admin/dashboard/viewStudent?studentId=${row._id}`)} />
                                        <DeleteForeverIcon style={{ color: "#E30707", width: "25%", cursor: "pointer" }}
                                            onClick={() => handleClickOpen(row)} />
                                        <EditIcon style={{ color: "rgb(24 55 232)", width: "25%", cursor: "pointer" }}
                                            onClick={() => handleEdit(row)} />
                                    </StyledTableCell>
                                    {/*style={{ gap: 5, display: "flex", cursor: "pointer" }}*/}
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </TableContainer>

            {/* pagination */}
            <Pagination
                count={Math.ceil(filteredStudents.length / itemPerPage)}
                page={page}
                onChange={handlePageChange}
                variant='outlined'
                shape='rounded'
            />

            {/* Dialog */}
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description" >
                <DialogTitle className={style.dialogTitle}>Are you sure you want to delete this Student {studentDetail.firstName}  permanently ?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        style={{ color: "red" }} onClick={() => deleteStudent(studentDetail._id)}>Delete</Button>
                </DialogActions>
            </Dialog>

            {editOpen && <EditStudent open={editOpen} setOpen={setEditOpen} updateStudent={updateStudent} getAllStudent={getAllStudent} />}
        </Paper>

    );
}

