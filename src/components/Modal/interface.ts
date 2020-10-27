export default interface Props {
  delay?: number
  active: string | null
  name: string
  close?: boolean
  c?: boolean
  onClose?: () => void
  children?: any
}
