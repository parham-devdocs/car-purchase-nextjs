type Option = {
    value: string;
    label: string;
    disabled?: boolean;
  };
  
  const generateTimeOptions = (): Option[] => {
    const times: Option[] = [];
    const start = 0; // 12:00 AM
    const end = 24 * 2; // 24 hours × 2 (for 30-min intervals)
  
    for (let i = 0; i < end; i++) {
      const hour = Math.floor(i / 2);
      const minutes = (i % 2) * 30;
      const period = hour >= 12 ? 'PM' : 'AM';
      let displayHour = hour % 12 || 12;
  
      const timeValue = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      const timeLabel = `${displayHour}:${minutes === 0 ? '00' : '30'} ${period}`;
  
      times.push({
        value: timeValue,
        label: timeLabel,
      });
    }
  
    return times;
  };
  export default generateTimeOptions