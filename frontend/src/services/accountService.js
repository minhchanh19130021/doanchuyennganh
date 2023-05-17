import request from '~/utils/request';
// import MySwal from '~/utils/swal';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export const register = async(user)=>{
        const MySwal = withReactContent(Swal)
        const res = await request.post("/api/auth/register", {
            username : user.username,
            email : user.email,
            password : user.password,
        });
        if(res.data.status === 200){
            MySwal.fire({  
                icon: 'success',  
                title: 'Đăng ký thành công',  
                showConfirmButton: false,  
                timer : 1000
            });  
        }
}