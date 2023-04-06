export const dateFormater = (dateString: any) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear().toString(); // Extract last 2 digits of year
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1. Pad with 0 if necessary.
    const day = dateObj.getDate().toString().padStart(2, "0"); // Pad with 0 if necessary.
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}