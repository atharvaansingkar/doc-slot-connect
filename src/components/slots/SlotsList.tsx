
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MapPin } from 'lucide-react';
import { useAppointment, SlotType } from '@/context/AppointmentContext';
import { format, parseISO } from 'date-fns';

type SlotsListProps = {
  title: string;
  slots: SlotType[];
  showBookButton?: boolean;
};

const SlotsList: React.FC<SlotsListProps> = ({ title, slots, showBookButton = false }) => {
  const { currentUser, bookSlot } = useAppointment();

  const handleBookSlot = (slotId: string, isOnline: boolean) => {
    bookSlot(slotId, isOnline);
  };

  if (slots.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No {title.toLowerCase()} available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slots.map((slot) => (
          <Card key={slot.id} className={slot.isBooked ? 'opacity-50' : ''}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(parseISO(slot.date), 'MMM d, yyyy')}
                  </div>
                </CardTitle>
                <Badge variant={slot.isOnline ? "default" : "outline"}>
                  {slot.isOnline ? (
                    <><Video className="h-3 w-3 mr-1" /> Online</>
                  ) : (
                    <><MapPin className="h-3 w-3 mr-1" /> In-person</>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
            </CardContent>
            {showBookButton && currentUser?.type === 'patient' && !slot.isBooked && (
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleBookSlot(slot.id, slot.isOnline)}
                >
                  Book Appointment
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SlotsList;
