import { EventPopoverHeader } from "./EventPopoverHeader.jsx";
import { InstructorPopoverActions } from "./InstructorPopoverActions.jsx";
import { StudentPopoverActions } from "./StudentPopoverActions.jsx";
import {useAuth} from "../../../../hooks/useAuth.jsx";

export function EventPopover({ event, onClose, onEdit }) {
    const { user } = useAuth();
    const isInstructor = ["instructor", "admin"].includes(user?.roleName);

    if (!event) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl border border-gray-200 shadow-lg w-full max-w-sm"
                onClick={e => e.stopPropagation()}
            >
                <EventPopoverHeader event={event} onClose={onClose} />

                <div className="border-t border-gray-100" />

                {isInstructor
                    ? <InstructorPopoverActions event={event} onEdit={onEdit} onClose={onClose} />
                    : <StudentPopoverActions event={event} />
                }
            </div>
        </div>
    );
}