
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Video, MapPin, Check, X, FileText } from 'lucide-react';
import { useAppointment, AppointmentType, SlotType } from '@/context/AppointmentContext';
import { format, parseISO } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type AppointmentCardProps = {
  appointment: AppointmentType;
  slot: SlotType;
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, slot }) => {
  const { currentUser, approveAppointment, cancelAppointment, completeAppointment } = useAppointment();
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [notes, setNotes] = useState(appointment.notes || '');
  const [meetLink, setMeetLink] = useState(appointment.meetLink || '');

  const getStatusBadge = () => {
    switch (appointment.status) {
      case 'pending':
        return <Badge variant="outline" className="bg-status-pending/10 text-status-pending border-status-pending">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-status-approved/10 text-status-approved border-status-approved">Approved</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-status-completed/10 text-status-completed border-status-completed">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-status-cancelled/10 text-status-cancelled border-status-cancelled">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const handleApprove = () => {
    if (appointment.isOnline && !meetLink.trim()) {
      alert('Please provide a meeting link for online appointments.');
      return;
    }
    approveAppointment(appointment.id, appointment.isOnline ? meetLink : undefined);
    setIsApproveDialogOpen(false);
  };

  const handleComplete = () => {
    completeAppointment(appointment.id, notes);
    setIsNoteDialogOpen(false);
  };

  const isDoctor = currentUser?.type === 'doctor';

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {format(parseISO(slot.date), 'MMM d, yyyy')}
            </div>
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pb-4 space-y-2">
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>
            {slot.startTime} - {slot.endTime}
          </span>
        </div>
        <div className="flex items-center text-sm">
          {appointment.isOnline ? (
            <><Video className="h-4 w-4 mr-2 text-muted-foreground" /> Online</>
          ) : (
            <><MapPin className="h-4 w-4 mr-2 text-muted-foreground" /> In-person</>
          )}
        </div>
        {appointment.status === 'approved' && appointment.isOnline && appointment.meetLink && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <a 
              href={appointment.meetLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <Video className="h-4 w-4 mr-2" />
              Join Meeting
            </a>
          </div>
        )}
        {appointment.status === 'completed' && appointment.notes && (
          <div className="mt-2 p-2 bg-gray-50 rounded-md">
            <p className="text-sm font-medium mb-1 flex items-center">
              <FileText className="h-4 w-4 mr-1" /> Appointment Notes:
            </p>
            <p className="text-sm text-gray-600">{appointment.notes}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        {isDoctor && appointment.status === 'pending' && (
          <>
            <Button 
              variant="outline" 
              className="flex-1 text-status-cancelled"
              onClick={() => cancelAppointment(appointment.id)}
            >
              <X className="h-4 w-4 mr-1" /> Decline
            </Button>
            <Button 
              className="flex-1 bg-status-approved hover:bg-status-approved/90"
              onClick={() => setIsApproveDialogOpen(true)}
            >
              <Check className="h-4 w-4 mr-1" /> Approve
            </Button>
          </>
        )}
        {!isDoctor && appointment.status === 'pending' && (
          <Button 
            variant="outline" 
            className="w-full text-status-cancelled"
            onClick={() => cancelAppointment(appointment.id)}
          >
            <X className="h-4 w-4 mr-1" /> Cancel Request
          </Button>
        )}
        {appointment.status === 'approved' && (
          <Button 
            className="w-full bg-status-completed hover:bg-status-completed/90"
            onClick={() => setIsNoteDialogOpen(true)}
          >
            <Check className="h-4 w-4 mr-1" /> Complete & Add Notes
          </Button>
        )}
      </CardFooter>

      {/* Notes Dialog */}
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Appointment Notes</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Enter notes about the appointment..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleComplete}>Save Notes & Complete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog for Online Meetings */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Appointment</DialogTitle>
          </DialogHeader>
          {appointment.isOnline && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Meeting Link</label>
              <Input
                placeholder="Enter Google Meet link..."
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleApprove}>Approve Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AppointmentCard;
