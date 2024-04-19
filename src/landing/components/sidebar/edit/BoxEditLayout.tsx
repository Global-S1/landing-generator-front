interface Props{
    children: JSX.Element
}

export const BoxEditLayout = ({children}: Props) => {
  return (
    <div className="border-[1px] border-blue-500 py-4 overflow-hidden">
        {children}
    </div>
  )
}
