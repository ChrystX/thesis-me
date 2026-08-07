/**
 * Returns progress stats for a single section.
 * @param {Object} section - { lessons: [{ id }] }
 * @param {number[]} completedIds
 * @returns {{ done: number, total: number, allDone: boolean }}
 */
export const calculateSectionProgress = (section, completedIds) => {
    const total = section.lessons?.length ?? 0;
    const done = section.lessons?.filter(l => completedIds.includes(l.id)).length ?? 0;
    return {
        done,
        total,
        allDone: total > 0 && done === total,
    };
};

/**
 * Returns overall progress stats across all sections in a course.
 * @param {Object[]} sections - array of { lessons: [{ id }] }
 * @param {number[]} completedIds
 * @returns {{ completed: number, total: number, pct: number }}
 */
export const calculateCourseProgress = (sections, completedIds) => {
    const total = sections.reduce((acc, s) => acc + (s.lessons?.length ?? 0), 0);
    const completed = sections.reduce(
        (acc, s) => acc + (s.lessons?.filter(l => completedIds.includes(l.id)).length ?? 0),
        0
    );
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, pct };
};