import { Button, type ButtonProps } from '@mantine/core';
import { Link } from 'react-router-dom';

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
