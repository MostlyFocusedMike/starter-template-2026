import { useRef } from "react";

export default function useModal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const openModal = () => dialogRef?.current?.showModal();
  const closeModal = () => dialogRef?.current?.close();

  return { dialogRef, openModal, closeModal };
}