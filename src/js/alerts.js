import Swal from 'sweetalert2/dist/sweetalert2.js'

export function confirmacionAlert(mensaje) {
  Swal.fire({
    title: "¡Buen trabajo!",
    text: mensaje,
    icon: "success",
    customClass: {
      popup: 'custom-swal-border'
  }
  })
}

export async function eliminarCancionAlert() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
      popup: 'custom-swal-border'
    },
    buttonsStyling: false
  })

  return swalWithBootstrapButtons.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás recuperar esta canción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, ¡elíminala!",
    cancelButtonText: "No, ¡cancelar!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      await swalWithBootstrapButtons.fire({
        title: "¡Eliminada!",
        text: "Tu canción fue eliminada.",
        icon: "success"
      });
      return true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: "Cancelado",
        text: "Tu canción está segura :)",
        icon: "error"
      });
      return false
    }
  })
}

export async function editarCancionAlert() {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
      popup: 'custom-swal-border'
    },
    buttonsStyling: false
  })

  return swalWithBootstrapButtons.fire({
    title: "¿Estás seguro?",
    text: "¡Esto sobrescribirá los datos de la canción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, hazlo!",
    cancelButtonText: "No, ¡cancelar!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      await swalWithBootstrapButtons.fire({
        title: "Actualizada!",
        text: "Tu canción fue actualizada.",
        icon: "success"
      });
      return true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await swalWithBootstrapButtons.fire({
        title: "Cancelado",
        text: "Tu canción está segura :)",
        icon: "error"
      });
      return false
    }
  })
}