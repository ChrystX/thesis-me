import { useState } from "react";

export function useCollapsible(defaultOpen = false) {
    const [open, setOpen] = useState(defaultOpen);
    const toggle = () => setOpen(prev => !prev);
    return { open, toggle };
}