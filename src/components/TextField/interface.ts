export default interface Props {
  value: string
  onChange: (name: string, value: string) => void
  name: string
  placeholder?: string
  type: 'text' | 'email' | 'number' | 'password'
}
