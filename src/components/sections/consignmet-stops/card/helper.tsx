export const getInitials = (text: string | null | undefined): string => {
    if (!text) return '';
    return text.split(' ').map(word => word[0]).join('').toUpperCase();
};