import { toast } from 'react-toastify';

export const showToast = (type, message) => {
  const options = {
    position: 'top-right',
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  };

  switch (type) {
    case 'success':
      return toast.success(message, options);
    case 'error':
      return toast.error(message, options);
    case 'warning':
      return toast.warning(message, options);
    case 'info':
      return toast.info(message, options);
    default:
      return toast(message, options);
  }
};
