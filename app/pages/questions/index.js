import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestions from "app/questions/queries/getQuestions"
import { RandomJoke } from "app/core/components/RandomJoke"

const ITEMS_PER_PAGE = 6
export const QuestionsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ questions, hasMore }] = usePaginatedQuery(getQuestions, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })

  return (
    <div>
      <RandomJoke></RandomJoke>
      <div className="question-container">
        {questions.map((question) => (
          <div className="question" key={question.id}>
            <Link
              href={Routes.ShowQuestionPage({
                questionId: question.id,
              })}
            >
              <a className="question-title">{question.text}</a>
            </Link>

            <div className="divider"></div>

            {question.choices.map((choice) => (
              <p key={choice.id}>
                {choice.text} - {choice.votes} votes
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="questions-btns">
        <button className="btn" disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </button>
        <button className="btn" disabled={!hasMore} onClick={goToNextPage}>
          Next
        </button>
      </div>
    </div>
  )
}

const QuestionsPage = () => {
  return (
    <>
      <Head>
        <title>Questions</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionsList />
        </Suspense>
      </div>
    </>
  )
}

QuestionsPage.authenticate = true

QuestionsPage.getLayout = (page) => <Layout>{page}</Layout>

export default QuestionsPage
