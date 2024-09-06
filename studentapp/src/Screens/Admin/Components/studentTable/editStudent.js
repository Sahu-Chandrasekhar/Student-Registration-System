import React, { useState, useEffect } from 'react'
import styles from './edit.module.css'
// import DialogTitle from '@mui/material/DialogTitle';
// import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { Grid } from '@mui/material';
// import Drawer from '../Drawer/index';
// import Edit from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
// import Admission from '../../Admission/index'
import UserImage from "../../../../Assets/Auth/userImage.png";
import { useDispatch } from 'react-redux';
import Api from '../../../../Redux/apiConfig';
import { toast } from "react-toastify";
import storage from "../../../../Redux/fireBase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { studentUpdate } from '../../../../Redux/actions/studentAction'


const EditStudent = (props) => {
    const { open, setOpen, updateStudent, getAllStudent } = props
    const handleClose = () => {
        setOpen(false);
    };
    // console.log(updateStudent);

    // const [studentId, setStudentId] = useState(updateStudent._id)
    // const updateStudentData = async () => {
    //     try {
    //         const obj = [
    //             {
    //                 studentId: studentId
    //             },
    //             {
    //                 updateStudentData: formData
    //             }
    //         ]
    //         const studentBach = await Api.post(`students/student_update`, obj);
    //         const fetchData = studentBach?.data;
    //         if (fetchData.message === 'Successfully') {
    //             setFormData(fetchData.data);
    //         } else {
    //             console.error('Data not fetching')
    //         }
    //     } catch (error) {
    //         console.error('error fetching student data', error);
    //     }

    // }

    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState({
        regdNo: '',
        image: null,
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        dob: '',
        category: '',
        fatherName: '',
        motherName: '',
        religion: '',
        cityVillage: '',
        state: '',
        country: '',
        dist: '',
        post: '',
        pinCode: '',
        phoneNo: '',
        alternativePhoneNo: '',
        parentNo: '',
        emailId: "",
        permanentAddress: '',
        education: '',
        branch: '',
        passYear: '',
        status: '',
        courseFee: ''
    });
    const [formData, setFormData] = useState({
        regdNo: updateStudent.regdNo,
        image: updateStudent.image,
        firstName: updateStudent.firstName,
        middleName: updateStudent.middleName,
        lastName: updateStudent.lastName,
        gender: updateStudent.gender,
        dob: updateStudent.dob,
        category: updateStudent.category,
        fatherName: updateStudent.fatherName,
        motherName: updateStudent.motherName,
        religion: updateStudent.religion,
        cityVillage: updateStudent.cityVillage,
        state: updateStudent.state,
        country: updateStudent.country,
        dist: updateStudent.dist,
        post: updateStudent.post,
        pinCode: updateStudent.pinCode,
        phoneNo: updateStudent.phoneNo,
        alternativePhoneNo: updateStudent.alternativePhoneNo,
        parentNo: updateStudent.parentNo,
        emailId: updateStudent.emailId,
        permanentAddress: updateStudent.permanentAddress,
        education: updateStudent.education,
        branch: updateStudent.branch,
        passYear: updateStudent.passYear,
        status: updateStudent.status,
        courseFee: updateStudent.courseFee
    });
    const [imageUrl, setImageUrl] = useState(updateStudent.image);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(formData);
        console.log(errors);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            setFormErrors({});
            try {
                await dispatch(studentUpdate(updateStudent._id, formData));
                setOpen(false)
                getAllStudent()
            } catch (error) {
                console.error('Failed to add student:', error);
                if (error.response) {
                    console.error('Server responded with:', error.response.data);
                } else if (error.request) {
                    console.error('No response received from the server.');
                } else {
                    console.error('Error setting up the request:', error.message);
                }
            }
        }
        // window.history.back();
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(event.target);
        setFormData((formData) => ({ ...formData, [name]: value }));
        // validate((formData)=>({ ...formData, [name]: value }));
    };

    // const handleImageChange = (event) => {
    //     // console.log(event.target.files[0].name);
    //     const file = event.target.files[0];
    //     const fileSizeKB = file.size / 1024; // Convert file size to kilobytes

    //     if (fileSizeKB > 500) {
    //         setFormErrors({ image: 'File size should be below 500KB' });
    //         event.target.files[0] = null;
    //         setImageUrl(null);
    //         localStorage.removeItem('uploadedImage');
    //     } else {
    //         setFormErrors({});
    //         setFormData((prevFormData) => ({
    //             ...prevFormData,
    //             image: file
    //         }));
    //         if (file) {
    //             const imageUrl = URL.createObjectURL(file);
    //             setImageUrl(imageUrl);
    //             localStorage.setItem('uploadedImage', imageUrl);

    //         }
    //     }
    // };

    const [uploadImage, setUploadImage] = useState('');
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        const fileSizeKB = file.size / 1024;

        if (fileSizeKB > 5000) {
            setFormErrors({ image: 'File size should be below 1000KB' });
            event.target.value = null;
            setImageUrl('');
            localStorage.removeItem('uploadedImage');
        } else {
            setFormErrors({});
            setUploadImage(file)
            // setFormData((prevFormData) => ({
            //     ...prevFormData,
            //     image: file
            // }));
            // console.log(formData.image, '>>>>>>>formDataImage');

            if (file) {
                setUploadImage(file);
                const imageUrl = URL.createObjectURL(file);
                setImageUrl(imageUrl);
                // setFormData((prevFormData) => ({
                //     ...prevFormData,
                //     image: imageUrl
                // }));
                console.log(imageUrl, '>>>>>>>imageUrl');

                localStorage.setItem('uploadedImage', imageUrl);
            }
        }
    };


    //img upload button
    const handelUploadImage = async () => {
        try {
            if (!uploadImage) {
                alert('please select an image');
                return;
            } else {
                const storageRef = ref(storage, `images/${uploadImage.name}`);
                const snapshot = await uploadBytes(storageRef, uploadImage);
                const downloadURL = await getDownloadURL(snapshot.ref);

                if (downloadURL) {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        image: downloadURL
                    }));
                } else {
                    alert('image upload failed')
                }
                console.log("File uploaded successfully. Download URL:", downloadURL);
            }
            toast.success('Upload Successful');
        } catch (error) {
            console.error('error uploading image', error);
        }
    }


    const validate = (values) => {
        const errors = {};
        if (!values.image) {
            errors.image = 'Image is Missing!*';
        } else if (values.image.size / 1024 > 500) {
            errors.image = 'File size should be below 500KB';
        }

        if (!values.firstName) {
            errors.firstName = "First Name is Missing!*";
        }
        if (!values.lastName) {
            errors.lastName = "Last Name is Missing!*";
        }
        if (!values.gender) {
            errors.gender = "Gender is Missing!*";
        }
        if (!values.dob) {
            errors.dob = "DOB is Missing!*";
        }
        if (!values.category) {
            errors.category = "Category is Missing!*";
        }
        if (!values.fatherName) {
            errors.fatherName = "Father Name is Missing!*";
        }
        if (!values.motherName) {
            errors.motherName = "Mother Name is Missing!*";
        }
        if (!values.religion) {
            errors.religion = "Religion is Missing!*";
        }
        if (!values.cityVillage) {
            errors.cityVillage = "City is Missing!*";
        }
        if (!values.state) {
            errors.state = "State is Missing!*";
        }
        if (!values.country) {
            errors.country = "Country is Missing!*";
        }
        if (!values.dist) {
            errors.dist = "Dist is Missing!*";
        }
        if (!values.post) {
            errors.post = "Post is Missing!*";
        }
        if (!values.pinCode) {
            errors.pinCode = "Pin Code is Missing!*";
        }
        // Phone number validation
        if (!values.phoneNo) {
            errors.phoneNo = "Phone No. is missing!*";
        } else if (!/^\d{10}$/.test(values.phoneNo)) {
            errors.phoneNo = "Invalid phone number! Must be 10 digits.";
        }
        // Phone number validation
        if (!values.parentNo) {
            errors.parentNo = "Phone No. is missing!*";
        } else if (!/^\d{10}$/.test(values.parentNo)) {
            errors.parentNo = "Invalid phone number! Must be 10 digits.";
        }

        // Email validation
        if (!values.emailId) {
            errors.emailId = "Email is missing!*";
        } else if (!/\S+@\S+\.\S+/.test(values.emailId)) {
            errors.emailId = "Invalid email address!";
        }
        if (!values.permanentAddress) {
            errors.permanentAddress = "Address is Missing!*";
        }
        if (!values.education) {
            errors.education = "Education is Missing!*";
        }
        if (!values.branch) {
            errors.branch = "Branch is Missing!*";
        }
        if (!values.passYear) {
            errors.passYear = "Year is Missing!*";
        }
        if (!values.status) {
            errors.status = "Status is Missing!*";
        }
        if (!values.courseFee) {
            errors.courseFee = "Course Fee is Missing!*";
        }

        setFormErrors(errors);
        return errors;
    }

    return (
        <div >
            <Grid sx={{ display: "flex", gap: 2 }}>

                <Grid className={styles.admissionSection}>
                    <Dialog onClose={handleClose} open={open} style={{ width: '100rem' }} >

                        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ padding: '22px 23px 0px 23px' }}>
                            <Grid>
                                <h2 style={{ textAlign: 'center', marginTop: '0px' }}>Update Student</h2>
                            </Grid>

                            <Grid className={styles.profilePic} style={{
                                display: ' grid',
                                placeContent: 'center end', marginLeft: '108px'
                            }}>
                                <Grid>
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Uploaded" />

                                    ) : (
                                        <img src={UserImage} alt="Default" />
                                    )}
                                </Grid>
                                <Grid className={styles.image_buttons}>
                                    <input type="file" id="inputTag" style={{ display: "none" }}
                                        accept="image/*"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                    <p><span style={{ color: "blue" }}>{imageUrl ? (<label style={{ cursor: "pointer" }} htmlFor="inputTag">Change</label>)
                                        : (<label htmlFor="inputTag" style={{ cursor: "pointer" }}>Select</label>)}</span> Passport size Photo <span style={{ color: "red" }}>*</span></p>
                                    <Button variant="contained" onClick={handelUploadImage}>Upload</Button>
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.image}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>


                            <hr className={styles.hr} />
                            <Grid className={styles.personalInfo}>
                                <h4>Personal Informations</h4>
                            </Grid>
                            <Grid className={styles.form_row2}>
                                <Grid className={styles.firstName}>
                                    <label>First Name<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="text" placeholder="Enter First name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.firstName}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.middleName}>
                                    <label>Middle Name</label><br />
                                    <input type="text" name="middleName" placeholder="Enter Middle name"
                                        value={formData.middleName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid className={styles.lastName}>
                                    <label>Last Name<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="text" name="lastName" placeholder="Enter Last name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.lastName}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className={styles.form_row3}>
                                <Grid className={styles.gender}>
                                    <label>Gender<span style={{ color: "red" }}>*</span></label><br />
                                    <select type="select" name="gender" placeholder="Select"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.gender}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.dob}>
                                    <label>DOB<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="date" name="dob"
                                        value={formData.dob}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.dob}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.category}>
                                    <label>Category<span style={{ color: "red" }}>*</span></label><br />
                                    <select type="select" name="category" placeholder="Select"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="General">General</option>
                                        <option value="OBC">OBC</option>
                                        <option value="SC">SC</option>
                                        <option value="ST">ST</option>
                                    </select>
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.category}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className={styles.form_row2}>
                                <Grid className={styles.firstName}>
                                    <label>Father's Name<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="text" name="fatherName" placeholder="Enter Father's Name"
                                        value={formData.fatherName}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.fatherName}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.middleName}>
                                    <label>Mother's Name<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="text" name="motherName" placeholder="Enter Mother's Name"
                                        value={formData.motherName}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.motherName}
                                        </p>
                                    </Grid>
                                </Grid>

                                <Grid className={styles.category}>
                                    <label>Religion<span style={{ color: "red" }}>*</span></label><br />
                                    <select type="select" name="religion" placeholder="Select"
                                        value={formData.religion}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="Buddhist">Buddhist</option>
                                        <option value="Christian">Christian</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Jain">Jain</option>
                                        <option value="Judaism">Judaism</option>
                                        <option value="Muslim">Muslim</option>
                                        <option value="Sikh">Sikh</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.religion}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Contact Informations/Address */}

                            <Grid className={styles.personalInfo}>
                                <h4>Contact Informations/Address</h4>
                            </Grid>
                            <Grid className={styles.form_row2}>
                                <Grid className={styles.lastName}>
                                    <label>City/Village<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="text" name="cityVillage" placeholder="Enter City/Village"
                                        value={formData.cityVillage}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.city}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.firstName}>
                                    <label>State<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="text" name="state" placeholder="Enter State Name"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.state}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.middleName}>
                                    <label>Country<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="text" name="country" placeholder="Enter Country Name"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.country}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className={styles.form_row2}>
                                <Grid className={styles.firstName}>
                                    <label>Dist<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="text" name="dist" placeholder="Enter Distric"
                                        // onChange={(event) => setDist(event.target.value)}
                                        value={formData.dist}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.dist}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.middleName}>
                                    <label>Post<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="text" name="post" placeholder="Enter Post"
                                        // onChange={(event) => setPost(event.target.value)}
                                        value={formData.post}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.post}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.lastName}>
                                    <label>Pin Code<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="number" name="pinCode" placeholder="Enter Pin Code"
                                        // onChange={(event) => setPinCode(event.target.value)}
                                        value={formData.pinCode}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.pinCode}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className={styles.form_row2}>
                                <Grid className={styles.firstName}>
                                    <label>Phone No.<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="number" name="phoneNo" placeholder="Enter Phone No."
                                        // onChange={(event) => setPhoneNo(event.target.value)}
                                        value={formData.phoneNo}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.phoneNo}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.middleName}>
                                    <label>Alternative Phone No.</label><br />
                                    <input type="number" name="alternativePhoneNo" placeholder="Enter Alt. No."
                                        // onChange={(event) => setAltNo(event.target.value)}
                                        value={formData.alternativePhoneNo}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.altNo}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.lastName}>
                                    <label>Parent's Phone No.<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="number" name="parentNo" placeholder="Enter Parent's Phone No."
                                        value={formData.parentNo}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.parentNo}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className={styles.email}>
                                <label>Email Id<span style={{ color: "red" }}>*</span></label><br />
                                <input type="email" name="emailId" placeholder="Enter Email ID"
                                    // onChange={(event) => setPhoneNo(event.target.value)}
                                    value={formData.emailId}
                                    onChange={handleInputChange}
                                />
                                <Grid>
                                    <p className={styles.error} >
                                        {formErrors.emailId}
                                    </p>
                                </Grid>
                            </Grid>
                            <Grid className={styles.address_row}>
                                <Grid className={styles.address}>
                                    <label>Permanent Address<span style={{ color: "red" }}>*</span></label><br />
                                    <textarea type="text" name="permanentAddress" placeholder="Enter Permanent Address"
                                        // onChange={(event) => setAddress(event.target.value)}
                                        value={formData.permanentAddress}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.address}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid className={styles.personalInfo}>
                                <h4>Programme/Course Information</h4>
                            </Grid>
                            <Grid className={styles.form_row2}>
                                <Grid className={styles.education}>
                                    <label>Education<span style={{ color: "red" }}>*</span></label><br />
                                    <select type="select" name="education"
                                        id="education"
                                        value={formData.education}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select an education</option>
                                        <option value="Diploma">Diploma</option>
                                        <option value="B.Tech">B.Tech</option>
                                        <option value="M.Tech">M.Tech</option>
                                        <option value="MBA">MBA</option>
                                    </select>
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.education}
                                        </p>
                                    </Grid>
                                </Grid>
                                {formData.education === 'Diploma' && (
                                    <Grid className={styles.education}>
                                        <label>Branch<span style={{ color: "red" }}>*</span></label>
                                        <select id="branch" name="branch"
                                            // onChange={handleBranchChange}
                                            // onChange={(event) => setBranch(event.target.value)}
                                            value={formData.branch}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select a branch</option>
                                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                                            <option value="Civil Engineering">Civil Engineering</option>
                                        </select>
                                        <Grid>
                                            <p className={styles.error} >
                                                {formErrors.branch}
                                            </p>
                                        </Grid>
                                    </Grid>
                                )}

                                {formData.education === 'B.Tech' && (
                                    <Grid className={styles.education}>
                                        <label>Branch<span style={{ color: "red" }}>*</span></label>
                                        <select id="branch" name="branch"
                                            // onChange={handleBranchChange}
                                            // onChange={(event) => setBranch(event.target.value)}
                                            value={formData.branch}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select a branch</option>
                                            <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                                            <option value="Mechanical Engineering">IT</option>
                                            <option value="Civil Engineering">Civil Engineering</option>
                                            <option value="Electrical Engineering">Electrical Engineering</option>
                                            <option value="Electronics & Communication Engineering">Electronics & Communication Engineering</option>
                                            <option value="Electrical & Electronics Engineering">Electrical & Electronics Engineering</option>
                                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                                        </select>
                                        <Grid>
                                            <p className={styles.error} >
                                                {formErrors.branch}
                                            </p>
                                        </Grid>
                                    </Grid>
                                )}
                                {formData.education === 'M.Tech' && (
                                    <Grid className={styles.education}>
                                        <label>Branch<span style={{ color: "red" }}>*</span></label>
                                        <select id="branch" name="branch"
                                            // onChange={handleBranchChange}
                                            // onChange={(event) => setBranch(event.target.value)}
                                            value={formData.branch}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select a branch</option>
                                            <option value="Structural Engineering">Structural Engineering</option>
                                            <option value="Mechanical System Design">Mechanical System Design</option>
                                        </select>
                                        <Grid>
                                            <p className={styles.error} >
                                                {formErrors.branch}
                                            </p>
                                        </Grid>
                                    </Grid>
                                )}
                                {formData.education === 'MBA' && (
                                    <Grid className={styles.education}>
                                        <label>Branch<span style={{ color: "red" }}>*</span></label>
                                        <select id="branch" name="branch"
                                            // onChange={handleBranchChange}
                                            // onChange={(event) => setBranch(event.target.value)}
                                            value={formData.branch}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select a branch</option>
                                            <option value="Financial Managemen">Financial Management</option>
                                            <option value="Marketing Management">Marketing Management</option>
                                        </select>
                                        <Grid>
                                            <p className={styles.error} >
                                                {formErrors.branch}
                                            </p>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>

                            <Grid className={styles.form_row2}>
                                <Grid className={styles.firstName}>
                                    <label>Pass Year<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="text" name="passYear" placeholder="Example 2023-2027"
                                        // onChange={(event) => setYear(event.target.value)}
                                        value={formData.passYear}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.year}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.category}>
                                    <label>Status<span style={{ color: "red" }}>*</span></label><br />
                                    <select type="select" name="status" placeholder="Select"
                                        // onChange={(event) => setStatus(event.target.value)}
                                        value={formData.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="Hostel">Hostel</option>
                                        <option value="Day Scolar">Day Scolar</option>
                                        <option value="Distance">Distance</option>
                                    </select>
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.status}
                                        </p>
                                    </Grid>
                                </Grid>
                                <Grid className={styles.lastName}>
                                    <label>Course Fee(PA)<span style={{ color: "red" }}>*</span></label><br />
                                    <input type="number" name="courseFee" placeholder="Enter Course fee per annun"
                                        // onChange={(event) => setCourseFee(event.target.value)}
                                        value={formData.courseFee}
                                        onChange={handleInputChange}
                                    />
                                    <Grid>
                                        <p className={styles.error} >
                                            {formErrors.courseFee}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid style={{ textAlign: "center", width: "100%", marginTop: "2%" }}>
                                <Button
                                    type="submit"
                                    className={styles.submitButton}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </form>
                    </Dialog>
                </Grid>

            </Grid>
        </div>
    )
}

export default EditStudent
