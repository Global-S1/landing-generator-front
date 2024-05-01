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

export const ModalTextAi = ({ defaultText, open, handleClose }: Props) => {

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
                <h4>Intención</h4>
                <div className="flex gap-2">
                    {
                        tags.map(item => (
                            <span key={item} className="rounded-lg bg-blue-200 hover:bg-blue-300 transition-all text-md px-2 cursor-pointer">
                                {item}
                            </span>
                        ))
                    }
                </div>
                <div className="flex">
                    <button>
                        Guardar
                    </button>
                </div>
            </div>
        </Modal>
    )
}
