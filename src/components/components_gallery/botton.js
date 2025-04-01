// src/components/components_gallery/botton.js
import React from 'react';
import Send from '@mui/icons-material/Send';
import Delete from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';

import {
    TextButton, ContainedButton, OutlinedButton,
    SecondaryTextButton, SecondaryContainedButton, SecondaryOutlinedButton,
    SuccessContainedButton, ErrorOutlinedButton, IconButton, LoadingButton,
    SvgButton
} from '../atoms/Button';

export const ButtonVariants = () => {

    const styles = {
        container: {
            gap: '1rem',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        heading: {
            textAlign: 'center',
            fontSize: '3rem',
            marginBottom: '1rem',
        },
        buttonGroups: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '100%',
        },
        stack: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Botones</h1>
            
            <div style={styles.buttonGroups}>

                <Stack spacing={2} direction="row" style={styles.stack}>
                    <TextButton onPress={() => alert('TextButton Clicked')}>TextButton</TextButton>
                    <TextButton onPress={() => alert('TextButton2 Clicked')} disable={true}>TextButton Disable</TextButton>

                    <ContainedButton onPress={() => alert('ContainedButton Clicked')}>ContainedButton</ContainedButton>
                    <ContainedButton onPress={() => alert('ContainedButton Clicked')} disable={true}>ContainedButton Disable</ContainedButton>
                    
                    <OutlinedButton onPress={() => alert('OutlinedButton Clicked')}>OutlinedButton</OutlinedButton>
                    <OutlinedButton onPress={() => alert('OutlinedButton Clicked')} disable={true}>OutlinedButton Disable</OutlinedButton>

                    <ContainedButton
                        href={'https://www.google.com'}
                        fontColor="black"
                        openInNewTab={true}
                    >
                        Open Google in new tab
                    </ContainedButton>
                </Stack>

                <Stack spacing={2} direction="row" style={styles.stack}>
                    <SecondaryTextButton onPress={() => alert('Secondary TextButton Clicked')}>
                      Secondary TextButton
                    </SecondaryTextButton>
                    
                    <SecondaryContainedButton href="https://example.com" openInNewTab={true}>
                      Secondary ContainedButton
                    </SecondaryContainedButton>
                    
                    <SecondaryOutlinedButton onPress={() => alert('Secondary OutlinedButton Clicked')}>
                      Secondary OutlinedButton
                    </SecondaryOutlinedButton>

                    <SuccessContainedButton onPress={() => alert('Success Button Clicked')}>
                      Success Button
                    </SuccessContainedButton>
                    
                    <ErrorOutlinedButton href="https://example.com" openInNewTab={true}>
                        Error Outlined Button
                    </ErrorOutlinedButton>

                    <ContainedButton onPress={() => alert('ContainedButton with endicon Clicked')} endIcon={<Send />} size='large'>
                        ContainedButton with icon
                    </ContainedButton>

                </Stack>

                <Stack spacing={2} direction="row" style={styles.stack}>
                    <IconButton
                        icon={<Delete />}
                        size={50}
                        color="secondary"
                        onPress={() => console.log('IconButton clicked')}
                    />
                    <SvgButton
                        svgIcon="/logo.svg"
                        size={50}
                        color="secondary"
                        onPress={() => console.log('IconButton clicked')}
                    />
                    <LoadingButton
                        /*loading*/
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        color="secondary"
                    >
                    Guardar
                    </LoadingButton>
                    <LoadingButton
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        color="primary"
                    >
                    Guardando
                    </LoadingButton>
                </Stack>

            </div>
        </div>
    );
};