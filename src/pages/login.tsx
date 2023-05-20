// 登录页，数据库里没有用户邮箱，改为用户祖注册

import Head from 'next/head'
import styled from 'styled-components'

import LoginForm from '@/components/pages/login/LoginForm'

const login = () => {
  return (
    <>
      <Head>
        <title>登录 | 零清单</title>
      </Head>
      <LoginWrapper className="p-4 h-screen flex items-center justify-center">
        <div
          className="content w-[1012px] min-w-[1012px] h-[607px] relative -top-2 border-solid border-[1px] border-[#ededed] rounded-3xl bg-white shadow-lg">
          {/* 背景图，logo */}
          <div className="left-[60px] flex justify-between flex-col top-[63px] bottom-[56px] w-[374px] h-auto absolute">
            <div className="flex justify-between">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="flex justify-between">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="flex justify-between">
              <div className="dot invisible"></div>
              <div className="dot invisible"></div>
              <div className="dot invisible"></div>
              <div className="dot active"></div>
            </div>
            <div className="flex justify-between">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="flex justify-between">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="left-0 right-0 absolute top-[210px] height-[195px]">
              <div className="AppLogin__visual__logo">{/* logo */}</div>
              <h1
                className="pr-[42px] opacity-100 text-5xl tracking-tighter mt-[10px] transition-opacity duration-100 font-bold break-words">
                Zero List{' '}
                <span className="text-2xl font-normal tracking-widest text-active">零清单</span>
              </h1>
            </div>
          </div>
          {/* 表单内容 */}
          <div className="pl-[38px] pr-[62px] left-[572px] w-[440px] h-[420px] top-auto bottom-[66px] absolute">
            <LoginForm/>
          </div>
        </div>
      </LoginWrapper>
    </>
  )
}

const LoginWrapper = styled.section`
  .dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--bg-color2);

    &.active {
      background-color: var(--bg-color1);
    }
  }

  .text-active {
    color: var(--brand-color);
  }
`

export default login
