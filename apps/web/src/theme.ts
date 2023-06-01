import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
    colorScheme: 'light',
    white: '#fdfcfd',
    black: '#1a1523',
    primaryColor: 'orange',
    fontFamily: 'Wix Madefor Text',
    headings: {
        fontFamily: 'Wix Madefor Display',
    },
    components: {
        ActionIcon: {
            variants: {
                red: (theme) => ({
                    root: {
                        backgroundColor: theme.colors.red[0],
                        color: theme.colors.red[9],
                        border: `1px solid ${theme.colors.red[3]}`,
                        ...theme.fn.hover({
                            backgroundColor: theme.colors.red[1],
                            border: `1px solid ${theme.colors.red[5]}`,
                        }),
                    },
                }),
            },
        },
        Button: {
            defaultProps: {
                w: '100%'
            },
            variants: {
                orange: (theme) => ({
                    root: {
                        backgroundColor: theme.colors.orange[0],
                        color: theme.colors.orange[9],
                        border: `1px solid ${theme.colors.orange[3]}`,
                        ...theme.fn.hover({
                            backgroundColor: theme.colors.orange[1],
                            border: `1px solid ${theme.colors.orange[5]}`,
                        }),
                    },
                }),
                green: (theme) => ({
                    root: {
                        backgroundColor: theme.colors.green[0],
                        color: theme.colors.green[9],
                        border: `1px solid ${theme.colors.green[3]}`,
                        ...theme.fn.hover({
                            backgroundColor: theme.colors.green[1],
                            border: `1px solid ${theme.colors.green[5]}`,
                        }),
                    },
                }),
                gray: (theme) => ({
                    root: {
                        backgroundColor: theme.colors.gray[0],
                        color: theme.colors.gray[9],
                        border: `1px solid ${theme.colors.gray[3]}`,
                        ...theme.fn.hover({
                            backgroundColor: theme.colors.gray[1],
                            border: `1px solid ${theme.colors.gray[5]}`,
                        }),
                    },
                }),
                red: (theme) => ({
                    root: {
                        backgroundColor: theme.colors.red[0],
                        color: theme.colors.red[9],
                        border: `1px solid ${theme.colors.red[3]}`,
                        ...theme.fn.hover({
                            backgroundColor: theme.colors.red[1],
                            border: `1px solid ${theme.colors.red[5]}`,
                        }),
                    },
                }),
            },
        },
        NumberInput: {
            defaultProps: {
                w: '100%'
            }
        },
        Select: {
            defaultProps: {
                w: '100%'
            }
        }
    },
};
