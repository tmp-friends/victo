import { Spinner } from "@chakra-ui/react"
import { useGlobalSpinnerContext } from "../../../contexts/GlobalSpinnerContext"

const GlobalSpinner = () => {
  const isGlobalSpinnerOn = useGlobalSpinnerContext()

  return (
    <>
      {isGlobalSpinnerOn && (
        <Spinner />
      )}
    </>
  )
}

export default GlobalSpinner
