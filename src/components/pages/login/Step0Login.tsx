// 输入邮箱，判定是否已注册，未注册则跳转到注册步骤，已注册则跳转到登录步骤
import { useRef, useState } from 'react'
import styled from 'styled-components'

import ScrollLoadingAnimation from '@/components/common/ScrollLoadingAnimation'
import { debounce, throttle } from '@/utils'
import toast from 'react-hot-toast'
import request from '@/utils/request'

type Props = {
  nextStep: (step: number) => void
  postMessageEmail: (email: string) => void
}

const Step0Login = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  // 提交按钮的状态
  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleEmailChange = () => {
    const email = inputRef.current?.value

    if (email) {
      // 验证邮箱格式
      const reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/g
      const isEmail = reg.test(email)
      if (isEmail) {
        // 邮箱格式正确
        setDisable(false)
      } else {
        // 邮箱格式错误
        setDisable(true)
      }
    } else {
      setDisable(true)
    }
  }

  const handleSubmit = () => {
    const email = inputRef.current?.value

    if (!email) return

    setLoading(true)

    toast.promise(
      request(
        'post',
        '/api/check_email',
        null,
        { email },
        {
          'Content-Type': 'application/json'
        }
      ),
      {
        loading: '检查邮箱中...',
        success: (data: any) => {
          console.log(data)
          setLoading(false)
          props.postMessageEmail(email)
          if (data.user_exists) {
            props.nextStep(1)
          } else {
            props.nextStep(2)
          }
          return '邮箱检查成功'
        },
        error: (err) => {
          setLoading(false)
          console.log(err.message)
          return '未知错误'
        }
      }
    )
  }
  return (
    <div className="mb-[70px] h-full justify-center flex flex-col items-center">
      <div className="relative flex flex-col w-full">
        <div className="flex flex-col items-center">
          <LoginFormWrapper>
            <div className="TextField">
              <input
                type="email"
                placeholder="输入您的邮箱"
                className="TextField__input"
                ref={inputRef}
                onChange={debounce(handleEmailChange, 400)}
              />
              <button
                disabled={disable}
                className={`${disable ? '' : 'active'}`}
                onClick={throttle(handleSubmit, 1000)}>
                {/* 加载动画 */}
                {loading ? (
                  <ScrollLoadingAnimation
                    width="18px"
                    height="18px"
                    color="white"
                  />
                ) : (
                  <span className="rtl-mirror-icon">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none">
                      <path
                        d="M.8 6.6H12M6.4 1L12 6.6l-5.6 5.6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </LoginFormWrapper>
        </div>
      </div>
    </div>
  )
}

const LoginFormWrapper = styled.div`
  --button-padding: 10px;
  --login-button-height: 60px;
  width: 100%;

  .TextField {
    margin: 0;

    --background-color: #fff;
    height: var(--login-button-height);
    background: #fff;
    border-radius: calc(var(--login-button-height) / 2);
    transition-property: border-color;
    transition-duration: 200ms;

    padding: 0 16px;
    display: flex;
    align-items: center;
    border: thin solid #d8d8d8;
    color: #030303;
    font-size: 15px;
    caret-color: #0083ff;
    transition: box-shadow 400ms;
    position: relative;

    &:hover,
    &:has(.TextField__input:focus) {
      border-color: var(--action-color);
    }
  }

  .TextField__input {
    font-weight: 500;
    font-size: 18px;
    height: 100%;
    margin: 0;

    width: 100%;
    padding: 0;
    flex: 1;
    background: none;
    border: none;
    color: inherit;

    /* 清除outline */
    outline: none;
  }

  button {
    margin-left: var(--button-padding);

    display: flex;
    background-color: transparent;
    border: 1px solid var(--color-2);
    color: var(--color-2);
    pointer-events: none;
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    transition-property: border-color, background-color, color;
    transition-duration: var(--animation-speed-fast);
    position: relative;
  }

  button.active {
    color: var(--action-button-text-color);
    background-color: var(--action-color);
    border-color: var(--action-color);
    cursor: pointer;
    pointer-events: all;
  }
`

export default Step0Login
