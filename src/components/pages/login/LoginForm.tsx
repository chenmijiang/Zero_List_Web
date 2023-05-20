// 登录表单

import { useState } from 'react'
import { motion } from 'framer-motion'

import LoginPanel from '@/components/layout/LoginPanel'
import Step0Login from './Step0Login'
import Step1Login from './Step1Login'
import Step2Login from './Step2Login'
import Step3Login from './Step3Login'

const LoginForm = () => {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  // 处理登录表单的步骤切换
  const nextStep = (step: number) => {
    setStep(step)
  }

  const allSteps = [
    {
      id: 0,
      step: (
        <Step0Login
          nextStep={nextStep}
          postMessageEmail={(email: string) => {
            setEmail(email)
          }}
        />
      )
    },
    {
      id: 1,
      step: (
        <Step1Login
          nextStep={nextStep}
          email={email}
        />
      )
    },
    {
      id: 2,
      step: (
        <Step2Login
          nextStep={nextStep}
          email={email}
        />
      )
    },
    {
      id: 3,
      step: (
        <Step3Login
          nextStep={nextStep}
          postMessageEmail={(email: string) => {
            setEmail(email)
          }}
        />
      )
    }
  ]
  return (
    <div
      role="tablist"
      className="h-full overflow-hidden">
      <div className="h-full transition-height duration-[400ms] will-change-[height,contents]">
        {/* 步骤切换动画 */}
        <motion.div
          initial={false}
          layout
          style={{ insetInlineStart: step * -100 + '%' }}
          className="w-[400%] h-full overflow-hidden relative inline-block align-top">
          {allSteps.map((item) => (
            <LoginPanel
              key={item.id}
              hidden={item.id !== step}
              step={item.id}>
              {/* 判定邮箱步骤 */}
              {item.step}
            </LoginPanel>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default LoginForm
