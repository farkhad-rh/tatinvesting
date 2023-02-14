import { useEffect } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

import { Button, Typography } from '@material-tailwind/react'

import {
  CCQuestions,
  COEEQuestions,
  ECQuestions,
  GeneralQuestions,
  ISQuestions,
  SSQuestions,
} from '@constants/checklist.constants'

import { Routes } from '@routes/routes.enum'

import { useChecklistService } from '@services'

import { Section, Project, Question, Block } from '@components/checklist'

import styles from './Checklist.module.scss'

const Checklist = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [ref]: any = useOutletContext()

  const [checklist] = useChecklistService()

  const { project } = checklist

  const handleBack = () => navigate(state?.prevPath || -1)
  const handleConfigs = () => navigate(`/${Routes.CONFIGS}`)

  useEffect(() => {
    ref?.current?.complete()
  }, [])

  return (
    <>
      <Typography
        className={styles.title}
        variant='h1'
        color='blue'
        textGradient
      >
        ЧЕК-ЛИСТ НБ ИП
      </Typography>

      <Section title={`Карточка проекта${project ? ` "${project}"` : ''}`}>
        <Project />
      </Section>

      <Section title='Контрольные вопросы'>
        <Block title='Системность решения'>
          {SSQuestions?.map(({ question, filling, coordinating }, index) => (
            <Question
              key={question}
              index={index}
              questions='SSQ'
              question={question}
              filling={filling}
              coordinating={coordinating}
            />
          ))}
        </Block>

        <Block title='Расчет эффекта'>
          {ECQuestions?.map(({ question, filling, coordinating }, index) => (
            <Question
              key={question}
              index={index}
              questions='ECQ'
              question={question}
              filling={filling}
              coordinating={coordinating}
            />
          ))}
        </Block>

        <Block title='Расчет затрат'>
          {CCQuestions?.map(({ question, filling, coordinating }, index) => (
            <Question
              key={question}
              index={index}
              questions='CCQ'
              question={question}
              filling={filling}
              coordinating={coordinating}
            />
          ))}
        </Block>

        <Block title='График реализации'>
          {ISQuestions?.map(({ question, filling, coordinating }, index) => (
            <Question
              key={question}
              index={index}
              questions='ISQ'
              question={question}
              filling={filling}
              coordinating={coordinating}
            />
          ))}
        </Block>

        <Block title='Расчет экономической эффективности'>
          {COEEQuestions?.map(({ question, filling, coordinating }, index) => (
            <Question
              key={question}
              index={index}
              questions='COEEQ'
              question={question}
              filling={filling}
              coordinating={coordinating}
            />
          ))}
        </Block>

        <Block title='Общее'>
          {GeneralQuestions?.map(({ question, filling, coordinating }, index) => (
            <Question
              key={question}
              index={index}
              questions='GQ'
              question={question}
              filling={filling}
              coordinating={coordinating}
            />
          ))}
        </Block>
      </Section>

      <div className={styles.buttons}>
        <Button
          className={styles.button}
          variant='gradient'
          size='lg'
          onClick={handleBack}
        >
          Назад
        </Button>

        {state?.prevPath !== `/${Routes.CONFIGS}` && (
          <Button
            className={styles.button}
            variant='gradient'
            size='lg'
            onClick={handleConfigs}
          >
            Исходные данные
          </Button>
        )}
      </div>
    </>
  )
}

export default Checklist
