import { useState, useEffect, memo } from "react"; 

function CalendarTable({ year, month }) {
  
  const generateCalendar = () => {
    const mon = month - 1; 
    const d = new Date(year, mon); 
    const days = []; 
    let week = []; 

    
    for (let i = 0; i < getDay(d); i++) {
      week.push(<td key={`empty-${i}`}></td>); 
    }
    
    
    while (d.getMonth() === mon) { 
      week.push(<td key={`day-${d.getDate()}-${d.getMonth()}`}>{d.getDate()}</td>); 
      if (getDay(d) % 7 === 6) { 
        days.push(<tr key={`week-${days.length}`}>{week}</tr>);
        week = []; 
      }
      d.setDate(d.getDate() + 1); 
    }

    
    if (week.length) { 
      days.push(<tr key={`week-${days.length}`}>{week}</tr>); 
    }

    return days; 
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Пн</th>
          <th>Вт</th>
          <th>Ср</th>
          <th>Чт</th>
          <th>Пт</th>
          <th>Сб</th>
          <th>Вс</th>
        </tr>
      </thead>
      <tbody>
        {generateCalendar()} 
      </tbody>
    </table>
  );
}

function getDay(date) {
  const day = date.getDay(); 
  return (day === 0 ? 7 : day) - 1; 
}

const MemoizedCalendarTable = memo(CalendarTable);

export function Calendar() {
  const [date, setDate] = useState(""); 

  
  useEffect(() => {
    const now = new Date();
    setDate(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`); 
  }, []); 

  const handleChange = (e) => {
    setDate(e.target.value); 
  };

  const [year, month] = date.split("-").map(Number); 

  return (
    <div>
      <input type="month" value={date} onChange={handleChange} /> 
      <MemoizedCalendarTable year={year} month={month} /> 
    </div>
  );
}