import { Modal } from "@mui/material";

interface Props {
    defaultText: string
    open: boolean;
    handleClose: () => void;
}

const tags = [
    'Informal',
    'Formal',
    'Emojis',
    'Casual',
    'Amigable'
]

export const ModalTextAi = ({ defaultText , open, handleClose }: Props) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] flex flex-col gap-4 p-4 rounded-md bg-white w-[600px]">

                <h2 id="parent-modal-title">Genera texto</h2>
                <textarea
                    className="input resize-none"
                    cols={30}
                    rows={4}
                    spellCheck={false}
                    placeholder="Description"
                    value={defaultText}
                    name="description"
                    onChange={() => { }} />
                <div className="flex gap-2">
                    {
                        tags.map(item => (
                            <span key={item} className="rounded-lg bg-purple-200 text-md px-2">
                                {item}
                            </span>
                        ))
                    }
                </div>
            </div>
        </Modal>
    )
}
