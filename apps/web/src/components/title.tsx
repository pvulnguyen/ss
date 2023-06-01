import { Helmet } from 'react-helmet-async';
import { Title as MTitle } from '@mantine/core';

export function Title({ title, isHidden }: { title: string; isHidden?: boolean }) {
    return (
        <>
            <Helmet>
                <title>SuperSet | {title}</title>
            </Helmet>
            {!isHidden && <MTitle ta='center' mt={32} order={2}>{title}</MTitle>}
        </>
    );
}
