// import API_BASE_URL from '../apiConfig.js';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants/actionTypes.js';
import { toast } from "react-toastify";
import Api from '../apiConfig.js';




export const loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: token
    };
};

export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    };
}


export const login = (email, password, navigate) => {
    return async (dispatch) => {
        try {
            const obj = {
                email: email,
                password: password
            }
            const fetchData = await Api.post(`auth/login`, obj);
            if (fetchData) {
                const token = fetchData?.token;
                dispatch(loginSuccess(token))
                toast.success('Login SuccessFully')
                navigate('/Admin/dashboard')
            } else {
                dispatch(loginFailure(fetchData?.message));
                toast.error('invalid email or password');
            }
        } catch (error) {
            console.error('Login Error', error);
            dispatch(loginFailure('an error occurred in during login'));
            toast.error('Something went wrong!')
        }
    }
}

// export const login = (email, password, navigate) => {
//     return async (dispatch) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email, password })
//             });
//             console.log('response:', response)
//             if (response.ok) {
//                 const data = await response.json();
//                 const token = data.token;

//                 dispatch(loginSuccess(token))
//                 toast.success('Login SuccessFully')
//                 navigate('/Admin/dashboard')
//             } else {
//                 const errorData = await response.json();
//                 const errorMessage = errorData.Message;

//                 dispatch(loginFailure(errorMessage))
//                 toast.error('invalid email or password')
//             }
//         } catch (error) {
//             console.error('Login Error', error);
//             dispatch(loginFailure('an error occurred in during login'));
//             toast.error('Something went wrong!')
//         }
//     }
// }



