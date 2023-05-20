import AppHeader from '@/components/common/AppHeader'
import AppSideBar from '@/components/common/AppSideBar'

type Props = {
  children: React.ReactNode
}

const MainPanel = (props: Props) => {
  return (
    <div>
      {/* 顶部 Heder */}
      <AppHeader />
      {/* 侧边栏 */}
      <AppSideBar />
      {/* 主体内容 */}
      <main>{props.children}</main>
    </div>
  )
}

export default MainPanel
