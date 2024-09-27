

export const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Scheduled':
            return { backgroundColor: '#E7E8EA', color: '#322F35' };
        case 'Active':
            return { backgroundColor: '#D4EDDA', color: '#155724' };
        case 'In Progress':
            return { backgroundColor: '#F8D7DA', color: '#721C24' };
        case 'Locked':
            return { backgroundColor: '#F44336', color: 'white' };
        case 'Pending':
            return { backgroundColor: '#FFF3CD', color: '#856404' };
        case 'Planned':
            return { backgroundColor: '#FFF3CD', color: '#856404' };
        default:
            return {};
    }
};

