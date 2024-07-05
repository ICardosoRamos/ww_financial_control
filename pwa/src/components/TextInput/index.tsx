import { TextInput as TIRN, TextInputProps } from "react-native-paper";

export default function TextInput({
  placeholder,
  value,
  onChangeText,
  label,
  ...rest
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  label: string;
} & TextInputProps) {
  return (
    <TIRN
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      label={label}
      {...rest}
    />
  );
}
