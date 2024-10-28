import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { CheckCheck, Copy, MessageCirclePlus } from 'lucide-react';
import api from '@external/axios';

export default function InviteLink() {
  const [open, setOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('');

  const [success, setSuccess] = useState(false);
  const [copyText, setCopyText] = useState('Copy');

  useEffect(() => {
    api.get('/invite-link').then((response) => {
      setInviteLink(response.data);
    });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setSuccess(true);
    setCopyText('Copied!');
    setTimeout(() => {
      setSuccess(false);
      setCopyText('Copy');
    }, 2000);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="text-cmPurple-500">
        <button className=" text-rose-900 bg-rose-200 py-2 px-4 rounded-md hover:bg-rose-300 hover:text-rose-800 flex items-center justify-center gap-2">
          <p className="font-medium">Invite</p>
          <MessageCirclePlus />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/55" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-200 text-slate-900 p-8 shadow-lg rounded-md">
          <Dialog.Title className="text-2xl font-medium">
            Invite Someone
          </Dialog.Title>
          <div className="mt-10">
            Share the following link to someone you want to talk with.
          </div>
          <div
            className="relative group bg-rose-50 p-2 rounded-sm mt-4 cursor-pointer flex justify-between items-center"
            onClick={copyToClipboard}
          >
            <a>{inviteLink}</a>
            {success ? (
              <CheckCheck className="text-green-800" />
            ) : (
              <Copy className="text-rose-800" />
            )}

            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {copyText}
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
