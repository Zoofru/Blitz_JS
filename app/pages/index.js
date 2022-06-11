import { Suspense } from "react"
import { Image, Link, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Nav } from "app/core/components/Nav"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome">
        <h1 className="welcome-title white">Welcome to Blitz Questions!</h1>
        <p className=" welcome-info white">
          Use the navigation up top to see already created questions or, create your own!
        </p>
      </div>
    </div>
  )
}

export default Home
