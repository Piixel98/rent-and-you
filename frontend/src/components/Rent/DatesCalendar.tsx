import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { RentReadModel } from '../../client';

interface DatesCalendarProps {
  rents: RentReadModel[];
}

const DatesCalendar: React.FC<DatesCalendarProps> = ({ rents }) => {
  const getOccupiedDates = () => {
    let occupiedDates: Date[] = [];
    rents.forEach(rent => {
      let currentDate = new Date(rent.pickup_date);
      const returnDate = new Date(rent.return_date);
      while (currentDate <= returnDate) {
        occupiedDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return occupiedDates;
  };

  const isOccupiedDate = (date: Date) => {
    const occupiedDates = getOccupiedDates();
    return occupiedDates.some(occupiedDate => occupiedDate.toDateString() === date.toDateString());
  };

  return (
    <Calendar
      tileClassName={({ date }) => isOccupiedDate(date) ? 'occupied' : ''}
    />
  );
};

export default DatesCalendar;
