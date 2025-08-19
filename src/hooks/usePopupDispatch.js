import Swal from "sweetalert2";

export const usePopupThunk = ({
  warningMessage,
  successMessage,
  handleDelete,
  refresh,
}) => {

  const handleOperation = async (id, name = false) => {
    const popupConfirmation = await Swal.fire({
      title: warningMessage,
      text: name ? `To delete, Please enter ${name}` : false,
      showDenyButton: true,
      confirmButtonText: "YES",
      denyButtonText: "NO",
      input: name ? "text" : false,
      inputAttributes: {
        autocapitalize: "off",
      },
      preConfirm: !name
        ? false
        : (value) => {
            if (value !== name) {
              Swal.showValidationMessage(`
            ${false}`);
            } else {
              return true;
            }
          },
    }).then((result) => {
      if (name && result?.value && result?.isConfirmed) return true;
      else if (result.isConfirmed && !name) return true;
      else if (result.isDenied) return false;
    });

    if (!popupConfirmation) return;

    const resp = await handleDelete(id);

    console.log(resp?.data?.data)

    if (resp?.data?.data?.success) {
      if (refresh) refresh();

      Swal.fire("", successMessage || `SUCCESSFULLY COMPLETED.`, "success");
    }
  };

  return [handleOperation];
};
