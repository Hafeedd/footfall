import Swal from "sweetalert2";

export const ErrorToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  color: "black",
  timer: 6000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const SuccessToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  color: "black",
  timer: 6000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
