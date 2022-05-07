import React, { ReactNode} from 'react';
import Image from 'next/image'

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ isOpen, children, onClose}: ModalProps): JSX.Element => (
  <div
    data-testid="modal"
    className={`
      items-center justify-center ${isOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0
      right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-25 text-black
    `}
  >
    <div className="flex flex-col items-center py-4 px-16 bg-white min-h-[400px] min-w-[600px] rounded relative">
      <div className="absolute top-4 right-4">
        <Image
          src="/close.svg"
          alt="Close icon"
          height={24}
          width={24}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      <h2 className="text-2xl text-black">Success!</h2>
      <section className="flex flex-col py-10 text-left">
        {children}
      </section>
    </div>
  </div>
);

export default React.memo(Modal);
