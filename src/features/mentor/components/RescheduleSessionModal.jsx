import ScheduleSessionModal from "./ScheduleSessionModal";

export default function RescheduleSessionModal({
  isOpen,
  mentorship,
  isPending,
  onClose,
  onConfirm,
}) {
  return (
    <ScheduleSessionModal
      title="Reschedule session"
      isOpen={isOpen}
      mentorship={mentorship}
      isPending={isPending}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
