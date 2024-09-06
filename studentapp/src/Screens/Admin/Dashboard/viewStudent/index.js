import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import Drawer from '../../Components/Drawer';
import style from './style.module.css'
import Student from '../../../../Assets/Auth/student.jpeg'
import { useNavigate, useLocation } from 'react-router-dom';
import Api from '../../../../Redux/apiConfig';
import moment from 'moment';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const ViewStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const studentId = new URLSearchParams(location.search).get('studentId');
  const goBack = () => {
    navigate(-1)
  }

  const [studentDisplay, setStudentDisplay] = useState({});
  useEffect(() => {
    const getStudentById = async () => {
      try {
        const obj = {
          Id: studentId
        }
        const StudentData = await Api.post(`students/getStudentById`, obj);
        const fetchData = StudentData?.data;
        if (fetchData.message === 'Success') {
          setStudentDisplay(fetchData.data);
        } else {
          console.error('Data not fetching')
        }
      } catch (error) {
        console.error('error fetching student data', error);
      }
      toast.success('Student Data Display Success');
    }
    getStudentById();
  }, [])


  return (
    <Grid sx={{ display: "flex", gap: 2 }}>
      <Grid>
        <Drawer />
      </Grid>

      <Grid className={style.tableContainer} sx={{ fontWeight: 600, marginTop: '80px', paddingBottom: '1%', paddingRight: '1%', width: '100%' }}>
        <p><span onClick={(() => goBack())} style={{ cursor: 'pointer' }}>Dashboard</span>/ViewStudent</p>

        <Grid className={style.container}>

          <Grid className={style.tableNav}>
            <Grid className={style.navFirstContainer}>
              <Grid className={style.navImg}>
                <img src={studentDisplay.image} alt='StudentImage' />
              </Grid>
              <Grid className={style.navContent}>
                <b> {`${studentDisplay.firstName} ${studentDisplay.middleName ? studentDisplay.middleName + ' ' : ''}${studentDisplay.lastName}`}</b>
                <p><span>{studentDisplay.education} &</span> {studentDisplay.branch}</p>
              </Grid>
            </Grid>
            <Grid className={style.navContainerTwo}>
              <p><span>Reg.ID:-</span>{studentDisplay.regdNo}</p>
            </Grid>
          </Grid>

          <Grid className={style.table}>
            <Grid className={style.fstColumnContainer}>
              <Grid className={style.firstColumn}>
                <label className={style.label}>First Name</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.firstName}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Middle Name</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.middleName}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Last Name</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.lastName}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Gender</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.gender}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>DOB</label>
                <br />
                <p className={style.fcPara}>{moment(studentDisplay.dob).format('MMMM D, YYYY')}</p>
              </Grid>

            </Grid>

            <Grid className={style.seColumnContainer}>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Category</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.category}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Father's Name</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.fatherName}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Mother's Name</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.motherName}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Religion</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.religion}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>City/Village</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.cityVillage}</p>
              </Grid>

            </Grid>

            <Grid className={style.thirdColumnContainer}>

              <Grid className={style.firstColumn}>
                <label className={style.label}>State</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.state}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Country</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.country}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Dist</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.dist}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Post</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.post}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Pin Code</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.pinCode}</p>
              </Grid>

            </Grid>

            <Grid className={style.fourthColumn}>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Phone No.</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.phoneNo}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Alternative Phone No</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.alternativePhoneNo}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Parent's Phone No.</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.parentNo}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Email Id</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.emailId}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Permanent Address</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.permanentAddress}</p>
              </Grid>

            </Grid>

            <Grid className={style.fifthColumn}>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Education</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.education}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Branch</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.branch}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Pass Year</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.passYear}</p>
              </Grid>

              <Grid className={style.firstColumn}>
                <label className={style.label}>Course Fee(PA)</label>
                <br />
                <p className={style.fcPara}>{studentDisplay.courseFee}</p>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Grid>

  )
}

export default ViewStudent
