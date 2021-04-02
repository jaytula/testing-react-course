console.log("xyz");

const styled = {
  Text: (content) => {
    console.log({ content });
  },
};

const Text = styled.Text`
  ${({ theme }: { theme: ITheme }) => defaultTextStyles(theme)}
  ${({ variant = "body", theme }: StyledTextComponentProps) =>
    variants[variant](theme)}
`;

console.log(Text);
