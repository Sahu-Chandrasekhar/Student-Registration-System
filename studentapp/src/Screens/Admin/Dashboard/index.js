import React, { useEffect, useState } from "react";
import Drawer from "../Components/Drawer/index";
import Grid from '@mui/material/Grid';
import style from "./style.module.css";
import StudentTable from '../Components/studentTable';
import Api from "../../../Redux/apiConfig";

//Dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

//Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//MUI Card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
//Icons
import DownloadIcon from '@mui/icons-material/Download';

//export data xlsx
import * as XLSX from 'xlsx';


export default function Dashboard(props) {
  const [totalStudents, setTotalStudents] = React.useState(false);
  const handleClickTotalStudents = () => {
    setTotalStudents(true);
  };
  const handleCloseTotalStudents = () => { setTotalStudents(false); };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const [totalStudentCount, setTotalStudentCount] = React.useState(0);
  // const [allBtechStudent, setAllBetchStudent] = useState([]);
  // const getAllBtechStudent = async () => {
  //   try {
  //     const obj = {
  //       education: 'B.Tech'
  //     }
  //     const studentBach = await Api.post(`students/students_by_education`, obj);
  //     const fetchData = studentBach?.data;
  //     if (fetchData.message === 'student success') {
  //       setAllBetchStudent(fetchData.data);
  //     } else {
  //       console.error('Data not fetching')
  //     }
  //   } catch (error) {
  //     console.error('error fetching student data', error);
  //   }

  // }

  // const [diplomaStudent, setDiplomaStudent] = useState([]);
  // const getAllDiplomaStudent = async () => {
  //   try {
  //     const obj = {
  //       education: 'Diploma'
  //     }
  //     const studentDiploma = await Api.post(`students/students_by_education`, obj);
  //     const fetchData = studentDiploma?.data;
  //     if (fetchData.message === 'student success') {
  //       setDiplomaStudent(fetchData.data);
  //     } else {
  //       console.error('Data not fetching')
  //     }
  //   } catch (error) {
  //     console.error('error fetching student data', error);
  //   }

  // }

  // const [mbaStudent, setMbaStudent] = useState([]);
  // const getAllMbaStudent = async () => {
  //   try {
  //     const obj = {
  //       education: 'MBA'
  //     }
  //     const studentMba = await Api.post(`students/students_by_education`, obj);
  //     const fetchData = studentMba?.data;
  //     if (fetchData.message === 'student success') {
  //       setMbaStudent(fetchData.data);
  //     } else {
  //       console.error('Data not fetching')
  //     }
  //   } catch (error) {
  //     console.error('error fetching student data', error);

  //   }
  // }

  // const [mtechStudent, setMtechStudent] = useState([]);
  // const getAllMtechStudent = async () => {
  //   try {
  //     const obj = {
  //       education: 'M.Tech'
  //     }
  //     const studentMtech = await Api.post(`students/students_by_education`, obj);
  //     const fetchData = studentMtech?.data;
  //     if (fetchData.message === 'student success') {
  //       setMtechStudent(fetchData.data);
  //     } else {
  //       console.error('Data not fetching')
  //     }
  //   } catch (error) {
  //     console.error('error fetching student data', error);

  //   }
  // }

  // useEffect(() => {
  //   getAllBtechStudent();
  //   getAllDiplomaStudent();
  //   getAllMbaStudent();
  //   getAllMtechStudent();
  // }, [])



  const [studentByBatch, setStudentByBatch] = useState([]);
  const studentCountByEducation = async () => {
    try {
      const studentMtech = await Api.post(`students/students_Download_by_education`);
      const fetchData = studentMtech?.data;
      if (fetchData.message === 'success') {
        setStudentByBatch(fetchData.data);
      } else {
        console.error('Data not fetching')
      }
    } catch (error) {
      console.error('error fetching student data', error);
    }
  }
  useEffect(() => {
    studentCountByEducation()
  }, [])


  const downloadExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, fileName + '.xlsx');
  };

  const handleDownload = (arrdata) => {
    const data = [
      { education: arrdata[0], total: arrdata[1] }
    ];
    const fileName = 'studentdetails';
    downloadExcel(data, fileName);
  };

  const handleAllDownload = (arrayOfArrays) => {
    const arrayOfObjects = arrayOfArrays.map(arr => {
      return { education: arr[0], total: arr[1] };
    });
    const fileName = 'AllStudentdetails';
    downloadExcel(arrayOfObjects, fileName);
  };


  // Method 1: Using Array Destructuring


  // Method 2: Using Array.reduce()



  return (
    <>
      <Grid item sx={{ display: "flex", gap: 2 }}>
        <Grid>
          <Drawer />
        </Grid>

        <Grid className={style.dashboardSection}>

          <Grid >
            {/* Counting Cards */}
            <Grid container justifyContent="center" xs={12} md={12} lg={12} gap={6} paddingBottom="5%" paddingRight="1%">
              <Grid item xs={3} md={3} lg={2}>
                <Card className={style.card} onClick={() => { handleClickTotalStudents() }}>
                  <CardContent>
                    <b>Total Students</b>
                    <p>{totalStudentCount}</p>
                  </CardContent>
                </Card>
              </Grid>

              {studentByBatch.map((row, index) => (
                <Grid item xs={3} md={3} lg={2}>
                  <Card className={style.card} onClick={() => { handleClickTotalStudents() }}>
                    <CardContent>
                      <b>{row[0]}</b>
                      <p>{row[1]}</p>
                    </CardContent>
                  </Card>
                </Grid>
              ))}

            </Grid>
          </Grid>

          <StudentTable setTotalStudentCount={setTotalStudentCount} />

        </Grid>

      </Grid>

      {/* All Dialogs */}


      {/* Total Students Dialog */}
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        open={totalStudents}
        onClose={handleCloseTotalStudents}
        aria-labelledby="responsive-dialog-title"
      >
        <Grid>
          <Grid style={{ padding: "2%" }}>
            <Grid className={style.dialogHeader}>
              <Grid>
                <h3>Total Academic Student's List</h3>
              </Grid>
              <Grid>
                {/* <button style={{ width: "50%", cursor: "pointer" }} onClick={handleDownload}>Download Excel</button>*/}
                <DownloadIcon style={{ width: "100%", cursor: "pointer" }} onClick={() => handleAllDownload(studentByBatch)} />
              </Grid>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 10 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" className={style.dialogTableTitle}>Education</TableCell>
                  <TableCell align="center" className={style.dialogTableTitle}>Total</TableCell>
                  <TableCell align="center" className={style.dialogTableTitle}>Export</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentByBatch.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" className={style.dialogTableValue}>{row[0]}</TableCell>
                    <TableCell align="center" className={style.dialogTableValue}>{row[1]}</TableCell>
                    <TableCell align="center" className={style.dialogTableValue}>
                      <DownloadIcon style={{ width: "50%", cursor: "pointer" }} onClick={() => handleDownload(row)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid className={style.dialogCloseButton}>
            <Button onClick={handleCloseTotalStudents} autoFocus className={style.close}>
              Close
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}
