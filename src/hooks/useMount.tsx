import { useEffect,useRef } from "react"

export const useMount = (callback: () => void) => {
  const isOnces = useRef(true)
  useEffect(() => {
    if (isOnces.current) { 
      callback()
      isOnces.current = false;
    }
  }, [])
}
