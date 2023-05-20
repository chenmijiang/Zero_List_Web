// 步骤面板

type Props = {
  step: number
  children?: React.ReactNode
  hidden: boolean
}

const LoginPanel = (props: Props) => {
  return (
    <div
      role="tabpanel"
      aria-hidden={props.hidden}
      aria-labelledby={`Tab ${props.step}`}
      className="w-[25%] inline-block opacity-100 transition-opacity duration-200 align-top h-full">
      {props.hidden ? (
        ''
      ) : (
        <div className="flex flex-col gap-[30px] relative h-full px-4 mb-0">{props.children}</div>
      )}
    </div>
  )
}

export default LoginPanel
