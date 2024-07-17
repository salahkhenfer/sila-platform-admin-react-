import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { IoTime } from "react-icons/io5";
import { BsCheckAll } from "react-icons/bs";
import moment from "moment";

const photoMessage = ({ msg } : { msg: any }) => {
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
        </div>
        <div className='h-fit max-h-[10rem] w-fit max-w-[12rem] lg:max-w-[27rem] rounded-2xl relative overflow-hidden'>
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

export default photoMessage