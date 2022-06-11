import { Link, useRouter, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createQuestion from "app/questions/mutations/createQuestion"
import { QuestionForm, FORM_ERROR } from "app/questions/components/QuestionForm"
import { createQuestionSchema } from "app/questions/validations"

const NewQuestionPage = () => {
  const router = useRouter()
  const [createQuestionMutation] = useMutation(createQuestion)
  return (
    <div className="new-question-container">
      <div className="new-question">
        <h1>Create New Question</h1>

        <QuestionForm
          submitText="Create Question"
          schema={createQuestionSchema}
          initialValues={{ text: "", choices: [] }}
          onSubmit={async (values) => {
            try {
              const question = await createQuestionMutation(values)
              router.push(
                Routes.ShowQuestionPage({
                  questionId: question.id,
                })
              )
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </div>
  )
}

NewQuestionPage.authenticate = true

NewQuestionPage.getLayout = (page) => <Layout title={"Create New Question"}>{page}</Layout>

export default NewQuestionPage
