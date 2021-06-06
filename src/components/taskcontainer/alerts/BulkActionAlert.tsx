import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TodoStore } from '../store';
import { AlertStore } from './store';
import { observer } from 'mobx-react';

interface BulkActionAlertProps{
  bulkSelection: Array<number>
  bulkAction: string
  setBulkSelection: Function
}

export const BulkActionAlert: React.FC<BulkActionAlertProps> = observer(function DeleteAlert({bulkSelection, bulkAction, setBulkSelection}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    if(bulkAction === "Delete"){
      TodoStore.bulkDelete(bulkSelection); 
      AlertStore.setNewAlert({
        message: `${bulkSelection.length} tasks deleted`,
        severity: "success"
      })
    } else{
        TodoStore.bulkUpdate(bulkSelection);
        AlertStore.setNewAlert({
          message: `${bulkSelection.length} tasks completed`,
          severity: "success"
        })
    }
    setBulkSelection([]);
    
    handleClose();
  }

  return (
    <div>
      <button onClick={handleClickOpen}>
        Apply
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`${bulkAction} ${bulkSelection.length} tasks?`}</DialogTitle>
        <DialogContent>
         {bulkAction === "Delete" && <DialogContentText id="alert-dialog-description">
            This process can't be undone.
          </DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleApply}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})
