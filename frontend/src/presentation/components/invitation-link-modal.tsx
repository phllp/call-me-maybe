import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { MessageCirclePlus } from 'lucide-react';
import api from '@external/axios';
import { Session } from '@core/entities/session';

type InviteLinkProps = {
  callMetadata?: Session;
};

const InviteLink: React.FC<InviteLinkProps> = ({ callMetadata }) => {
  const [open, setOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const inviteLinkAsync = async () => {
      const baseUrl = 'http://localhost:3000';
      api.post('/invite-link', { callMetadata }).then((response) => {
        setInviteLink(`${baseUrl}${response.data}`);
      });
    };
    inviteLinkAsync();
  }, [callMetadata]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="text-cmPurple-500">
        <div className=" text-rose-900 bg-rose-200 py-2 px-4 rounded-md hover:bg-rose-300 hover:text-rose-800 flex items-center justify-center gap-2">
          <p className="font-medium">Invite</p>
          <MessageCirclePlus />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/55" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-200 text-slate-900 p-8 shadow-lg rounded-md">
          <Dialog.Title className="text-2xl font-medium text-rose-900">
            Invite Someone
          </Dialog.Title>
          <div className="my-10 text-rose-950">
            Share the following link to someone you want to talk with.
          </div>
          <div className="flex justify-center items-center flex-col pb-2">
            <button
              className="border-2 border-rose-900 text-rose-900 bg-rose-200 py-2 px-4 rounded-md hover:bg-rose-900 hover:text-rose-200 flex items-center justify-center gap-2"
              onClick={copyToClipboard}
            >
              <p className="font-medium">Copy Link</p>
            </button>
            <div className="h-4">
              <p className={`mt-4 text-rose-900 ${success ? '' : 'hidden'}`}>
                Invitation link copied...
              </p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default InviteLink;
