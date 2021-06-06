import React from 'react';

interface SelectBulkProps {
    setBulkAction: Function
    bulkAction: string
}

export const SelectBulkAction : React.FC <SelectBulkProps> = ({setBulkAction, bulkAction}) => {
    return (
        <select className="selectBulkAction" value={bulkAction} onChange={(event) => setBulkAction(event.target.value)}>
            <option defaultValue="" value="" disabled>Bulk actions</option>	
            <option value="Set completed">Set Completed</option>
            <option value="Delete">Delete</option>
        </select>
    )
}