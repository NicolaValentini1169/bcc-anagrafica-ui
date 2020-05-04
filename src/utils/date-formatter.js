export function dateFormatter(date) {
  if (date.includes("/")) return date;

  const formattedDate = new Date(date);
  return (
    formattedDate.getDate() +
    "/" +
    (formattedDate.getMonth() + 1) +
    "/" +
    formattedDate.getFullYear()
  );
}
