// 注册步骤
import { useRef, useState } from 'react'
import styled from 'styled-components'

import ScrollLoadingAnimation from '@/components/common/ScrollLoadingAnimation'
import { debounce, throttle } from '@/utils'
import toast from 'react-hot-toast'
import request from '@/utils/request'

type Props = {
  nextStep: (step: number) => void
  email: string
}

const Step2Login = (props: Props) => {
  const inputNameRef = useRef<HTMLInputElement>(null)
  const inputPasswordRef = useRef<HTMLInputElement>(null)

  const [disable, setDisable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleInputChange = () => {
    const password = inputPasswordRef.current?.value
    const name = inputNameRef.current?.value

    if (password && name) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }

  const handleSubmit = () => {
    const password = inputPasswordRef.current?.value
    const name = inputNameRef.current?.value

    if (!password || !name) return

    setLoading(true)

    toast.promise(
      request(
        'post',
        '/api/register',
        null,
        {
          email: props.email,
          name: name,
          password: password
        },
        {
          'Content-Type': 'application/json'
        }
      ),
      {
        loading: '注册中...',
        success: (data: any) => {
          setLoading(false)
          props.nextStep(1)
          return '注册成功'
        },
        error: (err: any) => {
          setLoading(false)
          setError(true)
          return '注册失败'
        }
      }
    )
  }

  const [showPassword, setShowPassword] = useState(false)
  // 密码显示隐藏
  const togglePassword = () => {
    const input = inputPasswordRef.current
    if (input) {
      if (input.type === 'password') {
        input.type = 'text'
        setShowPassword(true)
      } else {
        input.type = 'password'
        setShowPassword(false)
      }
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
          <div className="font-bold text-[20px]">注册</div>
        </div>
      </div>
      <FormContent>
        <div className="textfield textfield--login disabled">
          <input
            type="text"
            disabled
            className="input input--login input--disabled"
            value={props.email}
          />
        </div>
        <div className="textfield textfield--login">
          <input
            type="text"
            name="displayName"
            minLength={1}
            placeholder="昵称"
            className="input input--login"
            ref={inputNameRef}
            onChange={debounce(handleInputChange, 500)}
          />
        </div>
        <div className="textfield textfield--login">
          <input
            type="password"
            name="password"
            minLength={6}
            placeholder="密码"
            data-private="lipsum"
            className="input input--login"
            ref={inputPasswordRef}
            onChange={debounce(handleInputChange, 500)}
          />
          <button
            onClick={togglePassword}
            type="button">
            {showPassword ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5.24927C4.5 5.24927 1.5 12 1.5 12C1.5 12 4.5 18.7493 12 18.7493C19.5 18.7493 22.5 12 22.5 12C22.5 12 19.5 5.24927 12 5.24927Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
                <path
                  d="M12 15.7501C14.0711 15.7501 15.75 14.0711 15.75 12.0001C15.75 9.92899 14.0711 8.25006 12 8.25006C9.92893 8.25006 8.25 9.92899 8.25 12.0001C8.25 14.0711 9.92893 15.7501 12 15.7501Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.5 3.75L19.5 20.25"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
                <path
                  d="M14.5223 14.7748C13.7864 15.4437 12.8149 15.7929 11.8215 15.7456C10.8281 15.6982 9.89422 15.2582 9.22524 14.5223C8.55626 13.7865 8.20698 12.815 8.25424 11.8216C8.3015 10.8282 8.74142 9.89427 9.47724 9.22522"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
                <path
                  d="M6.93698 6.43066C3.11486 8.36618 1.5 12 1.5 12C1.5 12 4.5 18.7493 12 18.7493C13.7572 18.7633 15.4926 18.3585 17.0623 17.5685"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
                <path
                  d="M19.5571 15.8531C21.6011 14.0224 22.5 12 22.5 12C22.5 12 19.5 5.24928 12 5.24928C11.3504 5.24822 10.7019 5.30103 10.061 5.40717"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
                <path
                  d="M12.7056 8.31635C13.5026 8.46939 14.2285 8.87674 14.7745 9.47728C15.3204 10.0778 15.6569 10.8392 15.7335 11.6472"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
              </svg>
            )}
          </button>
        </div>
        <button
          disabled={disable}
          className="submitButton"
          onClick={throttle(handleSubmit, 1000)}>
          {loading ? (
            <ScrollLoadingAnimation
              width="18px"
              height="18px"
              color="white"
            />
          ) : (
            '创建账户'
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

  .submitButton {
    //height: var(--ButtonRounded-height);
    padding: 0 1.5em;
    margin: 0;
    position: relative;
    display: block;
    background-color: transparent;
    background-image: none;
    border: thin solid;
    //border-radius: var(--ButtonRounded-borderRadius);
    //font-size: var(--font-size-text-xsm);
    -webkit-user-select: none;
    user-select: none;
    //transition: var(--animation-speed-focus-ring) box-shadow,
    //  var(--animation-speed-medium) background-color, var(--animation-speed-medium) color,
    //  var(--animation-speed-medium) border-color, var(--animation-speed-fast) opacity;

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

  .submitButton:disabled {
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

export default Step2Login
