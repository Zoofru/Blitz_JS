import styles from "./Nav.module.css"
import { Link, Routes } from "blitz"

const navItems = ["Home", "Questions", "Create Question"]

//function to setup and return navigation link with specific routes
//Route => path to page
//navitem => name to be displayed
const setupDisplay = (route, navItem) => {
  return (
    <Link href={`${route}`}>
      <p className={styles.navItem}>{navItem}</p>
    </Link>
  )
}

const displayNavItems = navItems.map((item, index) => {
  if (item === "Home") {
    return (
      <div className={styles.navItemContainer} key={index}>
        {setupDisplay("/", item)}
      </div>
    )
  }

  if (item === "Create Question") {
    return (
      <div className={styles.navItemContainer} key={index}>
        {setupDisplay("/questions/new", item)}
      </div>
    )
  }

  return (
    <div className={styles.navItemContainer} key={index}>
      {setupDisplay(`/${item.toLowerCase()}`, item)}
    </div>
  )
})

export function Nav() {
  return <div className={styles.navbar}>{displayNavItems}</div>
}
