// 滚动加载动画

type Props = {
  width: string
  height: string
  color: string
}

const ScrollLoadingAnimation = (props: Props) => {
  return (
    <div className="left-0 flex items-center justify-center top-0 w-full h-full absolute cursor-pointer">
      <span
        aria-label="载入中..."
        style={{
          width: props.width,
          height: props.height,
          border: `2px solid ${props.color}`,
          borderTopColor: 'transparent'
        }}
        className={`animate-[spin_1.4s_linear_infinite] cursor-pointer inline-block rounded-full`}></span>
    </div>
  )
}

export default ScrollLoadingAnimation
