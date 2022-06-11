import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getQuestion from "app/questions/queries/getQuestion"
import deleteQuestion from "app/questions/mutations/deleteQuestion"
import updateChoice from "app/choices/mutations/updateChoice"

export const Question = () => {
  const router = useRouter()
  const questionId = useParam("questionId", "number")
  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  const [updateChoiceMutation] = useMutation(updateChoice)
  const [question, { refetch }] = useQuery(getQuestion, {
    id: questionId,
  })

  const handleVote = async (id) => {
    try {
      await updateChoiceMutation({ id })
      refetch()
    } catch (error) {
      alert("Error " + JSON.stringify(error, null, 2))
    }
  }

  return (
    <>
      <Head>
        <title>Question {question.text}</title>
      </Head>

      <div className="single-question-container">
        <div className="single-question">
          <h1 className="single-question-title">Question {question.text}</h1>

          <div className="choices-container">
            {question.choices.map((choice) => (
              <p className="choice" key={choice.id} onClick={() => handleVote(choice.id)}>
                {choice.text} - {choice.votes} votes
              </p>
            ))}
          </div>

          <div className="choice-btns">
            <Link
              href={Routes.EditQuestionPage({
                questionId: question.id,
              })}
            >
              <a className="choice-edit">Edit</a>
            </Link>

            <button
              className="delete-btn"
              type="button"
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteQuestionMutation({
                    id: question.id,
                  })
                  router.push(Routes.QuestionsPage())
                }
              }}
              style={{
                marginLeft: "0.5rem",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const ShowQuestionPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Question />
      </Suspense>
    </div>
  )
}

ShowQuestionPage.authenticate = true

ShowQuestionPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowQuestionPage
