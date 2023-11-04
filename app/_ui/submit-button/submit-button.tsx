import {Button} from '@mantine/core';

import type {ButtonProps, ElementProps} from '@mantine/core';

interface SubmitButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
  pending: boolean;
  label?: string;
}

export function SubmitButton({pending, label, ...props}: SubmitButtonProps) {
  return (
    <Button type="submit" loading={pending} {...props}>
      {label || 'Submit'}
    </Button>
  );
}
