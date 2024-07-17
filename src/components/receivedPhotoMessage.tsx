import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import moment from "moment";

const receivedPhotoMessage = ({ msg } : { msg: any }) => {
  return (
    <div className='flex items-end gap-1 w-full relative'>
        <p className='absolute right-0 bottom-0 text-[14px] font-semibold text-[#7538D4]'>{moment(msg.created_at).format('LT')}</p>
        <Avatar>
            <AvatarImage src="/user.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='h-fit max-h-[10rem] w-fit max-w-[10rem] lg:max-w-[25rem] rounded-2xl relative overflow-hidden'>
            <Dialog>
                <DialogTrigger>
                    <div className='absolute top-0 bottom-0 left-0 right-0 z-10 bg-transparent hover:bg-[#70707083] flex items-center justify-center' />
                    <img className='h-full w-full object-cover' src={msg.content} alt="photo message" />
                </DialogTrigger>
                <DialogContent className='h-[80%] overflow-hidden'>
                    <img className='absolute h-full w-full object-cover' src={msg.content} alt="photo message" />
                </DialogContent>
            </Dialog>
        </div>
    </div>
  )
}

export default receivedPhotoMessage