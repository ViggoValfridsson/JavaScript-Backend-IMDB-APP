import classes from "./ErrorMessage.module.css"

const ErrorMessage = () => {
  return (
    <h3 className={classes.error}>Something went wrong when loading. Try reloading the page!</h3>
  )
}

export default ErrorMessage