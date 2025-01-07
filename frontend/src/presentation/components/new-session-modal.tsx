import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Users } from 'lucide-react';
import api from '@external/axios';
import { useNavigate } from 'react-router-dom';
import { Session } from '@core/entities/session';

type NewSessionProps = {
  onCancel?: () => void;
};

export default function NewSession({ onCancel }: NewSessionProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // State to store the form data
  const [formData, setFormData] = useState({
    hostName: '',
  });

  // Updates the form data when the user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   *
   * @param e
   * @returns
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.hostName.length <= 0) {
      console.error('Nome do host não informado.');
      return;
    }
    try {
      const response = await api.post('/create-session', {
        hostName: formData.hostName,
      });
      if (response.status === 200) {
        const token: Session = response.data;
        console.log('Sessão criada com sucesso:', token);
        navigate(`/video?token=${token}`);
        closeModal();
        return;
      } else {
        console.warn('Erro ao criar sessão.');
      }
    } catch (error) {
      console.error('Create New Session:', error);
    }
    setFormData({ hostName: '' });
  };

  // Cleanup form data when modal is closed
  const closeModal = () => {
    setFormData({
      hostName: '',
    });
    if (onCancel) {
      onCancel();
    }
    setOpen(false);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => {
        setFormData({
          hostName: '',
        });
        setOpen(!open);
      }}
    >
      <Dialog.Trigger className="text-cmPurple-500">
        <div className=" text-rose-900 bg-rose-200 py-2 px-4 rounded-md hover:bg-rose-300 hover:text-rose-800 flex items-center justify-center gap-2">
          <p className="font-medium">New Session</p>
          <Users />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/55" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-200 text-slate-900 p-8 shadow-lg rounded-md">
          <Dialog.Title className="text-2xl font-medium text-rose-900 mb-5">
            New Session
          </Dialog.Title>

          <div>
            <label
              htmlFor="hostName"
              className="block text-sm font-medium text-gray-700"
            >
              What's your name?
            </label>
            <input
              id="hostName"
              name="hostName"
              type="text"
              value={formData.hostName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex space-x-4 mt-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Create
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
