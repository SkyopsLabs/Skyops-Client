export const shortenAddress = (address: string, chars: number) => {
  if (address) return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const convertDateToString = (_date: string) => {
  const date = new Date(_date); // Current date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
