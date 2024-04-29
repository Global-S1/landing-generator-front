import { Button as MUiButton } from "@mui/material";

export const Button = ({ text }: { text: string }) => {
    return (
        <MUiButton variant="contained" sx={{fontWeight: 'bold'}}>
            {text}
        </MUiButton>
    )
}
