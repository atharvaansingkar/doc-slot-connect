
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format } from 'date-fns';
import { useAppointment } from '@/context/AppointmentContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from 'lucide-react';

const SlotCreator = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('09:30');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const { addSlot, currentUser } = useAppointment();

  const timeSlots = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const handleCreateSlot = () => {
    if (!date || !currentUser) return;

    addSlot({
      doctorId: currentUser.id,
      date: format(date, 'yyyy-MM-dd'),
      startTime,
      endTime,
      isOnline,
    });

    // Reset form for next slot creation
    setEndTime(
      startTime.split(':').map((part, i) => {
        if (i === 0) {
          let hour = parseInt(part);
          return `${(hour < 23 ? hour + 1 : 0).toString().padStart(2, '0')}`;
        }
        return part;
      }).join(':')
    );
  };

  const isValid = date && 
    startTime && 
    endTime && 
    startTime < endTime && 
    currentUser?.type === 'doctor';

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Create Availability Slot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date">Select Date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow p-3 pointer-events-auto"
            disabled={(date) => date < new Date()}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-time">Start Time</Label>
            <Select value={startTime} onValueChange={setStartTime}>
              <SelectTrigger id="start-time" className="w-full">
                <SelectValue placeholder="Start Time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={`start-${time}`} value={time}>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-time">End Time</Label>
            <Select value={endTime} onValueChange={setEndTime}>
              <SelectTrigger id="end-time" className="w-full">
                <SelectValue placeholder="End Time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={`end-${time}`} value={time}>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch 
            id="online" 
            checked={isOnline} 
            onCheckedChange={setIsOnline} 
          />
          <Label htmlFor="online">Available for online appointments</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCreateSlot} 
          className="w-full" 
          disabled={!isValid}
        >
          Create Slot
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SlotCreator;
