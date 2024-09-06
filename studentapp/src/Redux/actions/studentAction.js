import { ADD_STUDENT_FAILURE, ADD_STUDENT_SUCCESS, STUDENT_UPDATE_FAILURE, STUDENT_UPDATE_SUCCESS } from '../constants/actionTypes.js';
import { toast } from "react-toastify";
import Api from '../apiConfig.js';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../fireBase.js";


export const studentSuccess = (token) => {
    return {
        type: ADD_STUDENT_SUCCESS,
        payload: token
    };
};

export const studentFailure = (error) => {
    return {
        type: ADD_STUDENT_FAILURE,
        payload: error
    };
};

export const addStudent = (studentData, uploadImage, navigate) => {
    return async (dispatch) => {
        try {
            console.log(studentData, uploadImage);
            if (!uploadImage) {
                alert('please select an image');
                return;
            } else {
                const storageRef = ref(storage, `images/${uploadImage.name}`);
                const snapshot = await uploadBytes(storageRef, uploadImage);
                const downloadURL = await getDownloadURL(snapshot.ref);
                if (downloadURL) {
                    const updatedFormData = { ...studentData, image: downloadURL };
                    // console.log(updatedFormData, '<<<<<<');
                    const fetchData = await Api.post(`students/student_insert`, updatedFormData);
                    if (fetchData) {
                        const token = fetchData?.firstName;
                        dispatch(studentSuccess(token))
                        toast.success('add SuccessFully')
                        navigate('/Admin/dashboard')
                    } else {
                        dispatch(studentFailure(fetchData?.message));
                        toast.error('student add failure');
                    }
                } else {
                    alert('image upload failed')
                }
            }

        } catch (error) {
            console.error('Login Error', error);
            dispatch(studentFailure('an error occurred in during student add'));
            toast.error('Something went wrong!')
        }
    }
}

export const getAllStudent = () => {
    return async (dispatch) => {
        try {
            const allStudentData = await Api.get(`students/student_view`);

            if (allStudentData.message === 'Success') {
                const token = allStudentData?.message;
                dispatch(studentSuccess(token))
                toast.success('Data get successfully')
            } else {
                dispatch(studentFailure(allStudentData?.message));
                toast.error('Data not found');
            }
        } catch (error) {
            console.error('Students data not found', error);
            toast.error('Something went wrong');
        }
    }
}

export const studentUpdateSuccess = (token) => {
    return {
        type: STUDENT_UPDATE_SUCCESS,
        payload: token
    };
};

export const studentUpdateFailure = (error) => {
    return {
        type: STUDENT_UPDATE_FAILURE,
        payload: error
    }
}

export const studentUpdate = (id, data) => {
    return async (dispatch) => {
        try {
            const studentUpdateData = await Api.post(`students/student_update`, { id, data });
            const updateData = studentUpdateData.data;
            if (updateData.message === 'Successfully') {
                const token = updateData?.message;
                dispatch(studentUpdateSuccess(token))
                toast.success('Data Updated Successfully');
            } else {
                dispatch(studentUpdateFailure(updateData?.message));
                toast.error('Data not post');
            }
        } catch (error) {
            console.error('Student Data not updated', error)
            toast.error('Sumething went wrong');
        }
    }
}