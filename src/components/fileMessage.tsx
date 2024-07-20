import { ImAttachment } from "react-icons/im";
import { IoTime } from "react-icons/io5";
import { BsCheckAll } from "react-icons/bs";
import moment from "moment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { RemoveMessage } from '../utils/removeMessage';
import CircularProgress from '@mui/material/CircularProgress';
import { TbTrashXFilled } from "react-icons/tb";
import { DeleteFile } from '../utils/deleteFile';
import { useState } from "react";
import { Button } from "../components/ui/button";

const fileMessage = ({ msg } : { msg: any }) => {

  const [loading, setLoading] = useState(false);

  const deleteMessage = async () => {
    setLoading(true);
    await DeleteFile(msg.content);
    await RemoveMessage(msg.id);
    window.location.reload();
  };

  return (
    <div className='flex items-end gap-1 w-full justify-end relative'>
        <div className='absolute left-0 bottom-0 flex items-center gap-1'>
          <p className='text-[14px] font-semibold text-[#7538D4]'>{moment(msg.created_at).format('LT')}</p>
          {
            msg.sending ? (
              <IoTime color='#7538D4' />
            ) : (
              <BsCheckAll color='#7538D4' />
            )
          }

            <AlertDialog>
                <AlertDialogTrigger>
                <TbTrashXFilled color='#7538D4' />
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to remove the message?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the message.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={deleteMessage}>
                    {
                        loading ? (
                        <CircularProgress size={13} color='inherit' />
                        ) : (
                        <p>Delete</p>
                        )
                    }
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
        <div className='bg-[#7538D4] max-w-[60%] flex items-center gap-2 rounded-2xl p-3'>
            <div className='h-[30px] w-[30px] min-h-[30px] min-w-[30px] rounded-full bg-white flex justify-center items-center'>
                <ImAttachment color='#7538D4' />
            </div>
            <a href={msg.content} target='_blank' className='truncate underline text-white'>File Attachment</a>
        </div>
    </div>
  )
}

export default fileMessage