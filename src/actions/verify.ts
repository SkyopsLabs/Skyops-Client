export const hasMessagedToday = async (userId:string) => { 
    const res = await fetch(`/verify/check-telegram-message?userId=${userId}`);
    const data = await res.json();
  
    if (data.hasMessaged) {
      return true
    } else {
      return false
    }
 }