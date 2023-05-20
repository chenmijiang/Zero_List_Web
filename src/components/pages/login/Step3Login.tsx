// 忘记密码
import { useRef, useState } from 'react'
import styled from 'styled-components'

import ScrollLoadingAnimation from '@/components/common/ScrollLoadingAnimation'
import { debounce, throttle } from '@/utils'

type Props = {
  nextStep: (step: number) => void
  postMessageEmail: (email: string) => void
}

const Step3Login = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleReset = async () => {
    const email = inputRef.current?.value

    if (!email) return

    try {
      setLoading(true)

      // fetch 请求 post
      const res = await fetch(`/api/send_forgot_password_email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email
        })
      })

      const data = await res.json()

      setLoading(false)

      props.postMessageEmail(email)

      if (data.error === '') {
        props.nextStep(1)
      } else {
        props.nextStep(2)
      }
    } catch (e) {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="text-black flex mt-3">
        <button
          type="button"
          aria-label="back"
          onClick={() => {
            props.nextStep(0)
          }}
          className="p-0 flex bg-transparent border-none text-black items-center">
          <svg
            width="20"
            height="20"
            viewBox="-2 -2 20 20">
            <path
              fill="currentColor"
              d="M16 7H3.8l5.6-5.6L8 0 0 8l8 8 1.4-1.4L3.8 9H16z"></path>
          </svg>
        </button>
        <div className="text-center flex-1">
          <div className="font-bold text-[20px]">忘记密码</div>
        </div>
      </div>
      <FormContent>
        <div className="textfield textfield--login">
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            className="input input--login"
            ref={inputRef}
            onChange={debounce(handleEmailChange, 500)}
          />
        </div>
        <button
          disabled={disable}
          className="resetButton"
          onClick={throttle(handleReset, 1000)}>
          {loading ? (
            <ScrollLoadingAnimation
              width="18px"
              height="18px"
              color="white"
            />
          ) : (
            '重置密码'
          )}
        </button>
      </FormContent>
    </>
  )
}

const FormContent = styled.div`
  flex: 1;
  padding-bottom: 6px;

  .textfield--login.textfield--disabled {
    opacity: 1;
  }

  .textfield--login {
    padding-right: 24px;
    padding-left: 24px;

    height: var(--login-button-height);
    margin-bottom: var(--gutter);
    background: white;
    border-color: var(--color-text-3);
    border-radius: calc(var(--login-button-height) / 2);
    transition-property: border-color;
    transition-duration: var(--animation-speed-fast);
  }

  .textfield--disabled {
    cursor: not-allowed;
  }
  .textfield {
    padding: 0 var(--TextField-padding-h);
    display: flex;
    align-items: center;
    border: thin solid var(--textfield-border-color);
    color: var(--textfield-text-color);
    font-size: var(--font-size-base);
    caret-color: var(--action-color);
    transition: box-shadow var(--animation-speed-focus-ring);
    position: relative;
  }

  .textfield:not(.disabled) {
    &:hover,
    &:has(.input:focus) {
      border-color: var(--action-color);
    }
  }

  .input:disabled {
    cursor: not-allowed;
  }

  .input--login {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-text-xlg);
    height: 100%;
    margin: 0;
  }
  .input {
    width: 100%;
    padding: 0;
    flex: 1;
    background: none;
    border: none;
    color: inherit;

    outline: none;
  }

  .checkmarkIcon {
    color: var(--action-color);
  }

  .forgotPasswordButton {
    display: block;
    margin: 35px auto;
    color: var(--action-color);
    border: none;
    background-color: transparent;
  }

  .resetButton {
    height: var(--ButtonRounded-height);
    padding: 0 1.5em;
    margin: 0;
    position: relative;
    display: block;
    background-color: transparent;
    background-image: none;
    border: thin solid;
    border-radius: var(--ButtonRounded-borderRadius);
    font-size: var(--font-size-text-xsm);
    -webkit-user-select: none;
    user-select: none;
    transition: var(--animation-speed-focus-ring) box-shadow,
      var(--animation-speed-medium) background-color, var(--animation-speed-medium) color,
      var(--animation-speed-medium) border-color, var(--animation-speed-fast) opacity;

    height: 60px;
    border-radius: 30px;
    background: var(--action-color);
    border-color: var(--action-color);
    font-weight: var(--font-weight-xbold);
    color: var(--action-button-text-color);
    font-size: var(--font-size-text-lg);

    width: 100%;
    font-family: var(--default-font-family);
    cursor: pointer;
    transition: opacity 0.4s;
  }

  .resetButton:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .error {
    color: var(--error-color);
    font-size: var(--font-size-text-sm);
    text-align: center;
    margin-top: var(--gutter);
  }
`

export default Step3Login
