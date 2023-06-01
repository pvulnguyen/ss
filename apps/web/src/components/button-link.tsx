import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';

interface Props extends ButtonProps {
    to: string;
    label: string;
    variant?: string;
}

export function ButtonLink({ label, to, variant, ...rest }: Props) {
    return (
        <Button variant={variant} component={Link} to={to} {...rest} fullWidth>
            {label}
        </Button>
    );
}
