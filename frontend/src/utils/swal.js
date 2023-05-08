import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const success = async (text = {}) => {
    const MySwal = withReactContent(Swal)
    return MySwal.fire({  
        icon: 'success',  
        title: text,  
        showConfirmButton: false,  
      });  
};

export default MySwal;
